---
title: 'Chrome '
date: 2026-09-09T23:21:40.707Z
---

\# SOOP VOD 10,000개 채팅 패킷 대량 주입 파이프라인 분석

\## 목표

Chrome 확장 프로그램의 5단계 레이어 통신 구조를 이해하고, Web Worker와 타임 오프셋 치환 방식을 통해 SOOP VOD 플레이어 큐에 대량(10,000개)의 가상 채팅 패킷을 효율적으로 주입하는 흐름을 정립합니다.

\## 기억하기

\* \*\*VOD와 LIVE의 파라미터 차이:\*\* VOD 모드에서 \`rate\`는 초당 전송량이 아니라 \*\*총 생성 패킷 수\*\*를 의미합니다.

\* \*\*단일 벌크 전송:\*\* 1초마다 tick을 수행하는 LIVE 모드와 달리, START 시점에 Web Worker에서 10,000개의 패킷을 단일 \`\<root>\` XML 문자열로 일괄 생성해 단 1회의 \`postMessage\`로 전달합니다.

\* \*\*타임 오프셋 플레이스홀더 패턴:\*\* 생성 시점에는 \`\_\_VOD\_TIME\_OFFSET\_{s}\_\_\` 형태로 상대 시간(초)을 마킹하고, 최종 주입 계층(\`page.js\`)에서 실제 \`videoEl.currentTime + 2초\`를 기준으로 절대 타임스탬프로 일괄 치환합니다.

\* \*\*5단계 격리 컨텍스트 통신:\*\* \`popup.js\` → \`chrome.tabs.sendMessage\` → \`content.js\` → \`worker.postMessage\` → \`content.js\` → \`window\.postMessage\` → \`page.js\` 순으로 데이터를 중계합니다.

\## 내용

전체 파이프라인은 Chrome 확장 프로그램의 보안 격리 환경을 넘나드는 5단계 레이어로 구성됩니다.

\`\`\`

\[클릭] startBtn (popup.js)

│ chrome.tabs.sendMessage → { type: 'START', rate: 10000, mode: 'vod' }

▼

\[content.js] → worker.postMessage('START')

│

▼

\[worker.js] ── vodpackets.js 10,000회 호출 ──▶ bigXml (..10000개..)

│ self.postMessage({ type: 'VOD\_BULK', xmlString: bigXml })

▼

\[content.js] → window\.postMessage('SOOP\_CHAT\_TESTER\_VOD\_PACKET')

│

▼

\[page.js] ── DOMParser로 XML 파싱

── \*\*VOD\_TIME\_OFFSET\_N\*\* → 실제 재생시간 + N으로 치환

── chatItem.createChatData() × 10,000

── chatItem.chats.push() × 10,000

│

▼

\[SOOP VOD 플레이어] 재생 시간 도달 시 채팅 자동 렌더링

\`\`\`

\### 1단계: Popup UI — 버튼 클릭 (popup.js)

사용자로부터 총 패킷 수(\`rate\`)와 분배 구간(\`durationMs\`)을 입력받아 \`content.js\`로 전달합니다.

\`\`\`javascript

// popup.js L434-442

startBtn.onclick = async () => {

  const rate = Math.max(1, Number(rateInput.value) || 1); // 예: 10000

  const durationMs = Number(durationSelect.value) || 0;   // 예: 60000 (1분)

  const r = await send({ type: 'START', rate, durationMs, mode: 'vod' });

  applyStatus(r);

};

\`\`\`

\### 2단계: Worker — 10,000개 XML 패킷 일괄 생성 (worker.js)

메인 스레드 블로킹을 막기 위해 Web Worker 내부에서 타임 오프셋을 균등 분배한 후 단일 \`\<root>\` XML 문자열로 합산합니다.

\`\`\`javascript

// worker.js L157-184

case 'START': {

  if (mode === 'vod') {

    const durationSec = Math.floor(dur / 1000);  // 예: 60초

    const totalPackets = rate;                    // 10,000개

    let bigXml = '\<root>';

    for (let i = 0; i \< totalPackets; i++) {

      // 0\~59초 구간에 균등 분배 (i=0 → 0초, i=9999 → \~59초)

      const s = Math.floor((i / totalPackets) \* durationSec);

      const k = pickKey();           // 가중치 추첨 (채팅 95%)

      let xml = entry.fn().xmlString; // vodpackets.js 에서 XML 생성

      xml = xml.replace('\_\_VOD\_TIME\_\_', \`\_\_VOD\_TIME\_OFFSET\_${s}\_\_\`);

      bigXml += xml;

    }

    bigXml += '\</root>';

    // 단 한 번의 메시지로 전체 묶음 전송

    self.postMessage({ type: 'VOD\_BULK', xmlString: bigXml, count });

  }

}

\`\`\`

\### 3단계: 개별 XML 패킷 템플릿 생성 (vodpackets.js)

개별 패킷은 시간 치환용 플레이스홀더(\`\_\_VOD\_TIME\_\_\`)를 포함하는 템플릿 형태로 반환됩니다.

\`\`\`javascript

// vodpackets.js

export function vodChat() {

  return {

    tagName: 'chat',

    xmlString: '\<chat>\<p>0\</p>\<n>\<!\[CDATA\[베르쑤]]>\</n>\<u>tester1\</u>\<m>\<!\[CDATA\[안녕하세요\~]]>\</m>\<t>\_\_VOD\_TIME\_\_\</t>\</chat>',

  };

}

\`\`\`

\### 4단계: Content Script — Page 컨텍스트 전달 (content.js)

Worker로부터 수신한 대량 XML 데이터를 웹 페이지 스크립트 실행 컨텍스트로 중계합니다.

\`\`\`javascript

// content.js

window\.postMessage({ type: 'SOOP\_CHAT\_TESTER\_VOD\_PACKET', xmlString: bigXml }, '\*');

\`\`\`

\### 5단계: Page — 타임 치환 및 플레이어 큐 적재 (page.js)

현재 비디오 재생 위치(\`videoEl.currentTime + 2초\`)를 기준으로 오프셋을 절대 시간으로 치환하고, 파싱한 데이터를 VOD 플레이어 내부 배열에 적재합니다.

\`\`\`javascript

// page.js L104-160

// 현재 재생 시간 기준으로 오프셋 변환

const currentTime = videoEl.currentTime;

const time = currentTime + 2; // 현재 재생 위치 + 2초 앞

// \_\_VOD\_TIME\_OFFSET\_3\_\_ → String(currentTime + 2 + 3)

replacedXmlString = d.xmlString.replace(

  /\_\_VOD\_TIME\_OFFSET\_(\d+)\_\_/g,

  (\_, offset) => String(time + Number(offset))

);

// XML 파싱 후 chatItem에 삽입

const xmlDoc = vodParser.parseFromString(replacedXmlString, 'text/xml');

const children = Array.from(xmlDoc.documentElement.children); // 10,000개 노드

for (const child of children) {

  const chatData = chatItem.createChatData(child); // SOOP 내부 파싱 함수

  if (chatData) chatItem.chats.push(chatData);     // 플레이어 내부 채팅 큐에 삽입

}

\`\`\`

\### LIVE 모드 vs VOD 모드 동작 차이

\| 구분 | LIVE 모드 | VOD 모드 |

\| --- | --- | --- |

\| \*\*패킷 생성 시점\*\* | 1초마다 주기적 tick 발생 | START 시점 1회 일괄(Bulk) 생성 |

\| \*\*\`rate\`의 의미\*\* | 초당 전송 패킷 수 | 총 주입 패킷 수 (예: 10,000개) |

\| \*\*주입 방식\*\* | \`ctrl.receive()\` (소켓 패킷 실시간 소비) | \`chatItem.chats.push()\` (플레이어 큐 사전 적재) |

\| \*\*시간 처리\*\* | 별도 타임스탬프 계산 불필요 | 현재 재생 시간 + 상대 오프셋 치환 |

\| \*\*tick 루프 역할\*\* | 패킷 생성 및 지속 전송 | UI 메트릭 측정 상태 유지만 수행 |

\## 느낀점

\* 대용량 문자열 결합 및 10,000회 루프 처리를 Web Worker로 격리하여 팝업과 브라우저 메인 스레드의 프리징 현상을 방지한 점이 인상적입니다.

\* 실시간 스트림과 달리 타임라인 기반으로 동작하는 VOD 특성에 맞춰, 생성 시점에는 상대 오프셋으로 기록하고 주입 시점에 실제 비디오 재생 시간과 결합하는 '오프셋 치환 패턴'을 통해 재생 오차를 효과적으로 해결했습니다.

\## ToDo

\* \[ ] 10,000개 노드를 \`DOMParser\`로 일괄 파싱하고 순회할 때 메인 스레드 프레임 드랍(Long Task) 발생 여부 프로파일링.

\* \[ ] 한 번에 10,000개를 밀어 넣는 방식 대신 \`requestAnimationFrame\` 또는 청크 단위(예: 1,000개씩 분할) 큐 삽입 적용 검토.

\* \[ ] 사용자가 VOD 재생바를 탐색(Seek)하거나 되감기/빨리감기를 했을 때 기존 주입된 가상 채팅 큐 데이터의 지속/초기화 동작 검증.

\## 결론

VOD 환경의 대량 부하 테스트는 실시간 소켓 주입 방식이 아닌 \*\*사전 일괄 생성 후 플레이어 내부 타임라인 큐 적재 방식\*\*을 취합니다. 5단계 레이어를 거치며 연산 부하(Worker), 브릿지 중계(Content Script), 도메인 로직 주입(\`page.js\`)의 책임을 명확히 분리하여 브라우저 부담을 최소화하면서 대규모 VOD 채팅 렌더링을 구현할 수 있습니다.

\## 참고

\* \`popup.js\`: L434-442 (UI 이벤트 핸들러 및 파라미터 전달)

\* \`worker.js\`: L157-184 (벌크 XML 생성 및 타임 오프셋 분배 로직)

\* \`vodpackets.js\`: 개별 채팅 XML 템플릿 정의 모듈

\* \`page.js\`: L104-160 (타임 치환, \`DOMParser\` 연동 및 \`chatItem.chats\` 주입)

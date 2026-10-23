// 사용법: npm run new -- <영문-slug> "글 제목"
// _posts/<slug>.md를 draft 상태로 만들고, 트러블슈팅 글 뼈대를 채워 둔다.
import fs from 'fs';
import path from 'path';

const [slug, title = '제목을 입력하세요'] = process.argv.slice(2);

if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('영문 소문자 kebab-case slug가 필요합니다. 예: npm run new -- cef-race-condition "글 제목"');
  process.exit(1);
}

const filePath = path.join(process.cwd(), '_posts', `${slug}.md`);
if (fs.existsSync(filePath)) {
  console.error(`이미 존재하는 파일입니다: ${filePath}`);
  process.exit(1);
}

const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date());

const template = `---
title: ${JSON.stringify(title)}
date: ${today}
tags: []
summary: 검색 결과와 공유 미리보기에 쓰일 한두 문장 요약
draft: true
---

## TL;DR

- 무슨 문제가 있었나
- 원인은 무엇이었나
- 어떻게 해결했고, 결과는 어땠나

## 상황

언제, 어디서, 어떤 현상이 있었는지. 영향 범위를 숫자로 적을 수 있으면 좋다.

## 원인 추적

어떤 가설을 세우고 어떻게 확인했는지. 헛다리 짚은 과정도 독자에게는 유용하다.

## 검토한 대안

### 1안: (버림)

왜 버렸는지가 이 글에서 가장 가치 있는 부분이다.

### 최종안

## 결과

조치 전후를 비교할 수 있는 숫자.

## 회고

다음에 비슷한 문제를 만나면 무엇을 먼저 확인할지.
`;

fs.writeFileSync(filePath, template);
console.log(`생성됨: _posts/${slug}.md (draft: true, 공개하려면 draft 줄을 지우세요)`);

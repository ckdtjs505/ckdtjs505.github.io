---
layout: post
title: '[pnpm] 아키텍처 심층 분석 - CAS 해시 데이터의 가상 스토어 파일 복원과 링크 메커니즘'
date: 2026-09-14T00:00:00.000Z
tags: pnpm
comments: true
share: true
related: false
summary: pnpm의 아키텍처 심층 분석 CAS 해시 데이터의 가상 스토어 파일 복원과 링크 메커니즘
---

## 목표

- 하드 링크로 생성된 파일이 일반 텍스트 파일처럼 인식되는 구조적 원리와 CAS 원본과의 관계 이해

## 기억하기

- 하드 링크는 원본 파일의 디스크 주소(inode)를 공유하므로, OS와 애플리케이션 관점에서는 링크 흔적이 전혀 없는 완전한 '일반 파일'로 취급됨

## 내용

### 외형 비교

- **CAS 원본:** `~/cas-store/a1b2c3d4...` 형태의 난해한 해시 파일명
- **하드 링크 파일:** `~/my-notes/오늘할일.txt`처럼 사용자 지정 경로와 일반적인 파일명 보유

### 확인 및 실행 동작

- **편집기/뷰어:** 파일 오픈 시 원본의 본문이 즉시 표시되며 직접 수정 가능
- **터미널(ls -l):** 심볼릭 링크 화살표(`->`)가 붙지 않고 일반 파일 플래그(`-rw-r--r--`)로 표기
- **애플리케이션:** Node.js, Python 등의 코드 레벨에서 별도의 링크 해석 단계 없이 네이티브 파일로 바로 읽기 수행

### 내부 메커니즘

파일 시스템 상 서로 다른 디렉터리 엔트리가 동일한 디스크 데이터 번지(inode)를 가리키는 원리

## 예시 코드

### 터미널 생성 및 확인

```bash
# 1. 하드 링크 생성
ln ~/cas-store/a1b2c3d4e5f6 ~/my-notes/오늘할일.txt

# 2. inode 및 속성 확인 (동일한 inode 번호와 링크 카운트 2 확인)
ls -li ~/cas-store/a1b2c3d4e5f6 ~/my-notes/오늘할일.txt
# 출력: 12345678 -rw-r--r-- 2 user group ... 오늘할일.txt
```

### Node.js에서 읽기 예시

```javascript
const fs = require('fs');

// 일반 파일과 완전히 동일한 방식으로 처리
const content = fs.readFileSync('~/my-notes/오늘할일.txt', 'utf-8');
console.log(content);
```

## 느낀점

CAS 기반 저장소가 디스크 절약과 데이터 무결성을 챙기면서도, 사용자에게 친숙한 파일 경로와 투명한 개발 환경을 제공할 수 있는 이유가 바로 하드 링크의 특성 때문임을 실감함

## 결론

하드 링크는 심볼릭 링크처럼 바로가기 포인터를 남기지 않고 실제 inode를 직접 공유하므로, 겉으로는 100% 독립된 일반 파일처럼 작동하면서 물리적 디스크 용량 중복을 완벽히 방지함

## 참고

- Unix/Linux 파일 시스템의 inode 구조
- 심볼릭 링크(Soft Link)와 하드 링크(Hard Link)의 내부 구조 차이
- Git 및 pnpm의 CAS(Content-Addressable Storage) 저장소 관리 기법

---
layout: post
title: '[pnpm]의 3계층 아키텍처와 링크 메커니즘 분석'
date: 2026-09-14T00:00:00.000Z
tags: pnpm
comments: true
share: true
related: false
summary: 3단계로 디스크 공간을 절약하고 유령 의존성을 차단하는 pnpm의 아키텍처와 링크 메커니즘
---

## 목표
pnpm이 **Global Store**, **Virtual Store(.pnpm)**, **개별 앱** 간에 디스크 공간을 절약하고 유령 의존성을 차단하는 3단계 계층 원리를 이해하고 구조화하기

## 기억하기
* **1단계 (글로벌 스토어):** 실제 파일 원본이 유일하게 저장되는 CAS(Content-Addressable Storage) 공간 (`~/Library/pnpm/store/v3`)
* **2단계 (가상 스토어):** 글로벌 스토어와 하드 링크(Hard Link)로 연결되어 실제 디스크 추가 용량이 0B인 평탄화 공간 (`node_modules/.pnpm`)
* **3단계 (개별 앱):** 가상 스토어를 가리키는 심볼릭 링크(Symbolic Link, 바로가기)만 배치되어 엄격한 참조 격리를 유지하는 공간 (`apps/*/node_modules`)

## 내용

### 1. 3계층 연결 흐름도
```text
[1] Global Content Store (원천 데이터 1벌 저장)
    ~/Library/pnpm/store/v3
              │
              │ (하드 링크: 디스크 inode 공유, 용량 0B 소모)
              ▼
[2] Project Virtual Store (가상 저장소)
    my-monorepo/node_modules/.pnpm/react@18.2.0/node_modules/react
              │
              │ (심볼릭 링크: 단순 경로 바로가기)
              ▼
[3] Apps / Packages (실제 프로젝트가 바라보는 위치)
    ├── apps/web/node_modules/react
    └── apps/tv/node_modules/react
```

### 2. 단계별 동작 방식
* **Global Content Store:** 패키지 바이너리가 해시 기반으로 시스템 전체에서 단 한 번만 물리 디스크에 기록됨
* **Virtual Store (.pnpm):** 같은 파일 시스템의 동일한 inode를 가리키는 하드 링크로 구성되어 복사 비용 및 용량 낭비가 전혀 없음
* **Apps Node Modules:** `package.json`에 명시된 의존성만 Virtual Store 경로로 심볼릭 링크 연결

### 3. 동작 검증 예시 코드 (터미널 명령어)
```bash
# 1. 하드 링크 확인 (동일한 inode 번호를 가리키는지 확인)
ls -i ~/Library/pnpm/store/v3/files/.../data
ls -i ./node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
# 결과: 두 파일의 inode 번호가 일치하며 디스크 용량을 추가 소모하지 않음

# 2. 심볼릭 링크 확인 (가상 스토어로의 상대 경로 참조 확인)
ls -l apps/web/node_modules/react
# 결과: -> ../../../node_modules/.pnpm/react@18.2.0/node_modules/react
```


## 느낀점
* 단순히 "빠르고 가볍다"는 성능적 장점을 넘어, 파일 시스템 수준의 하드 링크와 심볼릭 링크를 정교하게 결합해 OS 레벨의 자원 효율을 극대화한 설계가 인상적임
* npm의 호이스팅으로 인한 런타임 버그나 모노레포의 중복 디스크 낭비 문제를 아키텍처 수준에서 우아하게 해결함

## 결론
* pnpm은 **단일 원본 저장(Global) → 하드 링크 가상화(.pnpm) → 심볼릭 링크 주입(Apps)** 파이프라인을 통해 디스크 사용량 최소화와 유령 의존성 완전 차단을 동시에 달성함


## 참고
* [pnpm 공식 문서: pnpm's strict and disk-efficient layout](https://pnpm.io)
* Linux/Unix 파일 시스템의 inode, Hard Link vs Soft (Symbolic) Link 동작 명세


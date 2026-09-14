---
layout: post
title: 'Git 브랜치 네이밍 컨벤션과 `feature/` 접두사의 역할'
date: 2026-09-14T00:00:00.000Z
tags: Git
comments: true
share: true
related: false
summary: Git 브랜치 네이밍 컨벤션 가이드 - feature/ 접두사의 역할
---

### 목표
* 브랜치 접두사(Prefix) 기반 네이밍 규칙의 필요성과 효과 이해
* 협업 및 CI/CD 파이프라인에서 직관적인 브랜치 관리 전략 수립

### 기억하기
* `feature/`는 신규 기능 개발(Feature) 작업을 명시하는 표준 접두사
* 슬래시(`/`) 구분자는 VS Code, Sourcetree 등 GUI 도구에서 폴더 트리 구조로 렌더링
* `[작업자/작업종류/이슈티켓-작업내용]` 구조를 활용하면 작업 주체와 목적을 한눈에 식별 가능

### 내용
* **브랜치 네이밍 접두사를 나누는 이유**
  * **작업 성격 즉시 식별**: 기능 개발, 버그 수정, 문서 작업 등 커밋 히스토리 확인 전 작업 의도 파악 가능
  * **CI/CD 자동화 연동**: `release/*`, `hotfix/*` 등 패턴에 따라 테스트/빌드/배포 파이프라인 조건 분기 가능
  * **Git GUI 도구 정리**: 계층형 트리 뷰를 지원하여 다수의 브랜치가 생성되어도 깔끔하게 그룹화
* **자주 쓰이는 브랜치 접두사 규칙**
  * `feature/`: 새로운 기능 개발
  * `bugfix/` 또는 `fix/`: 일반적인 버그 및 결함 수정
  * `hotfix/`: 운영 환경(Production)에서 긴급히 해결해야 하는 오류 패치
  * `refactor/`: 비즈니스 로직 변화 없이 코드 구조 개선, 최적화
  * `chore/`: 빌드 스크립트, 의존성 패키지 관리, 기타 단순 설정 변경
* **예시 코드 및 브랜치 생성 명령어**
  * 신규 기능 브랜치 생성 및 전환:
    ```bash
    git checkout -b ckdtjs505/feature/SOOPKR-101-chat-packet-pipeline
    ```
  * 긴급 핫픽스 브랜치 생성:
    ```bash
    git checkout -b hotfix/SOOPKR-102-memory-leak-fix
    ```
  * 특정 작업자 또는 접두사 브랜치 목록 필터링 조회:
    ```bash
    git branch --list "ckdtjs505/*"
    ```

### 느낀점
* 브랜치명만 보고도 PR(Pull Request) 리뷰 전 작업 범위를 미리 예측할 수 있어 커뮤니케이션 비용 감소
* 개인 작업자와 티켓 번호를 결합한 계층적 네이밍 규칙이 대규모 프로젝트에서 브랜치 충돌 및 혼선을 최소화함

### 결론
* 브랜치 네이밍 컨벤션은 단순한 작명 규칙을 넘어 협업 능률, 형상 관리 시각화, 자동화 파이프라인의 기반이 됨

### 참고
* Git Feature Branch Workflow (Atlassian Guide)
* Git-Flow 및 GitHub Flow 브랜치 전략 표준 명세

### 요약 이미지
```text
[Repository]
├── ckdtjs505/
│   └── feature/
│       └── SOOPKR-101-chat-packet-pipeline  ──> (신규 기능 개발)
├── hotfix/
│   └── SOOPKR-102-memory-leak-fix           ──> (운영 긴급 조치)
└── release/
    └── v1.2.0                               ──> (배포 파이프라인 연동)
```
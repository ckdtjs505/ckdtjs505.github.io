# Sonia.dev

웹 프론트엔드 개발에 관한 지식과 실무 경험을 기록하는 개인 기술 블로그입니다.

- 블로그: https://ckdtjs505.github.io
- RSS: https://ckdtjs505.github.io/feed.xml

## 기술 스택

- Next.js 14 (App Router, `output: 'export'` 정적 사이트)
- Markdown + gray-matter, remark/rehype (GFM, 빌드 타임 코드 하이라이트, 헤딩 앵커)
- Mermaid 다이어그램, giscus 댓글
- GitHub Actions → GitHub Pages 배포 (`master` push 시 자동)

## 로컬 실행

```bash
npm ci
npm run dev
```

정적 빌드 결과는 `npm run build` 후 `out/`에 생성됩니다.

## 글 작성

`_posts/`에 Markdown 파일을 추가합니다. 파일명이 URL이 되므로 새 글은 영문 kebab-case 파일명을 권장합니다.

```yaml
---
title: 글 제목
date: 2026-10-23
tags: [Frontend, Troubleshooting]
series: 시리즈 이름   # 선택: 같은 값끼리 시리즈로 묶임
summary: 목록·검색 결과·SNS 미리보기에 쓰이는 한두 문장 요약
draft: true          # 선택: true면 빌드에서 제외
---
```

- 본문의 `##`, `###` 헤딩이 3개 이상이면 목차가 자동 생성됩니다.
- ` ```mermaid ` 코드 블록은 다이어그램으로 렌더링됩니다.

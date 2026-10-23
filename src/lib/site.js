export const SITE_URL = 'https://ckdtjs505.github.io';
export const SITE_NAME = 'Sonia.dev';
export const SITE_TITLE = '소니아 개발 블로그';
export const SITE_DESCRIPTION = '웹 프론트엔드 개발에 관한 지식과 실무 경험을 기록합니다.';

// gray-matter는 날짜를 Date 객체로, 따옴표로 감싼 값은 문자열로 돌려주므로 둘 다 처리
export function toDate(date) {
  if (!date) return null;
  const parsed = date instanceof Date ? date : new Date(date);
  return isNaN(parsed) ? null : parsed;
}

export function postUrl(id) {
  return `${SITE_URL}/posts/${encodeURIComponent(id)}`;
}

// giscus 댓글 설정: https://giscus.app 에서 발급한 값을 넣으면 댓글이 활성화됨
export const GISCUS = {
  repo: 'ckdtjs505/ckdtjs505.github.io',
  repoId: 'MDEwOlJlcG9zaXRvcnkyNTEzMTQ2MzU=',
  category: 'Announcements',
  categoryId: '', // giscus 앱 설치 후 'DIC_kwDODvrBy84DJYSH'(Announcements)로 설정
};

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(date) {
  const parsed = toDate(date);
  return parsed ? dateFormatter.format(parsed) : '';
}

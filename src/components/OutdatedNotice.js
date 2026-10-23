import { toDate, formatDate } from '../lib/site'

const OUTDATED_YEARS = 2;

// 빌드 시점 기준으로 계산되므로 배포할 때마다 자동으로 갱신됨
export default function OutdatedNotice({ date }) {
  const written = toDate(date);
  if (!written) return null;

  const years = Math.floor((Date.now() - written.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  if (years < OUTDATED_YEARS) return null;

  return (
    <aside className="outdated-notice" role="note">
      이 글은 {formatDate(written)}에 작성되어 {years}년이 지났습니다. 현재 버전이나 모범 사례와 다를 수 있습니다.
    </aside>
  );
}

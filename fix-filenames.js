const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
if (fs.existsSync(postsDir)) {
  const files = fs.readdirSync(postsDir);

  files.forEach(file => {
    if (file.endsWith('.md')) {
      // 대괄호와 공백을 대시(-)로 변경하고, 연속된 대시는 하나로 줄임
      let newName = file
        .replace(/\[|\]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
        
      if (newName !== file) {
        fs.renameSync(path.join(postsDir, file), path.join(postsDir, newName));
        console.log(`✅ 변경 완료: ${file} -> ${newName}`);
      }
    }
  });
  console.log("🎉 모든 마크다운 파일 이름이 안전하게 변경되었습니다!");
} else {
  console.log("❌ _posts 폴더를 찾을 수 없습니다.");
}

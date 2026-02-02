const fs = require('fs');
const path = require('path');

const readmePath = path.join(process.cwd(), 'README.md');

try {
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  
  // 获取当前UTC日期
  const now = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedDate = `${months[now.getUTCMonth()]} ${now.getUTCDate()}, ${now.getUTCFullYear()}`;
  
  console.log('📅 Date to update:', formattedDate);
  
  // 匹配格式：🔥 Today is **February 2, 2026**. I'm still alive. Nice to meet you!
  const newLine = `🔥 Today is **${formattedDate}**. I'm still alive. Nice to meet you!`;
  
  // 简单替换：找到包含 "Today is" 的行
  const lines = readmeContent.split('\n');
  let updated = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Today is') && lines[i].includes('I\'m still alive')) {
      console.log(`Updating line ${i}: "${lines[i]}" → "${newLine}"`);
      lines[i] = newLine;
      updated = true;
      break;
    }
  }
  
  if (updated) {
    fs.writeFileSync(readmePath, lines.join('\n'), 'utf8');
    console.log('✅ Date updated successfully');
  } else {
    console.log('⚠️  Date line not found');
  }
  
} catch (error) {
  console.error('❌ Error:', error);
}

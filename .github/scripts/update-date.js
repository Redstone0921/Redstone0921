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
  
  console.log('📅 Formatted UTC date:', formattedDate);
  console.log('🕐 UTC time:', now.toISOString());
  
  // 查找并替换
  const targetPattern = /🔥 Today is \*\*.*?\*\*\. I'm still alive\. Nice to meet you!/;
  const newLine = `🔥 Today is **${formattedDate}**. I'm still alive. Nice to meet you!`;
  
  if (targetPattern.test(readmeContent)) {
    const updatedContent = readmeContent.replace(targetPattern, newLine);
    
    if (updatedContent !== readmeContent) {
      fs.writeFileSync(readmePath, updatedContent, 'utf8');
      console.log('✅ README updated! Date changed to:', formattedDate);
    } else {
      console.log('⚠️  Date already correct:', formattedDate);
    }
  } else {
    console.log('❌ Pattern not found!');
  }
  
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
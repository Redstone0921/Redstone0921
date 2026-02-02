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
  
  // 关键修复：匹配你的实际格式
  // 你的文件有：🔥 Today is **February 2, 2026**. I'm still alive. Nice to meet you!
  const targetPattern = /🔥 Today is \*\*.*?\*\*\. I'm still alive\. Nice to meet you!/;
  const newLine = `🔥 Today is **${formattedDate}**. I'm still alive. Nice to meet you!`;
  
  console.log('🔍 Looking for pattern:', targetPattern.toString());
  console.log('📄 First few lines of README:');
  console.log(readmeContent.split('\n').slice(0, 10).join('\n'));
  
  if (targetPattern.test(readmeContent)) {
    const updatedContent = readmeContent.replace(targetPattern, newLine);
    
    if (updatedContent !== readmeContent) {
      fs.writeFileSync(readmePath, updatedContent, 'utf8');
      console.log('✅ README updated! Date changed to:', formattedDate);
      console.log('🔄 New line:', newLine);
    } else {
      console.log('⚠️  Date already correct:', formattedDate);
      console.log('ℹ️  Current line already has:', formattedDate);
    }
  } else {
    console.log('❌ Pattern not found! Trying alternative match...');
    
    // 尝试更宽松的匹配
    const lines = readmeContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('Today is') && lines[i].includes('I\'m still alive')) {
        console.log(`📍 Found at line ${i}: "${lines[i]}"`);
        lines[i] = newLine;
        const updatedContent = lines.join('\n');
        fs.writeFileSync(readmePath, updatedContent, 'utf8');
        console.log('✅ README updated (fallback)');
        break;
      }
    }
  }
  
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
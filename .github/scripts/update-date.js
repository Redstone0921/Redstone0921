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
  
  // 关键修复：匹配你的确切格式
  // 第5行：🔥 Today is **February 2, 2026**. I'm still alive. Nice to meet you!
  const targetPattern = /🔥 Today is \*\*.*?\*\*\. I'm still alive\. Nice to meet you!/;
  const newLine = `🔥 Today is **${formattedDate}**. I'm still alive. Nice to meet you!`;
  
  console.log('🔍 Looking for pattern:', targetPattern.toString());
  
  // 按行分析
  const lines = readmeContent.split('\n');
  console.log('📊 Total lines:', lines.length);
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    console.log(`Line ${i}: "${lines[i]}"`);
  }
  
  let updated = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === newLine.trim()) {
      console.log(`✅ Line ${i} already has correct date: "${lines[i]}"`);
      updated = true;
      break;
    }
    if (lines[i].includes('🔥 Today is') && lines[i].includes('I\'m still alive')) {
      console.log(`🔄 Found target at line ${i}: "${lines[i]}"`);
      console.log(`📝 Will change to: "${newLine}"`);
      lines[i] = newLine;
      updated = true;
      break;
    }
  }
  
  if (updated) {
    const updatedContent = lines.join('\n');
    fs.writeFileSync(readmePath, updatedContent, 'utf8');
    console.log('✅ README updated successfully!');
  } else {
    console.log('❌ No matching line found!');
    console.log('💡 Trying regex replacement...');
    
    if (targetPattern.test(readmeContent)) {
      const updatedContent = readmeContent.replace(targetPattern, newLine);
      fs.writeFileSync(readmePath, updatedContent, 'utf8');
      console.log('✅ Updated using regex');
    }
  }
  
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
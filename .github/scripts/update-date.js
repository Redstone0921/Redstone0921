const fs = require('fs');
const path = require('path');

// 获取 README.md 的路径
const readmePath = path.join(process.cwd(), 'README.md');
console.log('📁 README path:', readmePath);

try {
  // 读取 README 内容
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  console.log('📄 README loaded, length:', readmeContent.length, 'chars');
  
  // 获取当前日期（UTC）
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  console.log('📅 Current UTC date:', formattedDate);
  console.log('🕐 Full date:', now.toISOString());
  
  // 你的实际格式：🔥 Today is **February 2, 2026**. I'm still alive. Nice to meet you!
  const targetPattern = /🔥 Today is \*\*.*?\*\*\. I'm still alive\. Nice to meet you!/;
  const newLine = `🔥 Today is **${formattedDate}**. I'm still alive. Nice to meet you!`;
  
  if (targetPattern.test(readmeContent)) {
    // 使用正则替换
    const updatedContent = readmeContent.replace(targetPattern, newLine);
    
    if (updatedContent !== readmeContent) {
      fs.writeFileSync(readmePath, updatedContent, 'utf8');
      console.log('✅ README updated successfully!');
      console.log('🔄 Changed line to:', newLine);
    } else {
      console.log('⚠️  No changes needed (date already correct?)');
    }
  } else {
    console.log('❌ Target pattern not found in README');
    console.log('🔍 Looking for pattern:', targetPattern.toString());
    
    // 尝试更宽松的匹配
    const lines = readmeContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('Today is') && lines[i].includes('I\'m still alive')) {
        console.log(`📍 Found matching line at ${i}: "${lines[i]}"`);
        lines[i] = newLine;
        const updatedContent = lines.join('\n');
        fs.writeFileSync(readmePath, updatedContent, 'utf8');
        console.log('✅ README updated (fallback method)');
        break;
      }
    }
  }
  
} catch (error) {
  console.error('❌ Error updating README:', error);
  process.exit(1);
}

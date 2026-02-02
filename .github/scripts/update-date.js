const fs = require('fs');
const path = require('path');

// 获取README.md的完整路径
const readmePath = path.join(__dirname, '..', '..', 'README.md');

try {
  // 读取README内容
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  
  // 获取当前日期（使用UTC时间，与GitHub Actions保持一致）
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  console.log('Current UTC date:', formattedDate);
  console.log('Full date object:', now.toISOString());
  
  // 查找并替换包含"Today is"的行
  const lines = readmeContent.split('\n');
  let updated = false;
  const newSentence = `- Today is **${formattedDate}**. I'm still alive. Nice to meet you!`;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Today is') && lines[i].includes('I\'m still alive')) {
      console.log(`Found target line at index ${i}: "${lines[i]}"`);
      console.log(`Will replace with: "${newSentence}"`);
      
      lines[i] = newSentence;
      updated = true;
      break;
    }
  }
  
  if (updated) {
    readmeContent = lines.join('\n');
    // 写入更新后的内容
    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    console.log('✅ README updated successfully!');
  } else {
    console.log('❌ Target line not found. Please check README.md format.');
    // 尝试正则匹配作为备选方案
    const updatedContent = readmeContent.replace(
      /- Today is \*\*.*?\*\*\. I'm still alive\. Nice to meet you!/,
      newSentence
    );
    
    if (updatedContent !== readmeContent) {
      fs.writeFileSync(readmePath, updatedContent, 'utf8');
      console.log('✅ README updated using regex fallback!');
    } else {
      console.log('❌ No matching pattern found. README not updated.');
      process.exit(1);
    }
  }
  
} catch (error) {
  console.error('❌ Error updating README:', error);
  process.exit(1);
}
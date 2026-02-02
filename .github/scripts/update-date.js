const fs = require('fs');
const path = require('path');

// 获取README.md的完整路径
const readmePath = path.join(__dirname, '..', '..', 'README.md');

try {
  // 读取README内容
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  
  // 获取当前日期
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  console.log('Current date:', formattedDate);
  console.log('Original README content preview:', readmeContent.substring(0, 200));
  
  // 使用更灵活的替换逻辑
  // 方法A：替换整个句子（更稳定）
  const newSentence = `🔥 Today is **${formattedDate}**. I'm still alive. Nice to meet you!`;
  
  // 查找并替换包含"Today is"的行
  const lines = readmeContent.split('\n');
  let updated = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Today is') && lines[i].includes('I\'m still alive')) {
      console.log('Found target line at index', i, ':', lines[i]);
      lines[i] = newSentence;
      updated = true;
      break;
    }
  }
  
  if (updated) {
    readmeContent = lines.join('\n');
    // 写入更新后的内容
    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    console.log('README updated successfully!');
  } else {
    console.log('Target line not found. Trying alternative replacement...');
    
    // 方法B：使用正则表达式替换
    const updatedContent = readmeContent.replace(
      /🔥 Today is .*?I'm still alive\. Nice to meet you!/,
      newSentence
    );
    
    if (updatedContent !== readmeContent) {
      fs.writeFileSync(readmePath, updatedContent, 'utf8');
      console.log('README updated using regex!');
    } else {
      // 方法C：如果都没找到，添加新行
      console.log('Adding new line...');
      const updatedContent = readmeContent + '\n' + newSentence;
      fs.writeFileSync(readmePath, updatedContent, 'utf8');
    }
  }
  
} catch (error) {
  console.error('Error updating README:', error);
  process.exit(1);
}

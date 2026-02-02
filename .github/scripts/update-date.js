const fs = require('fs');
const path = require('path');

const readmePath = path.join(process.cwd(), 'README.md');

try {
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  
  // === 调试日期计算 ===
  const now = new Date();
  console.log('=== 日期调试信息 ===');
  console.log('1. new Date():', now.toString());
  console.log('2. toISOString():', now.toISOString());
  console.log('3. toUTCString():', now.toUTCString());
  console.log('4. 时间戳:', now.getTime());
  console.log('5. 本地时间:', now.toLocaleString('en-US'));
  console.log('6. UTC时间:', now.toLocaleString('en-US', {timeZone: 'UTC'}));
  
  // 手动计算 UTC 日期（绝对正确的方法）
  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth(); // 0-11
  const utcDate = now.getUTCDate();   // 1-31
  
  console.log('7. UTC年/月/日:', utcYear, utcMonth, utcDate);
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  
  const formattedDate = `${months[utcMonth]} ${utcDate}, ${utcYear}`;
  console.log('8. 格式化日期:', formattedDate);
  console.log('=== 调试结束 ===\n');
  
  // 匹配格式
  const newLine = `🔥 Today is **${formattedDate}**. I'm still alive. Nice to meet you!`;
  console.log('新行内容:', newLine);
  
  // 查找并替换
  const lines = readmeContent.split('\n');
  let updated = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Today is') && lines[i].includes('I\'m still alive')) {
      console.log(`找到第 ${i} 行: "${lines[i]}"`);
      
      if (lines[i].includes(formattedDate)) {
        console.log('✅ 日期已经正确，无需更新');
      } else {
        lines[i] = newLine;
        updated = true;
        console.log(`🔄 已更新为: "${newLine}"`);
      }
      break;
    }
  }
  
  if (updated) {
    fs.writeFileSync(readmePath, lines.join('\n'), 'utf8');
    console.log('✅ README 文件已保存');
  }
  
} catch (error) {
  console.error('❌ 错误:', error);
  process.exit(1);
}

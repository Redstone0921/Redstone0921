const fs = require('fs');
const path = require('path');

const readmePath = path.join(process.cwd(), 'README.md');

try {
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  const lines = readmeContent.split('\n');
  let updated = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 匹配格式：🔥 Today is **February 2, 2026**. I'm still alive. Nice to meet you!
    if (line.includes('🔥 Today is **') && line.includes('**. I\'m still alive')) {
      console.log('📝 找到目标行:', line);
      
      // 提取当前日期
      const dateMatch = line.match(/\*\*(.*?)\*\*/);
      if (dateMatch && dateMatch[1]) {
        const currentDateStr = dateMatch[1]; // "February 2, 2026"
        console.log('📅 当前README日期:', currentDateStr);
        
        try {
          // 解析日期
          const currentDate = new Date(currentDateStr);
          console.log('📊 解析为日期对象:', currentDate.toISOString());
          
          // 加一天
          currentDate.setDate(currentDate.getDate() + 1);
          
          // 格式化新日期
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
          const newDateStr = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
          console.log('🔄 新日期:', newDateStr);
          
          // 替换整行
          const newLine = `🔥 Today is **${newDateStr}**. I'm still alive. Nice to meet you!`;
          lines[i] = newLine;
          updated = true;
          
          console.log('✅ 将更新为:', newLine);
        } catch (e) {
          console.error('❌ 日期解析错误:', e.message);
        }
      }
      break;
    }
  }
  
  if (updated) {
    fs.writeFileSync(readmePath, lines.join('\n'), 'utf8');
    console.log('🎉 README 更新成功！');
  } else {
    console.log('⚠️  未找到匹配的行或无需更新');
  }
  
} catch (error) {
  console.error('❌ 错误:', error);
  process.exit(1);
}

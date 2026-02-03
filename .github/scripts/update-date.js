const fs = require('fs');
const path = require('path');

const readmePath = path.join(process.cwd(), 'README.md');

try {
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  const lines = readmeContent.split('\n');
  let updated = false;
  
  console.log('🔄 Running update script...');
  console.log('=== 时间调试信息 ===');
  
  // 显示当前时间信息
  const now = new Date();
  console.log('1. Action服务器时间 (UTC):', now.toISOString());
  console.log('2. Action本地时间:', now.toLocaleString('en-US', {timeZone: 'UTC'}));
  console.log('3. 北京时间 (UTC+8):', now.toLocaleString('en-US', {timeZone: 'Asia/Shanghai'}));
  console.log('4. 时间戳 (毫秒):', now.getTime());
  
  // 1. 先查找当前 README 中的日期
  let currentDateInReadme = null;
  let targetLineIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('🔥 Today is **') && line.includes('**. I\'m still alive')) {
      targetLineIndex = i;
      const dateMatch = line.match(/\*\*(.*?)\*\*/);
      if (dateMatch && dateMatch[1]) {
        currentDateInReadme = dateMatch[1];
        console.log(`5. 找到目标行 (第 ${i} 行): "${line}"`);
        console.log(`6. 提取的日期: ${currentDateInReadme}`);
      }
      break;
    }
  }
  
  if (currentDateInReadme && targetLineIndex !== -1) {
    console.log(`7. 开始日期解析...`);
    
    try {
      // 解析当前日期
      const currentDate = new Date(currentDateInReadme);
      
      // 调试信息 - 只显示有用的
      console.log(`8. README中的日期解析为: ${currentDate.toISOString()}`);
      console.log(`9. README当前日期: ${currentDateInReadme}`);
      
      const utcYear = currentDate.getUTCFullYear();
      const utcMonth = currentDate.getUTCMonth();
      const utcDate = currentDate.getUTCDate();
      
      console.log(`10. UTC分解: 年=${utcYear}, 月=${utcMonth+1}, 日=${utcDate}`);
      console.log('=== 调试结束 ===\n');
      
      // 加一天
      currentDate.setDate(currentDate.getDate() + 1);
      console.log(`11. 加一天后的日期: ${currentDate.toISOString()}`);
      
      // 格式化新日期
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
      
      const newYear = currentDate.getFullYear();
      const newMonth = currentDate.getMonth();
      const newDay = currentDate.getDate();
      
      console.log(`12. 新日期组件: 年=${newYear}, 月=${newMonth+1}(${months[newMonth]}), 日=${newDay}`);
      
      const newDateStr = `${months[newMonth]} ${newDay}, ${newYear}`;
      console.log(`13. 新格式化日期: ${newDateStr}`);
      
      // 检查是否需要更新
      if (currentDateInReadme === newDateStr) {
        console.log('✅ 日期已经正确，无需更新');
        console.log(`📅 当前日期: ${currentDateInReadme}`);
      } else {
        // 替换整行
        const newLine = `🔥 Today is **${newDateStr}**. I'm still alive. Nice to meet you!`;
        console.log(`14. 新行内容: ${newLine}`);
        
        console.log(`🔄 更新行 ${targetLineIndex}:`);
        console.log(`   原行: "${lines[targetLineIndex]}"`);
        console.log(`   新行: "${newLine}"`);
        
        lines[targetLineIndex] = newLine;
        updated = true;
      }
      
    } catch (e) {
      console.error(`❌ 日期解析错误: ${e.message}`);
    }
  } else {
    console.log('❌ 未找到匹配的日期行');
  }
  
  if (updated) {
    fs.writeFileSync(readmePath, lines.join('\n'), 'utf8');
    console.log('🎉 README 更新成功！');
    
    // 显示更新时间
    const updateTime = new Date();
    console.log('⏰ 更新时间 (UTC):', updateTime.toISOString());
    console.log('⏰ 更新时间 (北京时间):', updateTime.toLocaleString('en-US', {timeZone: 'Asia/Shanghai'}));
  } else {
    console.log('ℹ️  没有需要更新的内容');
  }
  
  // 最终验证
  console.log('\n=== 最终验证 ===');
  const finalContent = fs.readFileSync(readmePath, 'utf8');
  const finalLines = finalContent.split('\n');
  for (let i = 0; i < finalLines.length; i++) {
    if (finalLines[i].includes('Today is')) {
      console.log(`✅ 最终第 ${i} 行: "${finalLines[i]}"`);
      
      // 验证日期格式
      const dateMatch = finalLines[i].match(/\*\*(.*?)\*\*/);
      if (dateMatch) {
        console.log(`✅ 验证日期: ${dateMatch[1]}`);
      }
      break;
    }
  }
  
} catch (error) {
  console.error('❌ 严重错误:', error);
  process.exit(1);
}

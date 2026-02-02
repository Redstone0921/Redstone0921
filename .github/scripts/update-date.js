const fs = require('fs');
const path = require('path');

const readmePath = path.join(process.cwd(), 'README.md');

try {
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  const lines = readmeContent.split('\n');
  let updated = false;
  
  console.log('🔄 Running update script...');
  console.log('=== 日期调试信息 ===');
  
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
        console.log(`1. 找到目标行 (第 ${i} 行): "${line}"`);
        console.log(`2. 提取的日期: ${currentDateInReadme}`);
      }
      break;
    }
  }
  
  if (currentDateInReadme && targetLineIndex !== -1) {
    console.log(`3. 开始日期解析...`);
    
    try {
      // 解析当前日期
      const currentDate = new Date(currentDateInReadme);
      
      // 调试信息
      console.log(`4. new Date(): ${currentDate.toString()}`);
      console.log(`5. toISOString(): ${currentDate.toISOString()}`);
      console.log(`6. toUTCString(): ${currentDate.toUTCString()}`);
      console.log(`7. 时间戳: ${currentDate.getTime()}`);
      console.log(`8. 本地时间: ${currentDate.toLocaleString('en-US')}`);
      console.log(`9. UTC时间: ${currentDate.toLocaleString('en-US', {timeZone: 'UTC'})}`);
      
      const utcYear = currentDate.getUTCFullYear();
      const utcMonth = currentDate.getUTCMonth();
      const utcDate = currentDate.getUTCDate();
      
      console.log(`10. UTC年/月/日: ${utcYear} ${utcMonth} ${utcDate}`);
      console.log(`11. 当前格式化日期: ${currentDateInReadme}`);
      console.log('=== 调试结束 ===\n');
      
      // 加一天
      currentDate.setDate(currentDate.getDate() + 1);
      console.log(`12. 加一天后的日期对象: ${currentDate.toISOString()}`);
      
      // 格式化新日期
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
      
      const newYear = currentDate.getFullYear();
      const newMonth = currentDate.getMonth();
      const newDay = currentDate.getDate();
      
      console.log(`13. 新日期组件: 年=${newYear}, 月=${newMonth}(${months[newMonth]}), 日=${newDay}`);
      
      const newDateStr = `${months[newMonth]} ${newDay}, ${newYear}`;
      console.log(`14. 新格式化日期: ${newDateStr}`);
      
      // 检查是否需要更新
      if (currentDateInReadme === newDateStr) {
        console.log('✅ 日期已经正确，无需更新');
        console.log(`📅 当前日期: ${currentDateInReadme}`);
        console.log(`📅 新日期相同: ${newDateStr}`);
      } else {
        // 替换整行
        const newLine = `🔥 Today is **${newDateStr}**. I'm still alive. Nice to meet you!`;
        console.log(`15. 新行内容: ${newLine}`);
        
        lines[targetLineIndex] = newLine;
        updated = true;
        
        console.log(`🔄 更新行 ${targetLineIndex}:`);
        console.log(`   原行: "${lines[targetLineIndex]}"`);
        console.log(`   新行: "${newLine}"`);
      }
      
    } catch (e) {
      console.error(`❌ 日期解析错误: ${e.message}`);
      console.error(`❌ 错误堆栈: ${e.stack}`);
    }
  } else {
    console.log('❌ 未找到匹配的日期行');
    console.log('📄 文件前10行:');
    for (let i = 0; i < Math.min(10, lines.length); i++) {
      console.log(`   ${i}: "${lines[i]}"`);
    }
  }
  
  if (updated) {
    fs.writeFileSync(readmePath, lines.join('\n'), 'utf8');
    console.log('🎉 README 更新成功！');
    console.log('📁 文件已保存');
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
      break;
    }
  }
  
} catch (error) {
  console.error('❌ 严重错误:', error);
  console.error('❌ 错误堆栈:', error.stack);
  process.exit(1);
}

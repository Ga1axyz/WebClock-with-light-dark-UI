/*
 * @Descripttion: 本项目基于 https://github.com/bedimcode/responsive-clock-ui ，优化了部分代码
 * @version: 1.0
 * @Author: Ga1axy_z
 * @Date: 2021-07-24 14:54:31
 * @LastEditors: Ga1axy_z
 * @LastEditTime: 2021-07-26 21:21:02
 */

/* ========== 旋转时钟指针 ========== */
const hour = document.getElementById('clock-hour'),
      minutes = document.getElementById('clock-minutes'),
      seconds = document.getElementById('clock-seconds');

const clock = () =>{
    let date = new Date();

    // 360°/12=30°; 360°/60=6°
    let hh = date.getHours() * 30,
        mm = date.getMinutes() * 6,
        ss = date.getSeconds() * 6;
        
    // 将指针转动到当前角度，注意对时针度数转换的处理 同时这里采用了模板字符串的写法来拼接字符串
    hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    minutes.style.transform = `rotateZ(${mm + ss / 60}deg)`;
    seconds.style.transform = `rotateZ(${ss}deg)`;
}
// setInterval()方法可按照指定的周期（以毫秒计）来不停地调用函数或计算表达式，直到 clearInterval()被调用或窗口被关闭
setInterval(clock, 1000) // 1000ms = 1s

/* ========== 显示 时间和年月日 ========== */
const textHour = document.getElementById('text-hour'),
      textMinutes = document.getElementById('text-minutes'),
      textAmPm = document.getElementById('text-ampm'),
      dateDay = document.getElementById('date-day'),
      dateMonth = document.getElementById('date-month'),
      dateYear = document.getElementById('date-year');

const clockText = () =>{
    let date = new Date();

    let hh = date.getHours(),
        ampm,
        mm = date.getMinutes(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear();

    // 采用十二小时制
    if(hh > 12){
        hh = hh - 12;   // 13-23
        ampm = 'PM';
    }else if(hh == 12){
        ampm = 'PM';    // 12
    }else if(hh == 0){  // 0
        hh = 12;
        ampm = 'AM';
    }else{
        ampm = 'AM';    // 1~11
    }
    
    if(hh < 10){hh = `0${hh}`}  // 在只有一位的小时前添加一个 0
    textHour.innerHTML = `${hh}`;  // 显示小时
    
    if(mm < 10){mm = `0${mm}`}
    textMinutes.innerHTML = mm;

    textAmPm.innerHTML = ampm;

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    dateDay.innerHTML = day;

    dateMonth.innerHTML = `${months[month]},`;

    dateYear.innerHTML = year;
}
setInterval(clockText, 1000);

/* ========== 黑夜/白天模式切换 ========== */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bxs-sun';

// 使用用户已经选择过的主题作为下一次的默认主题 localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bxs-sun' ? 'add' : 'remove'](iconTheme);
}

// 获取当前主题设置
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-sun' : 'bxs-moon'

// 点击按钮激活或者停用黑暗模式
themeButton.addEventListener('click', () => {
    // toggle()用于在元素中切换类名。第一个参数为要在元素中移除的类名，如果该类名不存在则会在元素中添加类名
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);    // 注意，激活黑暗模式后，按钮的类名会同时包括 bxs-moon 和 bxs-sun
    // 将用户选择的主题保存到本地
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})
// 描述：数组的解构
// 作者：nightn(https://github.com/nightn)
// 目录：
//   1. 简单情况
//   2. 默认值
//   3. 嵌套数组解构
//   4. 剩余项解构


// 1. 简单情况
// 数组解构用于初始化
let skills = ['JavaScript', 'C++', 'Java'];
let [firstSkill, , thirdSkill] = skills;
console.log(firstSkill, thirdSkill);  // JavaScript Java
// 数组解构用于赋值（不需要圆括号）
let secondSkill;
[, secondSkill] = skills;
console.log(secondSkill);  // C++


// 2. 默认值
let [, , , fourthSkill = 'ES6'] = skills;
console.log(fourthSkill);  // ES6


// 3. 嵌套数组解构
let colors = ['red', ['green', 'blue']];
let [firstColor, [, thirdColor]] = colors;
console.log(firstColor, thirdColor);  // red blue


// 4. 剩余项解构（类似函数剩余参数的传递）
let restSkills;
[firstSkill, ...restSkills] = skills;
console.log(firstSkill);  // JavaScript
console.log(restSkills);  // [ 'C++', 'Java' ]

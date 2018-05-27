// 描述：ES6 默认实参用法
// 作者：nightn(https://github.com/nightn)
// 目录：
//   1. ES5 模拟默认实参
//   2. ES5 模拟默认实参（改进）
//   3. ES6 实现默认实参
//   4. 默认实参对 arguments 有影响
//   5. 默认实参也可以是表达式
//   6. 默认实参的 TDZ


// 1. ES5 模拟默认实参
// 缺点：当传入为 falsy 时，也会被当成无效实参
function createScreen1(content, width, height) {
    content = content || 'default';
    width = width || 200;
    height = height || 100;
    // ...
}


// 2. ES5 模拟默认实参（改进）
// 缺点：冗长
function createScreen2(content, width, height) {
    content = (typeof content === 'undefined') ? 'default' : content;
    width = (typeof content === 'undefined') ? 200 : width;
    height = (typeof content === 'undefined') ? 200 : height;
    // ...
}


// 3. ES6 默认实参
function createScreen3(content = 'default', width = 200, height = 100) {
    console.log(content, width, height);
    // ...
}
createScreen3(); // default 200 100
createScreen3('hello', undefined, 50);  // hello 200 50


// 4. 默认实参对 arguments 有影响
// 即：使用了默认实参之后，arguments 不再随具名形参的变化而变化（即使在非严格模式）
function testArguments(a = 0) {
    a = 100;
    console.log(a, arguments[0]);  // 100 42
}
testArguments(42);


// 5. 默认实参也可以是表达式
let x = 0;
let getValue = () => x++;
function add(a, b = getValue()) {
    return a + b;
}
console.log(add(1));  // 1
console.log(add(1));  // 2

// 意味着我们可以将前面的参数作为后面参数的默认实参
function mySqrt(first, second = first) {
    return first * second;
}
console.log(mySqrt(3));  // 9
// 那将位置反过来呢？


// 6. 默认实参的 TDZ
function mySqrt2(first = second, second) {
    return first * second;
}
// console.log(mySqrt2(undefined, 3));  // ReferenceError: second is not defined

// 以上默认实参定义相当于：
// let first = second;
// let second;
// 首先 JavaScript 引擎扫描代码，将 let/const 声明的变量都加入当前作用域的 TDZ
// TDZ 的规则很简单：
//   (1) 访问 TDZ 的变量，会抛出错误
//   (2) 当 JavaScript 变量执行到变量的声明语句时，会将其从 TDZ 删除
// 考虑以上代码，首先 first 和 second 变量都会添加进 TDZ，
// 当执行到第一条语句时，first 从 TDZ 出来，所以可以访问它，
// 但此时，second 还在 TDZ，试图访问 second，所以报错！

// 描述：块级函数
// 作者：nightn(https://github.com/nightn)


// ES5 的严格模式，不允许在块中声明函数
// ES6 的严格模式，块级函数仅在块级作用域有效，声明会被提升到块级作用域顶部
// ES6 非严格模式，块级函数在块所在的函数内部或全局有效，
//     声明会被提升到块所在的函数作用域的顶部，或全局作用域顶部

'use strict';
if (true) {
    console.log(typeof doSomething);  // "function"
    function doSomething() {}
}
console.log(typeof doSomething);  // "undefined"

// 如果将 'use strict' 注释掉，以上代码分别会打印 "function", "function"

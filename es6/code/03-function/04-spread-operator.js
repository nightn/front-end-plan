// 描述：Spread operator
// 作者：nightn(https://github.com/nightn)
// 目录：
//   1. 将数组展开后作为参数
//   2. 应用：toArray
//   3. 应用：数组去重


// 1. 将数组展开后作为参数
// 展开运算符类似于 Rest parameters 的逆运算
// Rest parameters 在函数声明的时候，指定将多个剩余参数聚合为一个数组
// 展开运算符则相反，它将数组展开为独立的参数

// 考虑求一个数组的最大值
let arr = [2, 3, 1, 6, 5];
// (1) 非常笨的办法
Math.max(arr[0], arr[1], arr[2], arr[3], arr[4]);
// (2) apply
Math.max.apply(Math. arr);
// (3) spread operator
Math.max(...arr);  // 很多时候可以替代 apply


// 2. 应用：toArray
// 将 iterable 对象转为数组
function toArray(container) {
    return [...container];
}
console.log(toArray('hello'));    // [ 'h', 'e', 'l', 'l', 'o' ]
// 等价于
console.log('hello'.split(''));   // [ 'h', 'e', 'l', 'l', 'o' ]
// 等价于
console.log(Array.from('hello')); // [ 'h', 'e', 'l', 'l', 'o' ]


// 3. 应用：数组去重
// 利用 ES6 的 Set 实现数组去重，去重后用 spread operator 转回数组
function uniq(array) {
    return [...new Set(array)];
}
let fruits = ['apple', 'orange', 'apple'];
console.log(uniq(fruits));  // [ 'apple', 'orange' ]

// 描述：尾调用优化
// 作者：nightn(https://github.com/nightn)
// 目录：
//   1. 尾调用定义
//   2. 尾调用优化
//   3. 尾调用优化的条件
//   4. 尾调用优化的应用

'use strict';  // 尾调用优化仅在 ES6 严格模式下有效


// 1. 尾调用定义
// 「尾调用定义」：一个函数在另一个函数中的最后一条语句被调用，称为尾调用
function doSomething() {
    return doSomethingElse();  // 这就是一个尾调用
}
function doSomethingElse() {};

// 2. 尾调用优化
// 「尾调用优化」
//    - 语言环境：仅在 ES6 严格模式下（在非严格模式不会进行优化）
//    - 优化方式：尾调函数不再单独新建执行环境，而是清空当前函数的执行环境，以复用
//    - 优化条件：并不是所有的尾调用都能优化，需要满足下面的条件


// 3. 尾调用优化的条件
//    (1) 尾调函数不能引用当前执行环境中的变量（即尾调函数不是一个闭包）
//    (2) 尾调函数执行完后，当前函数不能再有进一步操作
//    (3) 尾调函数的结果必须作为当前函数的结果进行返回
// 下面举几个反例进行说明

// [反例1]
// 该尾调用不会优化，因为尾调函数的结果并没有返回
function noOptimization1() {
    doSomethingElse();
}

// [反例2]
// 该尾调用不会优化，因为尾调函数执行完之后，还进行了别的操作
function noOptimization2() {
    return 1 + doSomethingElse();
}

// [反例3]
// 不会优化，因为它根本不是尾调用（回顾一下上面的尾调用定义）
function noOptimization3() {
    let result = doSomethingElse();
    return result;
}

// [反例4]
// 该尾调用不会优化，因为它是一个闭包
// 具体来说，func 引用了外部函数的 num，外部函数的执行环境不会被销毁，所以没法优化
function noOptimization4() {
    let num = 1;
    let func = () => num;
    return func();
}


// 4. 尾调用优化的应用
// 上面说了那么多，究竟尾调用优化有什么用呢？
// 其实一般情况下，我们不太会关注尾调用优化，除非是处理「递归函数」
// 尾调用优化对递归函数的性能提升的可不是一点半点

// 无法优化的递归
function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// 尾调用优化的递归
function factorial2(n, p = 1) {
    if (n <= 1) {
        return 1 * p;
    }
    let result = n * p;
    return factorial2(n-1, result);
}

// 描述：ES6 Rest parameter 用法
// 作者：nightn(https://github.com/nightn)
// 目录：
//   1. ES5 实现获取未命名实参
//   2. Rest parameters


// 1. ES5 实现获取未命名实参
// 以下函数实现了从 object 挑选指定属性，组成新的对象并返回
// 缺点：
//   (1) 无法通过函数声明明显地看出它可以接收多个参数
//   (2) arguments 获取全部实参，在此我们只需要获取 object 之后的剩余实参
function pick1(object) {
    let result = Object.create(null);
    for (let i = 1; i < arguments.length; i++) {
        let key = arguments[i];
        result[key] = object[key];
    }
    return result;
}
console.log(pick1(Object.prototype, 'toString', 'valueOf'));


// 2. Rest parameters
// Rest parameters 解决了上述问题
// 它有两个限制：
//   (1) 一个函数只能有一个 rest parameter，而且必须是最后一个参数
//   (2) rest parameter 不能用于对象字面量的 setter
// 另外要注意的是，rest parameter 不会影响函数的 length
function pick2(object, ...keys) {
    // keys is an `Array` of parameters
    let result = Object.create(null);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        result[key] = object[key];
    }
    return result;
}
console.log(pick2(Object.prototype, 'toString', 'valueOf'));
// rest paremeters don't affect function's length property
console.log(pick2.length); // 1

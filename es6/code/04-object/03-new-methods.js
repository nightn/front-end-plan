// 描述：Object 对象新增的方法
// 作者：nightn(https://gibhub.com/nightn)
// 目录：
//   1. Object 方法概述
//   2. Object.is()
//   3. Object.assign()


// 1. Object 方法概述
// ECMAScript 的一个「设计目标」是避免在全局和 Object.prototype 上创建新的函数
// 因此，很多方法都被加到了 Object 上，以下简单的介绍一些
// Object.create(proto): 创建一个原型为 proto 的对象，proto 可以为 null
// Object.defineProperty(obj, prop, desc): 在 obj 上定义一个名为 prop，描述符为 desc 的新属性
// Object.defineProperties(obj, descs);
// Object.getOwnPropertyNames(obj): 返回 obj 自身的所有属性名组成的数组（包括不可枚举属性）
// Object.keys(obj): 返回 obj 自身所有枚举属性组成的数组
// Object.getOwnPropertyDescriptor(obj, prop): 获取 obj[prop] 的属性描述符
// Object.getOwnPropertyDescriptors(obj): 获取 obj 所有自身属性的描述符
// Object.preventExtensions(obj): 浅层禁止 obj 被扩展，即不能为 obj 添加新属性
// Object.seal(obj): 浅层密封 obj，在不可扩展的基础上，现有属性不可配置、不可删除（writable 为 true 的属性除外）
// Object.freeze(obj): 浅层冻结 obj，在密封的基础上，现有属性不可修改
// Object.isExtensible(obj): obj 是否不可扩展
// Object.isSealed(obj): obj 是否被密封
// Object.isFrozen(obj): obj 是否被冻结
// Object.getPrototypeOf(obj): 获取 obj 的原型对象，相当于 obj.__proto__
// Object.setPrototypeOf(obj, proto): 将 obj 的原型设置为 proto
// ...
// 除了上述方法外，ES6 还引入了 Object.is() 和 Object.assign()


// 2. Object.is()
// Object.is(a, b) 用于比较 a 和 b 是否相等
// 它和 === 基本一致，但对一些特殊情况的处理更加合理:
//   (1) +0 和 -0 比较
//   (2) NaN 和 NaN 比较
console.log(+0 === -0);              // true
console.log(NaN === NaN);            // false
console.log(Object.is(+0, -0));      // false
console.log(Object.is(NaN, NaN));    // true


// 3. Object.assign()
// `Mixin` 是一种组合对象的流行模式，允许一个对象从其他对象获得属性和方法
// 许多 JavaScript 库常常有类似这样的函数
function mixin(receiver, supplier) {
    // 允许 receiver 不通过继承而获得 supplier 的属性和方法
    Object.keys().forEach(function(key) {
        receiver[key] = supplier[key];  // just a shallow copy
    });
    return receiver;
}

// Object.assign(receiver, ...suppliers) 可以实现类似的效果
// receiver 可以从多个 supplier 中获取它们的属性和方法 (in order)
let receiver = {};
Object.assign(receiver, 
    {
        type: 'js',
        name: 'file.js'
    },
    {
        type: 'css'
    }
);
console.log(receiver.type);  // 'css' 按序 receive，后面的属性将前面的同名属性覆盖了
console.log(receiver.name);  // 'file.js'

// 【注意】Object.assgin 的实现使用的是赋值运算符
let r = {};
let s = {
    get name() {
        return 'js'
    }
};
Object.assign(r, s);
let desc1 = Object.getOwnPropertyDescriptor(s, 'name');
let desc2 = Object.getOwnPropertyDescriptor(r, 'name');
console.log(desc1); // { get: [Function: get name], set: undefined, enumerable: true, configurable: true }
console.log(desc2); // { value: 'js', writable: true, enumerable: true, configurable: true }
// 可以看到 s.name 是一个访问器属性，而 assign 给 r 之后，r.name 确实一个数据属性
// 这进一步证实了 Object.assign() 使用的是赋值运算符，而不是 Object.defineProperty() 去定义新属性

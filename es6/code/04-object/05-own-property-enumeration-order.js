// 描述：对象自有属性的枚举顺序
// 作者：nightn(https://github.com/nightn)


// ES5 并没有明确规定对象自有属性的枚举顺序
// ES6 严格规定了该顺序，这会影响 Object.getOwnPropertyNames(),
//   Reflect.ownKeys(), Object.assign() 等方法的行为。
// 【重要】规定如下：
//    (1) 所有 numeric keys 按升序排列
//    (2) 所有 string keys 按添加的先后顺序排列
//    (3) 所有 symbol keys 按添加的先后顺序排列
let obj = {
    a: 1,
    2: 1,
    1: 1,
    d: 1,
    c: 1
};
obj.b = 1;
console.log(Object.getOwnPropertyNames(obj)); // [ '1', '2', 'a', 'd', 'c', 'b' ]

// 【注意】for-in 循环的枚举顺序并没有定义, Object.keys(), JSON.stringify() 也一样
//  因为 Object.keys(), JSON.stringify() 的枚举顺序和 for-in 是一样的

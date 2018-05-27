// 描述：重复的对象字面量属性
// 作者：nightn(https://github.com/nightn)


// 在 ES5 严格模式下，重复定义对象字面量属性会报错
// 但是在 ES6 (无论是严格模式还是非严格模式)，都不会报错
// 而是，后定义的属性会覆盖之前的属性值

let person = {
    name: 'unknown',
    name: 'nightn'  // 在 ES5 严格模式下会报错，但在 ES6 中不会
};
console.log(person);  // "nightn"

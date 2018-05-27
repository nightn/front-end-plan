// 描述：增强的原型
// 作者：nightn(https://github.com/nightn)
// 目录：
//   1. 修改对象的原型
//   2. 使用 super 访问原型


// 1. 修改对象的原型
// 原型是 JavaScript 继承的基础，对象的原型在内部通过一个 [[Prototype]] 属性表示
// 我们可以通过 Object.getPrototypeOf() 和 __proto__ (非规范) 访问对象的原型
// 那如何实现修改呢？
// ES6 引入了 Object.setPrototypeOf(obj, proto) 实现对象原型的修改
let person = {
    hello() {
        return 'hello';
    }
}
let dog = {
    hello() {
        return 'wang wang';
    }
}
let friend = Object.create(person);
console.log(friend.hello());  // "hello"
// friend's prototype becomes dog
Object.setPrototypeOf(friend, dog);
console.log(friend.hello());  // "wang wang"


// 2. 使用 super 访问原型
// super 只能在简写的方法中使用，简写的方法是「真正的方法」
// 它内部有一个 [[HomeObject]] 属性，该属性指向方法定义所在的对象
// super 是静态的，它的确定步骤如下：
//    (1) 寻找该方法的 [[HomeObject]]
//    (2) 使用 Object.getPrototypeOf() 方法获取 [[HomeObject]] 的原型，即为 super
let shape = {
    draw() {
        return 'draw';
    }
}
let rect = {
    draw() {
        return super.draw() + ' a rect';
    }
}
let square = {
    draw() {
        return super.draw() + ' with same width and height';
    }
}
Object.setPrototypeOf(rect, shape);
Object.setPrototypeOf(square, rect);
console.log(rect.draw());
console.log(square.draw());


// 如果用传统的写法，会报错
let rect2 = {
    draw() {
        return Object.getPrototypeOf(this).draw.call(this) + ' a rect';
    }
}
let square2 = {
    draw() {
        return Object.getPrototypeOf(this).draw.call(this) + ' with same width and height';
    }
}
Object.setPrototypeOf(rect2, shape);
Object.setPrototypeOf(square2, rect2);
console.log(rect2.draw());
// console.log(square2.draw());  // RangeError: Maximum call stack size exceeded
// 【错误分析】执行 square2.draw() 发生栈溢出，其实是发生递归循环了
//  执行 square2 的 draw() 方法时，会去调用原型 rect2 的方法（以 this 调用，此时 this 是 square2）
//  因此在执行 rect2 的 draw() 方法时，this 依然为 square2，从而不断得调用 rect2 的 draw(),
//  导致栈溢出

//  归根结底，是 this 的动态性和 super 的静态性所引起的区别

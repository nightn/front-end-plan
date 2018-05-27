// 描述：函数扮演的两种角色：普通函数、构造函数
// 作者：nightn(https://github.com/nightn)
// 目录：
//   1. 函数的两种角色
//   2. 使用 instanceof 区分普通调用和 new 调用 (ES5)
//   3. 使用 new.target (ES6)


// 1. 函数的两种角色
// 函数可以作为普通函数调用，也可以使用 new 作为构造函数调用
// 其原理是函数内部有两个内置的方法：[[Call]] 和 [[Constructor]]
// [[Call]]：函数普通调用执行的方法
// [[Constructor]]：函数通过 new 调用时执行的方法
// 【注意】
//   - 并不是所有的函数都有 [[Constructor]] 方法，如 ES6 的箭头函数
//   - 我们在函数内部如何区分函数的调用方式呢？


// 2. 使用 instanceof 区分普通调用和 new 调用 (ES5)
// 之所以可以使用 instanceof，因为：
// - 函数用 new 调用时，this 绑定到新建的对象，该对象的原型为 Person.prototype
//   而 Person.prototype.constructor 是 Person
// - 如果函数采用普通调用，this 是全局对象 (non strict mode) 或 undefined (strict mode)
function Person(name) {
    if (this instanceof Person) {
        console.log(this.constructor === Person);  // true
        this.name = name;
    } else {
        throw new Error('Your must use new with Person.');
    }
}
let nightn = new Person('nightn');
// let somebody = Person('somebody');  // Error: Your must use new with Person.

// 然而以上方法并不完美：
let notAPerson = Person.call(nightn, 'notAPerson');  // no error
// 所以，用 instanceof 是无法区分函数是通过 new 调用，还是通过 call/apply 调用的


// 3. 使用 new.target (ES6)
// new.target 只能在函数内部访问
// - 当使用 new 调用函数时，new.target 是当前函数的引用
// - 否则，其值为 undefined
function User(name) {
    if (typeof new.target !== 'undefined') {
        console.log(new.target === User);  // true
        this.name = name;
    } else {
        throw new Error('You must use new with User.');
    }
}
let user = new User('user');
// let notAUser = User.call(user, 'notAUser');  // Error: You must use new with User.

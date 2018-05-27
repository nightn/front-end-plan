// 描述：箭头函数
//      箭头函数的语法比较简单，关注的重点是其与普通函数的区别
// 作者：nightn(https://github.com/nightn)
// 目录：
//   1. 箭头函数没有自己的 this, super, arguments, new.target
//   2. 箭头函数不能使用 new 调用
//   3. 箭头函数中的 this 不能修改



// 1. 箭头函数没有自己的 this, super, arguments, new.target
let handler = {
    init: function(id) {
        document.addEventListener('click', event => {
            this.doSomething();  // this 不是箭头函数的，而是其外部的 init 函数的
            console.log(arguments[0]);  // arguments 也一样
        });
    },
    doSomething: function() {}
}

// 2. 箭头函数不能使用 new 调用
// 箭头函数内部没有 [[Constructor]] 方法，所以不能用 new 调用
// 所以它也没有自己的 new.target，也没有 prototype 属性
let MyType = () => {};
new MyType();  // TypeError: MyType is not a constructor


// 3. 箭头函数中的 this 不能修改
// 箭头函数的 this 就是它外层函数的 this，与箭头函数无关
// 既然与箭头函数无关，那么当然不能通过箭头函数的 call, this, bind 方法来修改别人的 this 了
// 一句话，箭头函数没有自己的 this，我们在箭头函数中访问的 this 是其外层函数的 this。它不能修改别人的东西！

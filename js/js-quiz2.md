# JS Quiz2

Quiz 来源：http://dmitry.baranovskiy.com/post/91403200

以下简短的 5 道题，考查对 JavaScript 核心知识的理解。不要用调试工具，直接思考答案。（注意，以下题目都是考虑在浏览器环境下运行的，而不是 Node 环境）。

我在文章底下给了每一道题的解析，不过我给的解析都比较简短，我假设你对一些基础比较了解，只在解析中分析了最关键的考查点。如果你想查看更详细的解析，可以阅读 **Nicholas C.Zakas** （没错，就是写《JavaScript高级程序设计》的那个 Nicholas）写的 [这篇文章](https://www.nczonline.net/blog/2010/01/26/answering-baranovskiys-javascript-quiz/) 。

## 目录

[题目](#题目)

[解答](#解答)

---

## 题目

### Q1

```javascript
if (!('a' in window)) {
    var a = 1;
}
console.log(a);
```

[查看解析](#a1)

### Q2

```javascript
var a = 1,
    b = function a(x) {
        x && a(--x);
    };
console.log(a);
```

[查看解析](#a2)

### Q3

```javascript
function a(x) {
    return x * 2;
}
var a;
console.log(a);
```

[查看解析](#a3)

### Q4

```javascript
function b(x, y, a) {
    arguments[2] = 10;
    console.log(a);
}
b(1, 2, 3);
```

[查看解析](#a4)

### Q5

```javascript
function a() {
    console.log(this);
}
a.call(null);
```

[查看解析](#a5)

---

## 解答

总的来说，这几道题还是很基础的，相比于 [Quiz1](https://github.com/nightn/front-end-plan/blob/master/js/js-quiz1.md) 简单不少。以下是解析。

### A1

考查声明提升。`var a  = 1` 虽然在 if 内部，但也进行了声明提升，所以运行 if 语句的时候，`window` 已经存在 a 属性了，所以 if 判断为 false，不会执行 a 的赋值操作，因此 a 为 undefined。

答案是 undefined。

[返回题目](#q1)

### A2

这道题考查函数声明和函数表达式。你可以能认为，a 既是一个变量声明，又是一个函数声明。其实不然，在这里，`function a(){...}`  这一块其实是一个命名函数表达式，而不是函数声明。**当我们把函数声明的代码放到一个需要值的位置上的时候，它实际上变成了函数表达式** 。因此只有变量声明才会提升，而作为函数名的 a 只能在函数内部访问，不能在全局访问。所以全局访问到的 a 是 1。

答案是 1。

[返回题目](#q2)

### A3

这道题也是考查声明提升。变量声明和函数声明都可以提升，那如果变量名和函数名相同呢？答案是：**函数声明提升的优先级大于变量声明的优先级**。所以 a 是一个函数。

答案是 `ƒ a(x) { return x * 2; }` 。

[返回题目](#q3)

### A4

考查函数内部对象 `arguments` 。`arguments` 是函数内部的一个类数组对象，保存了函数接收的参数。在这里，`arguments[2]` 其实是 `a` 的一个副本，它们具有相同的值，但不是同一块内存。既然是保存在不同的内存，那按理来说，更新其中一个，不会影响到另外一个吧。但事实上会影响！这是因为：**尽管命名参数和 `arguments` 保存在不同的内存，但是 JS 引擎会保持这两块内存的值是同步的**。因此 `arguments[2]` 总是和 `a` 具有相同的值。

答案为 10。

[返回题目](#q4)

### A5

考查 this 绑定。this 绑定是在函数调用时确定的，此处调用了 `call` 方法，它将 this 绑定到 `call` 接收的第一个参数，如果该参数是 undefined 或 null，那么将绑定到全局对象（非严格模式下），在浏览器绑定到 window 对象。我引用 ECMA-262 关于 `call()` 的介绍：

> If `thisArg` is `null` or `undefined`, *the called function is passed the global object as the this value*. Otherwise, the called function is passed `ToObject(thisArg)` as the this value.

更多关于 this 的介绍请参考 [JS this](https://github.com/nightn/front-end-plan/blob/master/js/js-this.md) 。

答案是 window。

[返回题目](#q5)






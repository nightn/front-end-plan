# JS Quiz1

Quiz 来源：http://perfectionkills.com/javascript-quiz/

建议大家先到这个网站上做一下（不要用调试工具运行，直接思考答案），做完之后再来看我这篇解答。我第一次做的时候，错了第 9 题，不知道大家错了哪几道。

## 目录

[题目](#题目)

[解答](#解答)

---

## 题目

以下代码片段都是在全局环境下执行的，根据 ES3 规范，写出代码片段的返回结果，如果发生运行时异常，则视结果为 Error。

### Q1

```javascript
(function() {
    return typeof arguments;
})();
```

[查看解析](#A1)

### Q2

```javascript
var f = function g() { return 23; }
typeof g();
```

[查看解析](#A2)

### Q3

```javascript
(function(x) {
    delete x;
    return x;
})();
```

[查看解析](#A3)

### Q4

```javascript
var y = 1, x = y = typeof x;
x;
```

[查看解析](#A4)

### Q5

```javascript
(function f(f) {
    return typeof f();
})(function() { return 1; });
```

[查看解析](#A5)

### Q6

```javascript
var foo = {
    bar: function() { return this.baz; },
    baz: 1
};
(function() {
    return typeof arguments[0]();
})(foo.bar);
```

[查看解析](#A6)

### Q7

```javascript
var foo = {
    bar: function() { return this.baz; },
    baz: 1
}
typeof (f = foo.bar)();
```

[查看解析](#A7)

### Q8

```javascript
var f = (function f(){ return '1'; }, function g(){ return 2; })();
typeof f;
```

[查看解析](#A8)

### Q9

```javascript
var x = 1;
if (function f() {}) {
    x += typeof f;
}
x;
```

[查看解析](#A9)

### Q10

```javascript
var x = [typeof x, typeof y][1];
typeof typeof x;
```

[查看解析](#A10)

### Q11

```javascript
(function (foo) {
    return typeof foo.bar;
})({ foo: { bar: 1 }});
```

[查看解析](#A11)

### Q12

```javascript
(function f() {
    function f() { return 1; }
    return f();
    function f() { return 2; }
})();
```

[查看解析](#A12)

### Q13

```javascript
function f() { return f; }
new f() instanceof f;
```

[查看解析](#A13)

### Q14

```javascript
with (function(x, undefined){}) length;
```

[查看解析](#A14)

---

## 解答

### A1

这道题考查的知识点包括：立即执行函数、`typeof` 云算法、函数的 `arguments` 对象。`arguments` 和 `this` 都是函数内部的对象，`typeof arguments` 返回字符串 “object”。

答案是 "object"。

[返回题目](#Q1)

### A2

这道题考查函数声明和函数表达式。这道题的函数看起来好像是函数声明和函数表达式的结合，不过要注意的是：**当我们把函数声明的代码放到一个需要值的位置上的时候，它实际上变成了函数表达式**。因此在全局我们只声明了一个变量，即 f，所以在全局访问 g 的时候，会抛出运行时异常。不过 g 可以在函数内部访问。

答案是 Error。

[返回题目](#Q2)

### A3

这道题考查 `delete` 运算符。`delete` 用于删除对象的属性，不能用于删除变量。

```javascript
var obj = { a: 1 };
obj.a;  // 1
delete obj.a; // true
obj.a; // undefined
delete obj; // false
obj; // {}
```

因此，对于这道题，我们执行 `delete x` ，是不会把 `x` 删除的。为了更清楚的说明，我将题干改了一下，然后观察输出。

```javascript
(function(x) {
    console.log(delete x); // false （此处输出false,说明delete并不会把x删除）
    return x;
})(1);
```

答案是 1。

[返回题目](#Q3)

### A4

这道题考查 JS 的连续赋值以及 JS 的执行过程。首先 JS 引擎解析代码分为两个过程：编译阶段和执行阶段。编译阶段处理变量、函数声明，执行阶段才真正执行代码，这也是变量提升的原理（详见 [JS 作用域](https://github.com/nightn/front-end-plan/blob/master/js/js-scope.md)）。对于这道题，y 的声明提升了，然后执行 `y = 1` ，y 的值由 undefined 变为 1。然后执行 `x = y = typeof x` 这个连续赋值，它分为两步，先执行 `y = typeof x` ，再将 `y = typeof x` 表达式的结果赋值给 `x` 。执行 `y = typeof x` 时，发现 x 不存在于全局对象中，所以 `x` 是 undefined，`typeof undefined` 返回字符串 ‘undefined’ ，再将这个结果赋值给 y，最后将整个结果赋值给 x，所以此时 x 的值是字符串 `undefined` 。

以上代码其实可以理解为：

```javascript
var y;
y = 1;
x = (y = typeof x);
x;
```

在这里有一个问题。我们都知道，在非严格模式下，没有找到变量时，会在全局声明一个变量。那么这里的 x 是在 `typeof x` 声明的，还是在 `x = ...` 声明的呢？

答案是 "undefined"。

[返回题目](#Q4)

### A5

解答这道题，关键要知道函数内部 `typeof f()` 中的 `f` ，究竟是函数名 `f` ，还是函数的参数 `f` 。在函数内部，我们是可以访问函数名（如果不是匿名函数）和参数的。举个例子：

- 在函数内访问函数名：

  ```javascript
  (function f() {
      console.log(f); // 会打印出函数f
  })();
  ```

- 也可以访问函数参数：

  ```javascript
  (function f(x) {
      console.log(x); // 123
  })(123);
  ```

但是，当我们的函数名和参数名相同时，会怎么样呢？

```javascript
(function f(f) {
    console.log(f);
})(123);
```

事实上，**同名情况下，函数参数会把函数名屏蔽掉** 。

答案是 “number”。

[返回题目](#Q5)

### A6

这道题比较简单，考查 this 的基本用法，此处 this 绑定到了全局对象，所以 this.baz 是 undefined，最后结果为字符串 “undefined”。关于 this 的概念和判断，我在 [JS this](https://github.com/nightn/front-end-plan/blob/master/js/js-this.md) 一文中有详细阐述，感兴趣的同学可以看一看。

答案是 "undefined"。

[返回题目](#Q6)

### A7

这种情况下发生的也是默认绑定，this 绑定到全局对象，答案是 "undefined"。详见 [JS this](https://github.com/nightn/front-end-plan/blob/master/js/js-this.md) 一文。

答案是 "undefined"。

[返回题目](#Q7)

### A8

这道题考查 `逗号运算符` ，看两个例子就明白了：

```javascript
(1, 2); // 2
(1, 2, 3, 4); // 4
```

结论：**`逗号运算符` 始终返回最后一个操作数**。有了这个结论，那么这道题就很简单了。

答案是 "number"。

[返回题目](#Q8)

### A9

这道题和 [Q2](#Q2) 一样，考查的是函数表达式和函数声明。你只要记住：**当我们把函数声明的代码放到一个需要值的位置上的时候，它实际上变成了函数表达式** 。在这里，题干中的 f 就是一个函数表达式，它不会进行声明提升，因此 f 这个标识符只能在 f 函数内部访问到，在全局访问 f，得到的是 undefined。

答案是 "1undefined" 。

[返回题目](#Q9)

### A10

这道题比较简单，首先 `typeof x` 是 "undefined"（x 声明了，但未赋值，所以值为 undefined），`typeof y` 也是 "undefined"（y 未声明）。所以 x 就是字符串 “undefined”，`typeof typeof 'undefined'` 等于 "string"。

答案是 "string"。

[返回题目](#Q10)

### A11

这道题很简单。在函数内部，参数 foo 的值为：

```javascript
foo = {
    foo: {
        bar: 1
    }
};
foo.bar; // undefined
```

答案是 "undefined"。

[返回题目](#Q11)

### A12

这道题又考查声明提升。关于声明提升，要记住 3 个结论：

1. **变量和函数的声明都会提升；**
2. **函数声明优先于变量声明；**
3. **同一变量的多次声明只会取最后一次声明。**

答案是 2。

[返回题目](#Q12)

### A13

用 `new` 关键字调用函数，如果函数没有返回，会默认返回新创建的实例对象。如果函数又返回，则覆盖默认的返回行为。因此在这里 `new f()` 返回的还是 `f` 。`f instance f` 的结果当然是 false 了。

答案是 false。

[返回题目](#Q13)

### A14

这道题考查 with 以及函数的用法。with 会将接收的对象作为添加到当前作用域链的最前端，所以访问 length 时，它先会去这个函数对象上查找，length 是函数对象的一个属性，表示接收参数的个数，在此为 2。

答案是 2。

[返回题目](#Q14)
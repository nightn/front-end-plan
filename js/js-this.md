# JS this

## 目录

- [this 概述](#this 概述)
  - [什么是 this](#什么是 this)
  - [为什么要有 this](#为什么要有 this)
- [this 绑定](#this 绑定)
  - [默认绑定](#默认绑定)
  - [隐式绑定](#隐式绑定)
  - [显示绑定](#显示绑定)
  - [new 绑定](#new 绑定)
  - [绑定优先级](#绑定优先级)
- [this 判断](#this 判断)
- [参考资料](#参考资料)

---

## this 概述

### 什么是 this

**this** 是 JavaScript 中的一个关键字，它是函数在调用时在函数内部才能访问到的一个对象，是函数执行环境的一部分。**非常重要的一点：this 的值是在函数被调用的时候确定的，概括性地讲，this 总是指向函数的调用主体**。

具体地说，函数在被调用时，会创建一个执行环境，这个执行环境包括 3 个部分：变量对象、作用域链以及 this。

- **变量对象**可以理解为函数的本身的作用域，决定了在函数内部我们可以直接访问哪些变量、函数；
- **作用域链**可以理解了变量对象链，当我们在函数自身的变量对象没有找到某个变量时，就会沿着作用域链往上查找，作用域链的本质是词法作用域链（因为它在函数声明的时候基本就确定下来了）。作用域链决定了当前函数与其他函数的交互规则，闭包便是作用域链的一个应用。
- 那么 **this** 是干什么的呢，或者说我们在函数中引入一个 **this** 对象，有何意义呢？

> 建议大家先阅读 [JS 作用域](https://github.com/nightn/front-end-plan/blob/master/js/js-scope.md) ，了解函数的执行环境和执行过程。

### 为什么要有 this

我阅读了很多关于 this 的文章，它们大部分是讨论什么是 this，以及如何确定 this 的指向，但却**很少有人研究函数执行的时候为什么要有 this 对象**。

试想一下，如果一个函数只有作用域和作用域的查找规则，没有任何有关函数调用者（即 this）的信息，那么这个函数是不是只是一个简单的计算过程，它接收输入、处理输入，最后返回处理结果，**因为它没有办法和任何对象进行关联**。还记得用 C 语言写的排序算法吗，C 语言里面是没有 this 的，但是 sort 函数为了和待排序的数组进行关联，它将数组作为 sort 函数的一个参数。C 语言里的 sort 声明：

```c

void sort(int *array, int n)
{
    // sort code
}
```

面向对象语言对此进行了改进，在面向对象语言里，函数不再只是一个独立的计算过程了。函数往往是关联到某个对象上的（或者说某个类），函数可以是类的成员，我们称之为方法。当我们用一个类的实例去调用这个方法时，我们需要在方法内部知道当前调用这个方法的实例到底是哪一个，因此有了 this。

在 Java 和 C# 这样的静态类型语言里，this 是成员函数内部的变量，它指向的就是成员函数的调用者。

JavaScript 与此类似，只是由于 JavaScript 的动态特性，它的 this 相比于静态语言的 this，涵盖的意义更加的广。

但我认为，**不管是哪一种面向对象语言，在函数中引入 this 的目标都是相同的**。**那就是为了让函数可以与某个对象关联起来（因为 this 可以指向函数的调用主体），而不是让函数表现得只是像一个完全独立的计算过程；前者是面向对象编程的函数，而后者是面向过程编程的函数。**

---

## this 绑定

JavaScript 中 this 的确定看似复杂，实则遵循了明确的 this 绑定规则，以下简述了 4 种 this 绑定规则及其优先级。理解了这些绑定规则，this 的确定便是轻而易举的事情了。

### 默认绑定

`默认绑定` 指的是在没有匹配到其他绑定规则的前提下，默认使用的绑定规则，最常见的情景就是函数的普通调用了。执行 `默认绑定` 时，严格模式下，this 绑定到 undefined，非严格模式下，this 绑定到全局对象（在浏览器环境下，全局对象就是 window）。

```javascript
var a = 10;
function foo() {
    var a = 20;
    function bar() {
        console.log(this.a);
    }
	bar();
}
foo(); // 10
```

上面的 bar 进行了常规的调用，因此执行了 `默认绑定` ，所以 this 绑定到了 window，输出结果为 10。

有些同学可能会认为应该输出 20。我在这里明确指出：**函数的 this 值只和函数的调用主体和调用方式有关，与函数的作用域链无关**。

### 隐式绑定

`隐式绑定` 是指在对象上调用函数时进行的绑定，此时 this 绑定到那个调用对象上。

```javascript
var a = 10;
var obj = {
    a: 20
};
function bar() {
    console.log(this.a);
}
obj.bar = bar;

bar(); // 10 默认绑定
obj.bar(); // 20 隐式绑定
```

### 显示绑定

使用 apply, call, bind 时会进行显示绑定，将 this 绑定到指定的对象。

```javascript
var a = 10;
function bar() {
    console.log(this.a);
}
var obj1 = {
    a: 20
};
var obj2 = {
    a: 30
};

bar.apply(obj1); // 20
bar.call(obj2); // 30
bar.apply(undefined); // 10

var foo = bar.bind(obj1);
foo(); // 20
```

### new 绑定

`new 绑定` 是指用 new 调用函数时发生的绑定，此时 this 绑定到新创建的对象。

```javascript
var a = 10;
function bar() {
    this.a = 20;
}

var obj = new bar();
console.log(obj.a); // 20 执行 bar 时，this 绑定到新创建的对象，即 obj
console.log(a); // 10  全局 a 没有被修改
```

### 绑定优先级

如果同时存在上述绑定，如何确定优先级呢？在这里，我直接给出结论吧：

`new 绑定` > `显示绑定` > `隐式绑定` > `默认绑定`

---

## this 判断

this 判断的 4 个步骤：

1. **由 new 调用？ 绑定到新创建的对象。**
2. **由 call 或者 apply（或者 bind）调用？ 绑定到指定的对象。**
3. **由上下文对象调用？ 绑定到那个上下文对象。**
4. **默认：在严格模式下绑定到 undefined，否则绑定到全局对象。**

事实上，以上步骤并没有涵盖所有的情况，比如：

```javascript
var a = 10;
var foo = {
    a: 20,
    bar: function() {
        console.log(this.a);
    }
}

foo.bar(); // 20
(foo.bar = foo.bar)(); // 10
(false || foo.bar)(); // 10
(foo.bar, foo.bar)(); // 10
```

以上结果可能看起来有点奇怪，在 [JavaScript深入之从ECMAScript规范解读this](https://github.com/mqyqingfeng/Blog/issues/7) 这篇文章中，作者从 ES 规范来解读 this，对以上这些情况进行了详细的解释，感兴趣的同学可以看一看。

最后，说一下 ES6 中的箭头函数。箭头函数并不会使用 4 条标准的绑定规则，而是根据词法作用域来决定 this，具体来说，箭头函数会继承外层函数调用的 this 绑定（无论 this 绑定到什么）。因此如果使用箭头函数，我们无需再写 `self = this` 这样的代码了。

---

## 参考资料

- 《你不知道的JavaScript》（上卷）  第二部分第 2 章
- [Javascript的this用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)
- [JavaScript深入之从ECMAScript规范解读this](https://github.com/mqyqingfeng/Blog/issues/7)
# JS 作用域

## 目录

- [概念](#概念)
- [实例分析](#实例分析)

---

## 概念

这部分的相关概念非常多，而且我在查阅资料的时候，发现很多文章对这些概念的描述并不清晰。以下是我根据我读过的书籍和资料，给出的个人理解，如有错误之处，欢迎大家批评指正。

相关的概念有：`执行环境`， `变量对象` ， `活动对象` , `作用域链` ，`argument对象` ，`this` 。除此之外，还包括 `JS引擎` ，`变量解析` 等。如果理解了以上的概念，再去看 `变量声明提升` ，`闭包` ，`with用法` 等知识点，会发现相当的容易。我不会通过一个个的列举来分开阐述这些概念，而是通过一个 JS 代码的执行过程，来讲这些概念串起来，并通过一个综合实例分析来巩固这些概念。

`执行环境` 定义了 JS 代码的运行环境，这个执行环境包括了 JS 代码有权访问的变量、对象、函数和 this。那具体是怎么实现的呢？其实，执行环境包含了一个叫做 `变量对象` 的东西，这个对象保存了环境中定义的所有变量和函数。执行环境可以分为三类：

- `全局执行环境` ：这是第一行 JS 代码执行时默认的环境，所有的全局代码都在这个环境中执行。
- `函数执行环境` ： 每个函数都有自己的函数执行环境。每当 JS 引擎发现一个函数调用，它就会创建一个新的函数执行环境。
- `Eval` : 在 eval 函数中的执行环境。

前面说过，每个执行环境都有一个变量对象，函数执行环境包含的变量对象称之为 `活动对象` 。

`JS引擎` 在分析 JS 代码时分为两个过程，一个是编译阶段，另一个是执行阶段。编译阶段主要是处理代码中的变量和函数声明，执行阶段才开始执行具体语句。当 JS 代码加载完成后，JS 引擎首先进行代码的编译阶段，它会在这个编译阶段**创建执行环境**，JS 引擎通过 3 个步骤完成执行环境的创建：

- **创建活动对象或者变量对象**：活动对象是 JS 中的一个特殊对象，它包含了当前执行环境所有的变量、函数参数和内部函数声明。活动对象和普通对象不同，它没有 proto 原型属性。
- **创建作用域链**：活动对象创建完毕后，JS 引擎会初始化作用域链，作用域链其实就是一个存放了很多变量对象的列表，包括了从全局执行环境的变量对象到当前函数执行环境的变量对象的所有变量对象。JS 引擎就是通过这个作用域链进行变量查找的。
- **确定 this 的值**：初始化作用域链后，JS 引擎开始确定 this 的值。关于 this 的确定，我会用专门的一节进行阐述。

JS 引擎在编译阶段结束后，会进入执行阶段。在执行阶段，JS 引擎会再次对代码进行扫描，对变量对象进行更新，并执行代码。

下面通过一个综合实例来分析整个过程。

---

## 实例分析

要透彻地理解 JavaScript 中的执行环境和作用域链，需要深入到 JS 引擎的编译和执行原理。我们将对以下代码的运行机制进行详细阐述。

```javascript
a = 1;
var b = 2;
cFunc = function(e) {
    var c = 10;
    var d = 15;
    a = 3;
    function dFunc() {
        var f = 5;
    }
    dFunc();
}
cFunc(10);
```

### 1. 全局执行环境 - 编译阶段

当上述代码加载完毕后，**JS 引擎扫描代码并进行编译**：

**compile line1**: 第一行是将 1 赋值给变量 a。之前讲过，JS 引擎在编译阶段只会处理声明信息，这个赋值语句既不是变量声明，也不是函数声明，因此在编译阶段时，JS 引擎会直接跳过这条语句。

**compile ine2**: 第二行是一个变量声明。JS 引擎会在全局执行环境的变量对象上加上 b 这个属性，并把它的值初始化为 undefined。

**compile line3**: 第三行，JS 引擎发现了一个函数声明，它首先会把函数的定义信息存放在 `堆` 上，并创建了一个名为 `cFunc` 的属性指向堆上面的这个函数定义信息，此时 JS 引擎并不关心这个函数定义包含的具体信息。当然，这个 `cFunc` 属性也是被添加到全局执行环境的变量对象上的。

**compile line12**: 这一行是对 `cFunc` 的调用，它不是一个声明，所以 JS 引擎会跳过。

以上完成了编译阶段，之前说过，JS 引擎在编译阶段会创建一个执行环境，在这里创建的是一个全局执行环境，它大概长这个样子。

```javascript
globalExecution = {
    activationObj: {
        argumentObj: {
            length: 0
        },
        b: undefined,
        cFunc: Pointer to the function definition
    },
    scopeChain: [Global execution context variable object],
    this: value of this
}
```

可以看到，**这个执行环境包含 3 个部分：变量对象、作用域链和 this**。变量对象除了有前面分析过的 b 属性和 cFunc 属性外，还有参数属性。还注意到，编译阶段结束后，b 的值还是 undefined，cFunc 的值实际上是一个地址，这个地址指向了存放在堆上的函数定义。作用域链目前只有一个成员，即全局执行环境的变量对象。最后就是 this 了。

> this 值的确定不在本文的讨论范畴，如需进一步了解，请参考 [js-this]()

### 2. 全局执行环境 - 执行阶段

编译阶段完毕后，JS 引擎开始进入**执行阶段**。JS 会再一次扫描代码，更新变量的值并执行代码。

**execute line1**: 执行第一行，为变量 a 赋值 1。首先 JS 引擎会在当前变量对象（或者说在作用域链最前端的变量对象）中查找变量 a，**发现并没有找到属性 a。一般来说如果没有找到，会沿着作用域链上的变量对象继续查找，直到查找到全局执行环境的变量对象，如果还没找到，就在全局执行环境的变量对象上添加上这个属性。**在我们这个例子中，由于当前的作用域链只包含全局执行环境的变量对象，而且 a 没有找到，所以它会在这个变量对象上添加 a 属性，并且将 a 的值初始化为 1。

**execute line2**: JS 引擎在变量对象上查找 b 属性，发现找到了，于是把 b 的值由 undefined 更新为 2。

**execute line3**: 第三行是函数声明。在编译阶段已经在堆上开辟了内存用于存放函数定义，并在变量对象上添加了指向这个函数定义的 `cFunc` 属性。在执行阶段，JS 引擎会跳过函数的声明。

以上便完成了全局执行环境的整个执行阶段。现在全局执行环境会变成这个样子。

```javascript
globalExecutionContextObj = {
    activationObj: {
        argumentObj: {
            length: 0
        },
        b: 2,
        cFunc: Pointer to the function definition,
        a: 1
    },
    scopeChain: [Global execution context variable object],
    this: value of this
}
```

### 3. cFunc 执行环境 - 编译阶段

我们在前面讲过，每次 JS 引擎进行函数调用时，都会创建一个新的函数执行环境。现在 JS 引擎执行到第 12 行，遇到了 cFunc 的调用，它会先把之前的全局执行环境压入`执行环境栈` ，然后创建一个新的 `cFunc执行环境` 。下面开始了对 cFunc 执行环境的编译阶段。

**compile line4**: 这一行声明了一个变量 c ，所以会把 c 添加到 cFunc 的活动对象，并初始化为 undefined。

**compile line5**: 将 d 添加到 cFunc 的活动对象，并初始化为 undefined。

**compile line6**: 这是一条赋值语句，在编译阶段直接跳过。

**compile line7**: 第 7 行是一个函数声明，同之前一样，JS 引擎将函数的定义存放在 `堆` 上，并在活动对象上创建了一个指向该函数定义的名为 `dFunc` 的属性。 

**compile line10**: 第 10 行不是声明，所以跳过。

以上完成了 cFunc 执行环境的编译阶段，编译完成后 cFunc 的执行环境是这样的：

```javascript
cFuncExecutionContextObj = {
    activationObj: {
        argumentObj: {
            0: e,
        	length: 1
        }
        e: 10,
        c: undefined,
        d: undefined,
        dFunc: Pointer to the function definition
    },
    scopeChain: [cFunc variable object, Global execution context variable object],
    this: value of this
}
```

可以看到与之前的全局执行环境不同的是，**cFunc 执行环境的变量对象中多了参数 e 的属性，而且实参到形参值的传递在编译阶段就已经完成**。另外注意到，**由于将全局执行环境进行了压栈，现在的作用域链有两个成员了，作用域链最前端已经变成了当前的 cFunc 执行环境的变量对象**。

### 4. cFunc 执行环境 - 执行阶段

**execute line4**: JS 引擎在 cFunc 变量对象找到了 c，将它的值由 undefined 更新为 10。

**execute line5**: JS 引擎在 cFunc 变量对象找到了 d，将它的值由 undefined 更新为 15。

**execute line6**: JS 引擎在 cFunc 变量对象未找到 a，它会沿着作用域链继续查找下一个变量对象（即全局执行环境的变量对象），找到了 a，因此它把全局 a 的值从 1 更新为 3。

**execute line7**: 函数声明，执行阶段直接跳过。

现在的 cFunc 执行环境为：

```javascript
cFuncExecutionContextObj = {
    activationObj: {
        argumentObj: {
            0: e,
            length: 1
        },
        e: 10,
        c: 10,
        d: 15,
        dFunc: Poiner to the function definition
    },
    scopeChain: [cFunc variable object, Global execution context variable object],
    this: value of this
}
```

### 5. dFunc 执行环境 - 编译阶段

第 10 行是 dFunc 的调用，调用之前，JS 引擎先将之前的 cFunc 执行环境压入执行环境栈（此时执行环境栈有两个成员，栈底是全局执行环境，栈顶是 cFunc 执行环境）。然后创建一个新的 dFunc 执行环境，开始了 dFunc 执行环境的编译阶段。

**compile line8**: f 的声明，将 f 添加为 dFunc 执行环境的变量对象的属性，初始化为 undefined。

编译阶段结束，dFunc 执行环境为：

```javascript
dFuncExecutionContextObj = {
    activationObj: {
        argumentObj: {
            length: 0
        },
        f: undefined
    },
    scopeChain: [dFunc variable object, cFunc variable object, Global execution context variable object],
    this: value of this
}
```

### 6. dFunc 执行环境 - 执行阶段

执行阶段也就一句话，将 f 赋值为 5，更新 dFunc 变量对象的 f 属性，值从 undefined 变成 5。

### 7. 后续过程

当 dFunc 执行阶段结束后，cFunc 的执行环境便会出栈（出栈后的执行环境应该会被垃圾回收机制销毁吧）。然后 cFunc 也执行完毕，同理，全局执行环境出栈，最后整个程序执行完毕。以上便是示例代码运行的全部过程。

---

## TODO

- 扩展作用域链
  - try/catch 和 with

## 参考资料

《JavaScript高级程序设计》

[ecma-262 Executable Code and Execution Contexts](http://www.ecma-international.org/ecma-262/8.0/index.html#sec-executable-code-and-execution-contexts)

[Understanding Scope and Context in JavaScript](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)

[Execution context, Scope chain and JavaScript internals](https://hackernoon.com/execution-context-in-javascript-319dd72e8e2c)


# 2019 哔哩哔哩前端一面记录

哔哩哔哩的前端一面非常注重前端基础，采用视频面试的形式，整个面试过程持续了大概 40 分钟。问题主要集中在 JavaScript、CSS、浏览器基础。以下逐一列出。

### Q&A

- **自我介绍。**

- **JavaScript 的类型有哪些？**

  回答了两大类：原始类型和对象类型。原始类型包括 number, string, boolean, undefined, null，以及 ES6 引入的 symbol 类型，除此之外都是对象类型，内置对象类型包括 Array, Map, Set, Function 等，以及几个包装器类型。

- **null 和 undefined 有什么区别？**

  - 简单说，undefined 表示未初始化，null 表示空对象。
  - 当声明一个变量而未初始化时，其值为 undefined；当函数的形参未传入实参时，其值为 undefined。
  - 而 null 表示的是空对象，表示这个变量未引用任何变量。
  - typeof undefined 返回 'undefined', typeof null 返回 'object'。

- **typeof 一个数组返回什么？如何区分数组和对象？**

  typeof 一个数组返回 'object'。关于如何判断一个数组。

  - Array.isArray()
  - Object.prototype.toString.call()
  - 面试官还补充了 instanceof。然后我说了一下对 instanceof 的理解，以及当多个框架时，instanceof 的局限性。

- **简单说一下三大存储机制：cookie, localStorage, sessionStorage。**

- **然后谈到了跨域，举了个例子**

  ```javascript
  bilibili.com
  a.bilibili.com
  b.bilibili.com
  ```

  最后的结论是：一级域名下的 cookie，在二级域名和三级域名下也是能够访问的。

- **还问了个事件循环的问题。**

  ```javascript
  setTimeout(() => { console.log(1); }, 0);
  promise.resolve(() => { console.log(2); });
  ```

  打印顺序是什么？先 2 后 1。我说到了 JavaScript 的 Event Loop，当调用栈为空的时候，会开始执行回调队列的第一个函数，以此类推。但不是很清楚 promise 的回调队列。面试官解释了 promise 和 setTimeout 回调队列的不同，其实 promise 中的函数先执行。（关于 promise 的原理还需要进一步研究）。

- **数组去重**

  ```javascript
  // 1 使用 set
  const uniq = (arr) => [...new Set(arr)];
  // 2 先 sort，再去重
  // 3 本办法 O(N^2)
  ```

  面试官追问第三种方法如何改进，我提到使用其他数据结构（如 Map）来加快查找。

- **深度拷贝**

  - 先创建一个绝对空对象，将其原型指向源对象的原型。
  - 复制属性，此处使用 for...in...，但它会枚举出原型链上的属性，所以使用 hasOwnProperty 判断一下。
  - 使用 typeof 判断每个属性，如果是原始类型，则直接赋值，如果是对象，则递归地调用拷贝函数。
  - 另外还要注意两点。第一个是属性除了值还有其他特性，直接赋值没办法拷贝这些特性。所以提到了使用 Object.getOwnPropertyNames()，Object.getOwnPropertyDescriptors() 来获取每个属性的描述符，然后通过 Object.defineProperty() 来创建属性。
  - 另外一点是属性的 key 为 symbol 类型的属性，这种属性使用 for...in... 和 Object.getOwnPropertyNames() 都无法获取，提到了 ES6 专门获取 symbol 属性的方法，不过具体名字我也忘了。（面试官最后表示我说的还比较全面）

- 然后问我 HTML 和 CSS 怎么样。我说基本的都还可以，原理方面有些还需要完善。面试官问你说的原理指的是，我举了个 CSS BFC 的例子。然后问了很多 CSS 的问题。

- **CSS 中的 position 有哪些属性值，解释一下每种属性值的用法。**

  我提到 static, relative, absolute 和 fixed，基本没什么问题，最后提了下 CSS3 的 sticky，坦言只知道名字，具体用法有待研究。

- **CSS 选择器优先级。**

  我说到：ID 选择器 > 类选择器 > 元素选择器 > 类型选择器。面试官追问到 !important，我说 !important 的优先级比 ID 选择器还高，但是不推荐使用，因为会使得 CSS 代码难以调试。

- **CSS 盒模型**

  从里到外：content box, padding, border, margin。追问道怪异盒模型，坦言不了解 IE。

- **了解 CSS 预处理器吗？**

  说到没怎么用过，就了解 CSS 预处理器变量很方便。

- **怎么绘制一个三角形？**

  宽高都为 0，合理设置边框高度，隐藏 3 个方向的边框。

- **怎么居中一个宽高未知的元素（包括垂直居中和水平居中）？**

  - flex

    ```css
    .box-parent {
        display: flex;
        justify-content: center;
        align-items: center
    }
    ```

  - absolute

    ```css
    .box-parent {
        position: relative;
    }
    .box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0
    }
    ```

  - 其他方法突然想不起来了

- **伪类和伪元素的区别？**

  - 伪类如 :hover, :visited 等表示所选元素在特定条件下激活，如鼠标悬浮、链接被访问。
  - 伪元素主要是 ::before, ::after 等，就相当于是一个元素，并举了个小的应用场景。

- **React, Vue, webpack 了解吗？**

  了解 React，然后简单说了下 react 的组件思想，虚拟 DOM，JSX 等。然后表述了一下对 webpack 的狭隘理解，主要用来构建 web 应用，提高前端自动化水平，如压缩混淆代码，合并文件，压缩图片等。还提到了类似的 gulp。

- **前端开发印象最深的一件事**（这个问题没仔细看想，答得不怎么好）。

总的来说，哔哩哔哩前端一面确实很基础，甚至未涉及计算机基础知识（如计算机网络，数据结构算法等），面试官人也很好很耐心。不过虽然基础，也有一些问题回答得不全面，还是不应该的，下面列一下用于查漏补缺。

### TODO

- 深入 promise, asyn 等 ES6 新引入的异步机制的原理。
- 手写数组去重、深度拷贝、去抖动等。方法越多越好，考虑越全面越好。
- 深入同源策略和跨域原理，最好和实际场景结合。
- 再过一遍 MDN 和 CSS 权威指南，重温 CSS。
- 强撸 ES6，尤其是 iterable, generator, proxy, promise 的原理。
- 抽时间再多实践一下各大框架和自动化工具。

（完）



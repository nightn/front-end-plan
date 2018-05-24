# JS 类型系统

## 目录

- [概述](#概述)
- [原始类型](#原始类型)
  - [number](#number)
  - [string](#string)
  - [bool](#bool)
  - [null](null)
  - [undefined](#undefined)
  - [symbol](#symbol)
- [对象类型](#对象类型)
- [包装器对象](#包装器对象)
- [总结](#总结)
- [参考资料](#参考资料)

---

## 概述

JavaScript 中数据类型分为两大类：`原始类型` （primitive type）和 `对象类型` （object type）。

原始类型包括 6 种：`number` , `string` , `boolean` , `null` , `undefined` 和 `symbol` （symbol 类型是 ES6 新引入的原始类型）。除了以上 6 中原始类型外，其他都属于对象类型。JavaScript 内置的对象类型包括 `Object` , `Function` , `Array` , `Number` , `String` , `Boolean` , `Date` , `RegExp` , `Error` 等（注意 `number` 类型和 `Number` 的区别。前者是原始类型，后者是对象类型，后者常常作为前者的包装器类型，在本文中的 [包装器对象](#包装器对象) 会详细讨论原始类型及其对应的包装器之间的关系）。除了使用 JavaScript 内置的对象类型外，JavaScript 还允许我们定义新的对象类型。

保存原始值的变量和保存对象的变量，它们的最大区别在于：**前者保存的是原始值本身，后者保存的只是指向对象的引用；在赋值或参数传递时，原始值变量传递的是拷贝的副本，而对象变量传递的只是引用**，如：

```javascript
let arr = [1, 2];
modify(arr);
console.log(arr); // [1, 2, 3]

function modify(array) {
    array.push(3);
}
```

上述例子中，`arr` 保存了一个数组对象的引用，当它作为实参传值给形参 `array` 时，传递的是引用，此时变量 `arr` 和 `array` 同时引用着内存中同一个数组对象，因此通过形参 `array` 对数组进行操作，同样会影响数组本身。

以下详细讨论 JavaScript 中的数据类型。

---

## 原始类型

### number

number 类型用于表示整数和浮点数。JavaScript 采用 IEEE 754 标准定义的 64 位浮点格式表示数字。number 类型包括了一些比较特殊的值。

**小数的极值**

我们可以通过 Number 对象上的 `MAX_VALUE` 和 `MIN_VALUE` 观察数字所能表示的最大值和最小值。

```javascript
// JavaScript 所能表示的最大正数和最小正数
//（如果是最大负数和最小负数的话，在前面加上负号就行了）
console.log(Number.MAX_VALUE);  // 1.7976931348623157e+308
console.log(Number.MIN_VALUE);  // 5e-324
```

**整数的极值**

以上极值是表示小数的情况，如果想知道 JavaScript 能表示的最大/小整数的话，可以通过 `Number.MAX_SAFE_INTEGER` 和 `Number.MIN_SAFE_INTEGER` 来访问。

```javascript
// JavaScript 所能表示的最大/小安全整数
console.log(Number.MAX_SAFE_INTEGER);  // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);  // -9007199254740991
```

**Infinity**

既然数字的表示范围有限，那如果超出范围会怎么样呢？考虑以下代码：

```javascript
// 数字超出范围后，会得到 Infinity 或 -Infinity
console.log(Number.MAX_VALUE * 2);  // Infinity
console.log(1 / 0);  // Infinity
console.log(-1 / 0); // -Infinity
console.log(Number.POSITIVE_INFINITY);  // Infinity
console.log(Number.NEGATIVE_INFINITY);  // -Infinity
```

由以上结果可知，数字超出范围后，会有 Infinity （正无限大）和 -Infinity （负无限大）表示。这样的好处是提高 JavaScript 的容错能力，即使用 1 除以 0 也不会报错（甚至 0/0 也不会报错，它会得到 NaN）。另外，`Number.POSITIVE_INFINITY` 等价于 Infinity，`Number.NEGATIVE_INFINITY` 等价于 -Infinity。

> 【注意】-Infinity 并不是一个单独的数字直接量，它是一个表达式，由负号运算符和数字直接量 Infinity 组成。

**NaN**

数字类型中还有个特殊的成员 NaN，意为 " **Not a Number** "，它会在期望一个数字而实际上产生一个无法转换为数字的结果时出现（即对数字求而不得的时候，会返回 NaN）。包括但不限于以下情况：

```javascript
Infinity - Infinity;  // NaN
1 * 'nice';  // NaN
0 / 0;  // NaN
Math.sqrt(-1);  // NaN
Number.NaN;  // NaN
```

NaN 有两个重要的特点：

- NaN 和任何变量运算都得 NaN。
- NaN 和任何值都不相等，包括它自己。

**typeof 检测类型**

可以用 `typeof` 运算符检测类型。

```javascript
typeof 123;  // 'number'
typeof Infinity;  // 'number'
typeof NaN;  // 'number'
```

### string

JavaScript 中的字符串直接量需要用引号括起来。有 3 种类型的引号均可使用：**单引号、双引号、反引号**。

```javascript
let str1 = 'single quotes';  // 单引号
let str2 = "double quotes";  // 双引号
let str3 = `backticks`;  // 反引号
// 一些更复杂的情景
let str4 = 'he said: "I like JavaScript"';  // 引号嵌套
let srt5 = "he said: \"I like JavaScript\"";  // 使用转义字符
// 强大的模板字符串
let str6 = `all strings: ${str1}, ${str2}, ${str3}, ${str4}, ${str5}`;
```

> 【注意】和其他语言（如 C/C++，Java）不同的是，JavaScript 没有字符类型。

### boolean

JavaScript 中的布尔类型仅包括两个值：true 和 false。

任何类型的值都能转成布尔类型，**我们把可以转换为 true 的称为** `真值` ，**把转换为 false 的称为** `假值` 。**假值包括以下 6 种（其余全部为真值）**：

- NaN
- null
- undefined
- 0
- -0
- '' 

### null

null 类型只包含一个值，即 null。

JavaScript 中的 `null` 表示**对一个不存在对象的引用**。

一个有趣的现象是，`typeof null` 返回的是 `'object'` ，而不是 `'null'` 。这个 bug 由来已久，在 JavaScript 中已经存在了将近二十年，也许永远也不会修复。

### undefined

undefined 类型同样只包含一个值，即 undefined。

JavaScript 中的 `undefined` 表示**未赋值**。如果声明了一个变量而未对其赋值，那么它的值就是 undefined。

### symbol

symbol 是 ES6 的新特性，用于创建一个独一无二的标识符。关于 symbol 我会单独写一篇文章进行阐述。

---

## 对象类型

ECMA-262 对于对象的定义是：

> 对象是无需属性的集合，其属性可以包含原始值、对象或者函数。

详见 [JS对象](https://github.com/nightn/front-end-plan/blob/master/js/js-object.md) 一文。对象类型包括 [Array](https://github.com/nightn/front-end-plan/blob/master/js/js-array.md) , [String](https://github.com/nightn/front-end-plan/blob/master/js/js-string.md) , Function, RegExp, Date 等，每一种类型都涉及大量知识点，需要单独进行讨论。

---

## 包装器对象

最后一个非常重要的知识点就是包装器对象。**简单来讲，包装器负责对其相应的原始类型进行封装，使原始类型看起来也具有很多快捷的方法**。

```javascript
'hello'.slice(1);  // 'ello'
'hello'.length;  // 5
1.234.toFixed(2);  // '1.234'
```

以上代码咋看之下很奇怪，`'hello'` 和 `1.234` 都属于原始类型，原始类型怎么会像对象类型一样，具有属性和方法呢？**其实，只要我们引用原始类型的属性和方法，JavaScript 引擎会自动为我们创建一个临时对象（即包装器对象），然后访问属性也好，调用方法也好，都发生在这个临时对象上，当访问结束后，JavaScript 引擎又自动销毁这个临时变量**。

以下例子可以帮助我们验证这个过程。

```javascript
let str = 'hello';
str.size = 5;  // 看起来好像我们给 str 添加了一个 size 属性
console.log(str.size);  // undefined
```

第二条语句看起来好像是给 `str` 添加了一个 `size` 属性，但其实只是将这个属性添加到了一个 `String` 类型的临时对象上，该语句执行完后，临时变量也被销毁了。

---

## 总结

- JavaScript 的类型分为**原始类型**和**对象类型**。原始类型包括 `number` , `string` , `boolean` , `undefined` , `null` 和 `symbol` 。除此之外都是对象类型。
- 原始类型和对象类型的最大区别：**原始类型的变量保存的是字面量本身，而对象类型的变量保存的是指向真实对象的引用**。
- `number` 类型有很多特殊值，如 Infinity，NaN 等，注意它们的特性和出现的场景。
- `string` 类型有三种引号方式：单引号、双引号、反引号。其中反引号表示的模板字符串非常强大。
- `boolean` 类型只是简单的包含 true 和 false。相比于 true 和 false，更重要的是**真值**和**假值**。好在我们只要记住 **6 个假值（NaN, undefined, null, 0, -0, ''）**，其余都是真值。
- 我们之所以可以访问原始类型变量的属性和方法，是由于 **JavaScript 引擎会自动帮我们创建临时的包装器对象**。

---

## 参考资料

- 《JavaScript 权威指南》（第六版）  3.1-3.6
- 《你不知道的JavaScript》（中卷） 第 1 章
-  [javascript.info](https://javascript.info/) ( [Data types](https://javascript.info/types) )
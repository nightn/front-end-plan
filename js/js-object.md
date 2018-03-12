# JS 对象

## 目录

- [什么是对象](#什么是对象)
- [对象的属性](#对象的属性)
  - [数据属性](#数据属性)
  - [访问器属性](#访问器属性)

---

## 什么是对象

对象是面向对象语言的一个最基本的概念。ECMA-262 对于对象的定义是：

> 对象是无序属性的集合，其属性可以包含基本值、对象或者函数。

每个对象都是基于一个引用类型创建的，可以是原生类型（如 Array, String, Function, Data 等），也可以是开发人员自己定义的类型。

以下定义一个 person 对象，并为它添加属性和方法。

```javascript
var person = new Object();
person.name = 'Nightn';
person.age = 24;
person.school = 'ZJU';
person.work = function() {
    console.log(this.name + ' is doing what he likes!');
}
```

我们更常用的对象创建方法是用对象字面量：

```javascript
var person = {
    name: 'Nightn',
    age: 24,
    school: 'ZJU',
    sayName: function() {
        console.log(this.name + ' is doing what he likes!');
    }
}
```

## 对象的属性

要深入理解对象，首先要深入理解对象组成的基本要素——对象的属性。对象的每一个属性在创建的时候就带有了一些特征，我们称之为**属性的特性**（attribute），ECMA-262 规定的特性描述了属性的各种特征，这些特性主要是为了实现 JavaScript 引擎用的，在 JavaScript 不能直接访问，为了表示它，我们使用双方括号表示法（如 [[Enumerable]]）。

ECMAScript 中有两种属性：**数据属性**和**访问器属性**。

> 我认为，数据属性和访问器属性可以用一句话来概括：**前者存放数据，后者封装数据**。

### 数据属性

数据属性包含了一个数据值的位置。通过这个位置可以读取和写入数据。数据属性有 4 个描述其行为的特性。

- **[[Configurable]]** ：表示属性**是否可配置**。可配置具体包括：**是否可以通过 delete 删除属性**、**是否可以将该数据属性转换为访问器属性**、**是否能修改属性的特性 ** 。对于常规定义的属性，它们的 [[Configurable]] 特性的值默认是 **true**，但对于用 `Object.defineProperty` 方法（后面会讲到）定义的属性，[[Configurable]] 特性的值默认是 **false**。

  > 是否能修改属性的特性，这个说法不准确。准确的说法是：是否可以修改属性的 [[Configurable]] 和 [[Enumerable]] 特性。[[Writable]] 和 [[Value]] 特性是否可以修改，与 [[Configurable]] 的值无关。

- **[[Enumerable]]** ：表示属性**是否可枚举**。即**是否能够通过 for in 枚举出来**。对于常规定义的属性，它们的 [[Enumerable]] 特性的值默认是 **true**，但对于用 `Object.defineProperty` 方法定义的属性，[[Enumerable]] 特性的值默认是 **false**。

- **[[Writable]]** ：表示属性**是否可修改**。对于常规定义的属性，它们的 [[Writable]] 特性的值默认是 **true**，但对于用 `Object.defineProperty` 方法定义的属性，[[Writable]] 特性的值默认是 **false**。

- **[[Value]]** ：**包含这个属性的数据值**。属性值的读取和写入都是通过这个特性完成的。默认值为 **undefined** 。

我们可以通过 `Object.defineProperty()` 方法进行属性的高级定义。它接收 3 个参数：目标属性所在的对象、目标属性、属性描述对象。参数具体解释我不多少了，直接看例子：

```javascript
var person = new Object();
Object.defineProperty(person, 'name', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'nightn'
});

// 输出试试
console.log(person.name); // nightn

for (var prop in person) {
    console.log(prop); // name 说明属性的 [[Enumerable]] 特性为 true
}

person.name = 'nice';
console.log(person.name) // nice 说明属性的 [[Writable]] 为 true，而且我们将 [[Value]] 特性的值从 'nightn' 改为了 'nice'

delete person.name;
console.log(person.name); // undefined 说明 [[Configurable]] 为 true
```

再举一个例子。我们知道，检测数据可以使用 `Array.isArray()` 方法（如果你想深入了解数据，可以看看 [JS 数组](https://github.com/nightn/front-end-plan/blob/master/js/js-array.md)）。我们之所以可以访问构造函数 Array 的 isArray 方法，就是因为构造函数实际上也是对象，isArray 只是这个对象的一个属性。那么我们使用 for in 去遍历 Array 属性的时候，会发现什么都看不到。

```javascript
console.log('isArray' in Array); // true 说明 isArray 的确是 Array 的属性

// 但是通过 for in 没有办法看到 isArray
for (var prop in Array) {
    console.log(prop);
}
```

根据之前讲的特性，我们很容易知道：`isArray` 属性的 [[Enumerable]] 特性是 false，所以我们没法枚举出来。我们可以做一个测试：

```javascript
// 将 Array 对象的 isArray 属性的 [[Enumerable]] 特性设置为 true
Object.defineProperty(Array, 'isArray', {
    enumerable: true
});
// 我们再用 for in 测试一下
for (var prop in Array) {
    console.log(prop); // 成功打印了 isArray
}
```

以上测试结果还说明了一个事实：我们可以配置 isArray 的特性，那意味着 isArray 的 [[Configurable]] 的值是 true。最后我们再测试一下 [[Writable]] 特性。

```javascript
Array.isArray = 1;
Array.isArray([]); // TypeError: Array.isArray is not a function
```

以上结果说明了 isArray 的 [[Writable]] 特性也是 true。

通过以上方法，我们的确可以逐步的获取一个属性的所有特性值，可是每次都这样操作太麻烦了，而且还会更改属性（或者说，不能实现属性的无损检测，哈哈）。幸运的是，ES5 提供了一个读取属性特性的方法：

`Object.getOwnPropertyDescriptor()` 

这个方法具体描述我不啰嗦了，直接看例子吧：

```javascript
// 记得把之前修改的 isArray 还原，如果你在 devtool 运行，直接刷新浏览器就行
var desc = Object.getOwnPropertyDescriptor(Array, 'isArray');
console.log(desc.configurable); // true
console.log(desc.enumerable); // false
console.log(desc.writable); // true
console.log(desc.value); // ƒ isArray() { [native code] }
// 以上输出也验证了我们之前对 isArray 的测试结果
```

### 访问器属性

访问器属性不像数据属性那样包含着数据，它包含的是一对 getter、setter 函数（不过，这两个函数都不是必须的）。就像我之前所说的，数据属性存放数据、访问器属性封装数据。封装指的是数据的读写不再是那么轻而易举了，访问器属性加了限制：**在读取访问器属性时，会调用 getter 函数；在写入访问器属性时，会调用 setter 函数**。有了这个限制，我们就能在读写属性时做一点额外的工作（比如写入时对传入值进行验证，或者联动地修改其他值）。访问器属性有如下 4 个特性：

- **[[Configurable]]** ： 表示属性**是否可以配置**。包括**是否能用 delete 删除该属性**、**是否可以将属性由访问器属性转换为数据属性**、**是否能修改属性的特性**。
- [[**Enumerable**]] ：表示属性**是否可以枚举**，即是否可以通过  for in 来访问。
- **[[Get]]** ： 在**读取**属性时调用的函数。默认为 **undefined**。
- **[[Set]]** ： 在**写入**属性时调用的函数。默认为 **undefined**。

举个栗子（栗子来源于《JavaScript高级程序设计》）：

```javascript
var book = {
    _year: 2004,
    edition: 1
};
Object.defineProperty(book, 'year', {
    get: function() {
        return this._year;
    },
    set: function(newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    } 
});

book.year = 2000;
console.log(book.year); // 2004 访问器属性的 setter 加了限制，修改失败

book.year = 2005
console.log(book.edition); // 2 联动修改其他属性
```

在以上例子中，我们定义了一个访问器属性 `year` ，我们用这个访问器属性**封装**了私有的数据属性 `_year` 。这样相当于在读写 `_year` 的时候进行了限制。访问器属性最常用的场合就是设置一个属性时，一并设置它的联动属性。

> JS 中使用访问器属性封装私有的数据属性，和 C# 中用属性封装私有字段非常相似，有兴趣的同学可以看看关于 C# 属性的介绍。

最后再介绍一个一次性定义多个属性的方法：

`Object.defineProperties()`

**Talking is cheap, so I just show you code:**

```javascript
var book = {
    edition: 1
};
Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    year:{
        get: function() {
            return this._year;
        },
        set: function(newValue) {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
```

---

未完待续……

## 参考资料

- 《JavaScript高级程序设计》（第 3 版） 6.1
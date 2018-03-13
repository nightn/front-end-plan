# JS 数组

## 目录

- [数组的特点](#数组的特点)
  - [混合存放](#混合存放)
  - [动态增长](#动态增长)
  - [数组也是普通对象](#数组也是普通对象)
  - [创建数组](#创建数组)
- [数组检测](#数组检测)
  - [instanceof](#instanceof)
  - [Array.isArray](#Array.isArray)
- [数组转换](#数组转换)
  - [valueOf](#valueOf)
  - [toString](#toString)
  - [toLocaleString](#toLocaleString)
  - [join](#join)
- [数组端操作](#数组端操作)
  - [push](#push)
  - [pop](#pop)
  - [shift](#shift)
  - [unshift](#unshift)
- [数组综合操作](#数组综合操作)
  - [concat](#concat)
  - [slice](#slice)
  - [splice](#splice)
- [数组查找](#数组查找)
  - [indexOf](#indexOf)
  - [lastIndexOf](#lastIndexOf)
- [数组重排](#数组重排)
  - [sort](#sort)
  - [reverse](#reverse)
- [数组迭代](#数组迭代)
  - [forEach](#forEach)
  - [map](#map)
  - [filter](#filter)
  - [every](#every)
  - [some](#some)
- [数组缩小](#数组缩小)
  - [reduce](#reduce)
  - [reduceRight](#reduceRight)
- [参考资料](#参考资料)

---

## 数组的特点

### 混合存放

一般意义上的数组用来存放一组类型相同的数据。JS 的数组有点不同，JS 允许一个数组存放不同类型的数据。我称之为 `混合存放` 。如：

```javascript
var mixArr = [1, 'string', true, null, undefined, {name: 'nightn'}];
```

### 动态增长

定义数组时，我们可以不必指定其大小。

```javascript
var arr = [];
arr[5] = 'hello';
console.log(arr.length); // 6
arr[arr.length] = 'other'; // 相当于在数组末尾添加一项
```

### 数组也是普通对象

数组也是普通对象，这意味着我们可以操作数组本身的属性（如 length）:

```javascript
var arr = [1, 2, 3];
arr.length = 0; // 此时 arr 变为空数组。因此 arr.length = 0; 是一个用来清空数组的好方法
```

不过需要注意的是，数组的 length 属性必须大于等于 0，如果将其赋值为负数，则会报错。

另外，我们还可以在数组上添加自定义属性：

```javascript
var arr = [1, 2, 3];
arr.prop = 'test';
console.log(arr['prop']); // test
arr['100'] = 1;
console.log(arr.length); // 101 （如果指定属性可以转为 number，相当于修改指定索引的项，这样会改变 length 属性）
```

### 创建数组

创建数组有好几种方式。

- 构造函数

  ```javascript
  var arr1 = new Array(5); // 创建了一个大小为 5 的数组
  var arr2 = new Array('hello', 'world'); // 创建了大小为 2 的数组，元素分别为 'hello' 和 'world'
  ```

- 数组字面量

  ```javascript
  var arr3 = []; // 创建了一个空数组
  var arr4 = ['hello', 'world']; // 创建了大小为 2 的数组，元素分别为 'hello' 和 'world'
  ```

  注意，在使用数组字面量时，是不会调用 Array 构造函数的。那么问题来了，没有调用构造函数，那怎么初始化原型链，没有原型链，怎么访问定义在原型的方法？（如，为什么执行 `[].push(1)` 不会报错）。这是一个值得思考的问题，我觉得可能是在调用原型方法的时候，执行了某种从数组字面量到 Array 实例的装箱操作。

---

## 数组检测

数组检测有两种方法：`instanceof` 运算符和 `Array.isArray` 方法。

### instanceof

```javascript
var arr = [];
console.log(arr instanceof Array); // true
```

`instanceof` 检测数组依赖于 Array 构造函数的唯一性。肯定有人会问，难道 JS 中还有多个 Array 构造函数吗？还真有！当一个页面包含多个框架，就会存在多个全局执行环境，不同的全局执行环境存在不同的 Array 构造函数。将一个框架的数组实例和另一个框架的 Array 构造函数，用 `instanceof` 来判断，你将会得到 false。

因此，使用 `instanceof` 检测数组，并不一定都是准确的。

> 在 Java, C# 等多线程语言里，存在着一个叫做 `线程安全` 的概念。简单来讲，一个应用程序如果在单线程和多线程的环境下都能正确执行，那么这个应用程序就是线程安全的。由此类比，是不是可以说 `instanceof` 运算符不是 `全局执行环境安全` 的呢？

### Array.isArray

构造函数的实质也是对象，在对象上定义的属性相当于这个构造函数的静态成员。`isArray` 就是 `Array` 的一个静态方法，它用于确定某个值到底是不是数组，而不管它是在哪个全局执行环境中创建的。

> 像大多数的内置构造函数的静态成员一样，我们无法用 for in 看到它们。这说明这些属性的 [[Enumerable]] 特性被设置为了 false。不过我测试了一下 isArray，发现它的 [[Configurable]] 特性是 true（因为我可以用 delete 删除它），[[Writable]] 特性也是 true（因为我可以重写它）。更多关于属性特性的知识可以参考我的另一篇文章：[JS 对象](https://github.com/nightn/front-end-plan/blob/master/js/js-object.md) 。

我还是礼貌性地举一个 `Array.isArray` 的例子吧：

```javascript
if (Array.isArray(value)) {
    // do something if value is an instance of Array
}
```

相比于它的使用，我更感兴趣的是它的实现。

```javascript
// TODO 自己实现 Array.isArray
```

---

## 数组转换

所有对象都具有 `valueOf()` , `toString()` , `toLocaleString()` 方法，数组也不例外。

### valueOf

数组的 `valueOf` 返回的还是数组本身。

```javascript
var arr = [1, 2, 3];
console.log(arr === arr.valueOf()); // true
```

### toString

数组的 `toString` 方法将调用数组每一项的 `toString` 方法，然后用逗号将每一项连接起来。

### toLocaleString

数组的 `toLocaleString` 方法和 `toString` 的不同在于，它会调用数组每一项的 `toLocaleString` 方法。

### join

`toString` 是默认用逗号分隔，如何自定义分隔符号呢？用 `join` 方法。

**综合示例**：

```javascript
var nightn = {
    toString: function() {
        return 'nightn';
    },
    toLocaleString: function() {
        return 'nightn.dev@gmail.com'
    }
};
var arr = [nightn, nightn];
console.log(arr.toString()); // nightn,nightn
console.log(arr.toLocaleString()); // nightn.dev@gmail.com,nightn.dev@gmail.com
console.log(arr.join('||')); // nightn||nightn
```

---

## 数组端操作

`数组端操作` 是我自己给的定义，指的是专门对数组两端元素进行操作的方法。包括 ：

- `push` ： 在数组末端添加元素
- `pop` ：删除数组末尾元素
- `shift` ：删除数组前端元素
- `unshift` ：在数组前端添加元素

有一个值得注意的地方：**这 4 个方法都会改变数组本身**。

通过使用 `push` 和 `pop` ，可以模仿一个栈。通过使用 `push` 和 `shift` （或者使用 `unshift` 和 `pop`） ，可以模仿一个队列。以下具体讨论这四个方法。

### push

`push` 方法比较简单，在数组最后添加元素，并返回添加操作之后的数组的大小。

```javascript
var arr = [5, 6];
arr.push(7); // 添加元素 7，并返回当前的数组大小：3
arr.push(8, [9, 10]); // 此时返回多少呢？5 or 6？答案是 5，注意 push 和 concat 的区别。
```

### pop

`pop` 方法将数组最后一个元素弹出，并返回该元素。

```javascript
var skills = ['JavaScript', 'Java', 'C++'];
var item = skills.pop();
console.log(item); // C++
console.log(skills.toString()); // JavaScript,Java
```

### shift

`shift` 方法将数组第一个元素弹出，并返回该元素。

```javascript
var skills = ['JavaScript', 'Java', 'C++'];
var item = skills.shift();
console.log(item); // JavaScript
console.log(skills.toString()); // Java,C++
```

### unshift

`unshift` 方法和 `shift` 相反，它会在数组第一个元素之前添加元素，并返回添加之后，数组的长度。

```javascript
var skills = ['JavaScript', 'Java', 'C++'];
var len = skills.unshift('C#', 'Python', 'Lisp');
console.log(len); // 6
console.log(skills.toString()); // C#,Python,Lisp,JavaScript,Java,C++
```

---

## 数组综合操作

### concat

`concat` 用于拼接数组，即在当前数组的末尾添加新的元素或数组，返回拼接好的数组。

```javascript
var skills = ['JavaScript', 'Java', 'C++'];
var skills2016 = skills.concat('Python');
console.log(skills.toString()); // JavaScript,Java,C++
console.log(skills2016.toString()); // JavaScript,Java,C++,Python
var skills2017 = skills2016.concat('Angular', ['ES6', 'TypeScript']);
console.log(skills2017.toString()); // JavaScript,Java,C++,Python,Angular,ES6,TypeScript

```

注意 `concat` 和 `push` 的异同。二者都是在数组末尾添加元素，而且可以一次性添加多个。区别在于：

- `push` 在原数组上进行操作；而 `concat` 返回一个新数组，不修改原数组

- `push` 将接收的每一个参数作为整体的元素来处理；而 `concat` 会对数组参数中所有的单个元素进行处理，例如：

  ```javascript
  var arr = [1, 2, 3];
  var arrConcat = arr.concat([4, 5]); // concat 处理
  arr.push([4, 5]); // push 处理
  console.log(arrConcat.length); // 5
  console.log(arr.length); // 4
  ```

### slice

数组的 `slice` 方法和字符串的分割方法 `slice` 很相似（具体可以参考[JS 字符串](https://github.com/nightn/front-end-plan/blob/master/js/js-string.md)）。它接收两个参数，第一个是切割起始索引，第二个是切割结束索引，切割区间是左闭右开。另外，和字符串的 `slice` 一样，数组的 `slice` 对负数参数和逆区间的处理都很合理。

- 如果参数有负数，就将其加上数组的长度（如果加上数组的长度后还是为负数，貌似会将其当做 0 处理）
- 如果有逆区间（即 2 个参数都为正的情况下，参数 1 大于参数 2），则返回空数组
- 最后一点，`slice` 返回处理后的数组，它不会对原始数组有任何修改

```javascript
var arr = [1, 2, 3, 4, 5];
var arr1 = arr.slice(2, 4);
console.log(arr1.toString()); // 3, 4
var arr2 = arr.slice(-2, 4);
console.log(arr2.toString()); // 4
var arr3 = arr.slice(-1, -3);
console.log(arr3.length); // 0
console.log(arr.toString()); // 1,2,3,4,5  可见原始数组并未被修改
```

### splice

`splice` 可以说是数组最强大的方法了，之前我们在 [数组端操作](#数组端操作) 中提到的 `push` , `pop` , `shift` 和 `unshift` 方法都是对数组两端进行增加或删除元素。而 `splice` 仅凭一己之力，就能实现在数组任何位置进行删除和增加元素。

`splice` 接收 3 个参数：要修改的位置索引、要删除的元素的个数、要增加的元素。**值得注意的是，`splice` 会对原始数组进行修改，它的返回值是删除的数组。**

```javascript
var arr = ['orange', 'blue', 'red', 'yellow'];
// 用 splice 删除数组元素
arr.splice(1, 2);
console.log(arr.toString()); // orange,yellow
// 用 splice 增加元素
arr.splice(1, 0, 'black', 'white');
console.log(arr.toString()); // orange,black,white,yellow
// 用 splice 替换元素
arr.splice(1, 1, 'red');
console.log(arr.toString()); // orange,red,white,yellow
```

---

## 数组查找

数组查找的方法比较简单，包括 `indexOf` 和 `lastIndexOf` ，和字符串的这两个方法非常相似。值得注意的是，这两个方法是用**全等运算符**进行比较。

### indexOf

**从数组起始位置往后查找给定元素**，找到了则返回对应索引，没找到则返回 -1。也可以接收第 2 个参数，表示从哪个索引开始查找，可以缩小查找范围。

### lastIndexOf

**从数组末尾往前查找给定元素**，找到了则返回对应索引，没找到则返回 -1。也可以接收第 2 个参数，表示从哪个索引开始查找，可以缩小查找范围。

```javascript
var arr = [6, 4, 3, 5, 4, 8];
console.log(arr.indexOf(4)); // 1
console.log(arr.lastIndexOf(4)); // 4
console.log(arr.indexOf(4, 2)); // 4
console.log(arr.lastIndexOf(4, 3)); // 1
```

---

## 数组重排

数组重新排序主要有两个方法：`sort` 和 `reverse` 。

### sort

`sort` 方法默认会调用每个元素的 `toString` 方法，再进行比较排序。

```javascript
var arr = [4, 23, 1, 12, 8];
arr.sort();
console.log(arr.toString()); // 1,12,23,4,8
```

但是 `sort` 方法可以接收一个比较函数，来自定义比较规则。

```javascript
var arr = [4, 23, 1, 12, 8];
function sortByNum(num1, num2) {
    if (num1 < num2) {
        return -1;
    }
    if (num1 > num2) {
        return 1;
    }
    if (num1 === num2) {
        return 0;
    }
}
arr.sort(sortByNum);
console.log(arr.toString()); // 1,4,8,12,23
```

### reverse

`reverse` 顾名思义，让数组反转。

```javascript
var arr = [4, 23, 1, 12, 8];
arr.reverse();
console.log(arr.toString()); // 8,12,1,23,4
```

---

## 数组迭代

数组迭代的方法非常多，包括 `forEach` , `map` , `filter` , `every` , `some` 等。它们的相同点是接收两个参数：要在数组每一项上运行的函数和（可选的）运行该函数的作用域对象——影响 this 的值。传入的函数接收 3 个参数：当前元素的值、当前元素的索引、数组本身。

### forEach

遍历每一个元素，对其进行相应的处理。**没有返回值**。

```javascript
var arr = [1, 2, 3, 4];
arr.forEach(function(item, index, array) {
	console.log(item);
    // other code
});
```

### map

`map` 是映射的意思，即遍历数组每一项，通过传入的函数，将数组的每一项，映射为一个新的项。**它返回每次函数调用的结果组成的数组。**

```javascript
var arr = [1, 2, 3, 4];
var newArr = arr.map(function(item, index, array) {
   return item * 2; 
});
console.log(newArr.toString()); // 2,4,6,8
```

### filter

`filter` 是过滤的意思，此时传入的函数可以看做是一个条件，**遍历每一项，找到满足该条件的项，返回值便是这些满足条件的元素组成的数组**。

```javascript
var arr = [1, 2, 3, 4];
var newArr = arr.filter(function(item, index, array) {
   return (item > 2); 
});
console.log(newArr.toString()); // 3,4
```

### every

`every` 对数组的每一项进行判断，如果都是满足条件，返回 true，有任意一项不满足条件，则返回 false。

```javascript
var arr = [1, 2, 3, 4];
var result1 = arr.every(function(item, index, array) {
   return (item > 0) 
});
console.log(result1); // true
var result2 = arr.every(function(item, index, array) {
   return (item > 1); 
});
console.log(result2); // false
```

### some

`some` 和 `every` 相反，遍历数组每一项，只要有任何一个元素满足条件，则返回 true，否则返回 false。

```javascript
var arr = [1, 2, 3, 4];
var result1 = arr.some(function(item, index, array) {
    return (item === 4);
});
console.log(result1); // true
var result2 = arr.some(function(item, index, array) {
   return (item > 4); 
});
console.log(result2); // false
```

> 【助记小提示】`every` 考查**全部**，而 `some` 考查**存在**。

---

## 数组缩小

ES5 新增了两个数组缩小的方法： `reduce` 和 `reduceRight` 。它们都是遍历数组，并在每一项执行给定的函数。它们和 `forEach` 的主要区别在于：

- 前者从数组第二项开始遍历
- 前者的传入函数接收 4 个参数：前一个值、当前值、索引和数组对象

### reduce

从第二项开始遍历

```javascript
var arr = [1, 2, 3, 4];
arr.reduce(function(lastResult, item, index, array) {
   console.log(item);
});
// 以上代码分别打印了 2， 3， 4。没有打印第 1 项
```

注意传入函数接收的第一个参数，它不是数组的上一个元素，而是上一次迭代时，函数的返回值。（所以我将其命名为 `lastResult` ，而不是 `lastItem`）。不过，由于第一次迭代的时候，还不存在上一次的函数执行结果，所以第一次迭代时，该参数就是数组的第一个元素（即第一次迭代时，`lastResult` 就等于 `lastItem`）。

```javascript
var arr = [1, 2, 3, 4];
arr.reduce(function(lastResult, item, index, array) {
   console.log(lastResult);
   return 'hello';
});
// 以上代码打印： 1 hello hello
```

这个方法有什么意义呢？其实我也不是很清楚，毕竟我目前很少用到这个方法。在此举一个《JavaScript高级程序设计》的例子吧。

```javascript
var values = [1, 2, 3, 4, 5];
var sum = values.reduce(function(prev, cur, index, array) {
   return prev + cur; 
});
console.log(sum); // 15
```

### reduceRight

`reduceRight` 的用法和 `reduce` 基本相同。唯一区别是：`reduceRight` 是从后往前遍历。

---

## 参考资料

- 《JavaScript高级程序设计》（第 3 版）  5.2


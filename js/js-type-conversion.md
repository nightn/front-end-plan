# JS 类型转换

## 目录

- [类型转换概述](#类型转换概述)
- [原始类型相互转换](#原始类型相互转换)
  - [转字符串](#转字符串)
  - [转数字](#转数字)
  - [转布尔](#转布尔)
- [对象转原始值](#对象转原始值)
- [总结](#总结)
- [参考资料](#参考资料)

---

## 类型转换概述

JavaScript 中的类型转换非常重要。假如我们要在代码中进行显示类型转换，我们必须要清楚转换机制是怎么样的。另外，JavaScript 中的一些运算符和函数也常常会自动进行类型转换。

在 [JS类型系统](https://github.com/nightn/front-end-plan/blob/master/js/js-type.md) 一文中，我们知道 JavaScript 中分为原始类型和对象类型。在此，我们先考虑原始类型之间的转换规则，再讨论对象转原始类型的情况。

---

## 原始类型相互转换

### 转字符串

主要考虑 `undefined` , `null` , `number` 和 `boolean` 这 4 中原始值转字符串的情况。将其他类型显示转为字符串有两种方式：

- String(val)
- val + ''

如：

```javascript
String(null);  // 'null'
undefined + ''; // 'undefined'
```

**原始类型转字符串汇总表**：

| 类型      | 值        | 转字符串    |
| --------- | --------- | ----------- |
| null      | null      | 'null'      |
| undefined | undefined | 'undefined' |
| number    | Infinity  | 'Infinity'  |
| number    | NaN       | 'NaN'       |
| number    | 0         | '0'         |
| number    | -0        | **'0'**     |
| boolean   | true      | 'true'      |
| boolean   | false     | 'false'     |

### 转数字

考虑 `null`, `undefined` , `string` , `boolean` 转数字的情况。显示转数字有两种方式：

- Number(val)
- +val

**原始类型转数字汇总表**：

| 类型      | 值              | 转数字 |
| --------- | --------------- | ------ |
| null      | null            | **0**  |
| undefined | undefined       | NaN    |
| boolean   | true            | 1      |
| boolean   | false           | 0      |
| string    | '  '            | **0**  |
| string    | '     123     ' | 123    |
| string    | '123x'          | NaN    |

**需要注意的是，`null` 转数字得 0， 而 `undefined` 转数字得 NaN。**

另外，对于字符串转数字，首先字符串头尾的空白字符（whitespace）都被移除，再进行转换。空字符串转换为 0，无法转换为数字的返回 NaN。

### 转布尔

显示转布尔也有两种方式：

- Boolean(val)
- !!val

转布尔的规则非常简单：**真值转 true，假值转 false**。假值包括 `null` , `undefined` , `NaN` , `''` , `0` , `-0` ，其余都是真值。举几个例子吧。

```javascript
Boolean(0);  // false
Boolean('0'); // true
Boolean(new Boolean(false)); // true
```

以上便是原始类型之间的转换，看起来并没有什么难度。

**简单地说，转字符串：基本上是在值两端加上引号（-0 例外），转数字：能转的得数字，不能转的得 NaN（注意 null 转数字得 0，undefined 转数字得 NaN），转布尔最简单（真值转为 true，假值转为 false，记住那 6 个假值即可）**。

---

## 对象转原始值

对象转原始值只要考虑**转字符串**和**转数字**的情况，不需要考虑转布尔的情况（因为所有的对象转布尔都得 true）。

ES 规范中关于如何将对象转为原始值，专门有一个 **ToPrimitive  算法 ** （重要） 。该算法需要一个参数 `hint` ，它表示上下文期望的转为类型，**有 3 个可选值：'string', 'number' 和 'default'。** 具体如下：

```javascript
// hint is 'string' (for alert and other string conversions)
alert(obj);
arr[obj] = 123;

// hint is 'number' (for maths)
+obj;
let z = obj1 - obj2;
obj1 < obj2;

// hint is 'default' (for operators)
let total = obj1 + obj2;  // 不能区分是数字相加，还是字符串拼接，所以 hint 为 'default'
if (user == 1) { };
```

**ToPrimitive 算法流程如下：**

- 如果 `obj[Symbol.toPrimitive](hint)` 方法存在，则直接调用它。否则，
- 如果 hint 是 `'string'` ，则调用 `obj.toString()` ，若其不存在，则调用 `obj.valueOf()` 。
- 如果 hint 是 `number` 或 `default` ，则调用 `obj.valueOf()` ，若其不存在，则调用 `obj.toString()` 。

> 【注意】所有内置对象对于 hint 为 'default' 的处理和 hint 为 'number' 的处理完全一样，除了 Date 对象。

【例1】

```javascript
let nightn = {
    name: 'nightn',
    money: 100,
    [Symbol.toPrimitive]: function(hint) {
        return hint == 'string' ? this.name : this.money;
    }
}

alert(nightn);  // hint = 'string', 'nightn'
alert(nightn + '');  // hint = 'default', 100 + '' = 100 + 0 = 100
console.log(+nightn);  // hint = 'number', 100
console.log(nightn + 200); // hint = 'default', 100 + 200 = 300
```

关于 `hint` 的确定一般有如下规则：

- 对于 alert 及其他要求字符串转换的上下文，hint = `'string'` 。
- 对于数学运算，如一元加号，减法，除法等，hint = `'number'` 。
- 对于操作符，如比较操作符 `==` , 二元加号 `+` 等，hint = `'default'` 。

因此，在上述例子中，`alert(nightn)` 的 hint 为 `'string'` ，而 `alert(nightn + '')` 的 hint 为 `'default'` 。

【例2】

```javascript
let nightn = {
    name: 'nightn',
    money: 100,
    toString: function() {
        return this.name;
    },
    valueOf: function() {
        return this.money;
    }
}

// hint = 'string', 优先调用 toString, 'nightn' 
alert(nightn);  
// hint = 'default', 优先调用 valueOf, 100 + '' = 100 + 0 = 100
alert(nightn + ''); 
// hint = 'number', 优先调用 valueOf, 100
console.log(+nightn);  
// hint = 'default', 优先调用 valueOf, 100 + 200 = 300
console.log(nightn + 200); 
```

根据 hint 的不同，决定优先调用 toString 还是 valueOf。

> 【个人观点】我觉得 [Symbol.toPrimitive] 方法是对 toString 和 valueOf 的抽象，抽象是一门语言进化的标志。一开始学习 JavaScript 字符串的时候，我觉得 substring 方法和 slice 方法有点重复了，但从语言进化的角度去考量，就会发现，substring 方法是先引入进标准的，而后引入了更加抽象更加合理的 slice。无论是从 substring 的命名上（substring 一看就知道只适合作为字符串方法名，而 slice 这个名字适用于任何容器，如数组），还是它的功能上（substring 相比于 slice，在处理负数参数和逆区间时都不太合理），都可以看出 substring 是语言逐步进化的遗留物。以进化和比较的观点去学习一门语言，有时候会有额外的收获。

---

## 总结

- JavaScript 的类型转换主要包括**原始类型相互转换**和**对象转原始值**。
- **原始类型相互转换分为 3 种情况**，转换规则都比较简单：
  - **转字符串**：基本是在值两端加上引号，-0 除外（**-0 转字符串得 '0'**）；
  - **转数字**：能转的转为数字，不能转的得 NaN（**null --> 0, undefined --> NaN**）；
  - **转布尔**：真值转为 true，假值转为 false（假值包括 `null` , `undefined` , `NaN` , `''` , `0` , `-0` ，其余都是真值）。
- **对象转原始值，首先要根据转换上下文确定 hint**。hint 的取值包括：`'string'` , `'number'` 和 `'number'` 。分别对应以下 3 种情况：
  - `'string'` ：alert 及其他字符串转换的上下文；
  - `'number'` ：数学运算符上下文，如一元`+` ，减号，除号等；
  - `'default'` ：一般运算符，如二元 `+` ，比较运算符 `==` 等。
- 确定了 `hint` 以后，就可以使用 **ToPrimitive 算法**了：
  - 如果对象存在 `[Symbol.toPromitive](hint)` 方法，则直接调用，否则，
  - 如果 hint 是 `'string'` ，调用 `toString()` ，若其不存在，调用 `valueOf()` ，
  - 如果 hint 是 `number` 或 `default` ，调用 `valueOf()` ，若其不存在，调用 `toString()` 。
- 注意，内置对象对于 hint 为 `number` 和 `default` 的处理完全一致（**Date** 对象除外）。

---

## 参考资料

- [javascript.info](https://javascript.info/) ( [Type Conversions](https://javascript.info/type-conversions) , [Object to primitive](https://javascript.info/object-toprimitive)) 
- 《JavaScript 权威指南》（第六版）  3.8


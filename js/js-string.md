# JS 字符串

## 目录

- [字符操作](#字符操作)
- [字符串操作](#字符串操作)
  - [字符串拼接](#字符串拼接)
  - [字符串分割](#字符串分割)
  - [字符串查找](#字符串查找)
- [参考资料](#参考资料)

---

## 字符操作

单独对字符串中某个字符进行操作的方法，如 `charAt()` 和 `charCodeAt()` 。

- `charAt()` ： 获取字符串给定下标的字符。
- `charCodeAt()` ： 获取字符串给定下标的字符的编码。

有了 `charCodeAt()` 方法，就可以很方便的获取任何字符的编码了，如：

```javascript
// 获取单字符字符串的十六进制编码
function charToHex(char) {
    return char.charCodeAt(0).toString(16);
}
```

如果要将查看编码所对应的字符呢，也很简单，在编码前面加上 `\u` 就行了，如以下语句将输出 ‽ ：

```javascript
console.log('\u203d'); // ‽
```

当然，字符操作的另一个知识点，便是通过下标访问符 `[]` 访问，这个非常常见，不予赘述。

---

## 字符串操作

### 字符串拼接

`concat()` 是字符串拼接方法（concat 是 concatenate 的缩写）。可以将多个字符串进行拼接，可以**接收任意个数的参数**，但这个方法用得较少，一般用 `+` 操作符进行字符串拼接。

```javascript
var str = 'hello';
var res = str.concat(', wo', 'rld ', 123, '!'); // hello, world 123!
```

### 字符串分割

JavaScript 字符串分割的方法很多，很容易让人混淆。具体来说：

- `slice()` ： 接收 2 个参数，表示从哪开始裁，到哪停止，注意**裁剪区间是左闭右开**。
- `substring()` : 如果接收的参数为正，其效果和 `slice()` 一致。
- `substr()` : 接收两 2 个参数，表示从哪开始裁，裁几个。 

> 【小提示】这三个方法我是这么记忆的。看见 `end` 就说明该方法是按结束索引分割的，而不是分割尺寸进行分割的。你看 `slice` 单词末尾部分包含了 `end` 中的  `e` ，`substring` 单词末尾部分包含了 `end` 中的  `n`  ，而 `substr` 啥都不包含。

以上三个方法的共同点是，如果不指定第二个参数，默认会裁剪到字符串末尾。

``` javascript
var name = 'nightn';
console.log(name.slice(2, 4)); // 'gh'
console.log(name.substring(2, 4)); // 'gh'
console.log(name.substr(2, 4)); // 'ghtn'
```

这样看来，好像 `slice()` 和 `substring()` 的效果完全一样，其实不然。**我更觉得 `slice()` 是 `substring()` 的升级版**，这个升级的地方便是它们对**负数参数和逆区间**的处理上。

**`substring()` 会把传入的负数都转为 0；而 `slice` 会把传入的负数加上字符串长度。**

```javascript
var name = 'nightn';
console.log(name.substring(-4, -2)); // '' 相当于是 name.substring(0, 0)
console.log(name.slice(-4, -2)); // 'gh' 相当于是 name.slice(2, 4)
```

**另外，在处理逆序区间时，`slice()` 返回空字符串，而 `substring()` 会先将逆序区间转为顺序区间。**  我认为 `slice()` 对逆序区间的处理更加合理。

```javascript
var name = 'nightn';
console.log(name.slice(3, 0)); // ''
console.log(name.substring(3, 0)); // 'nig' 相当于是 name.substring(0, 3)
```

最后，`substr()` 对负数的处理很容易理解：开始下标允许为负数，但是裁剪长度不允许为负数。裁剪长度为负数的话，就将其转换为 0。

### 字符串查找

前面的 `charAt()` , `charCodeAt()`, 以及下标访问符 `[]` 都是获取字符串中的单字符字符串。以下方法用于查找子字符串。

`indexOf()` 和 `lastIndexOf()` 都是用于查找字符串中是否存在给定的子字符串，如果存在，返回下标，否则返回 -1。区别在于：前者从字符串开头向后搜索，后者从字符串结尾向前搜索。

另外，这两个方法都能接收第二个参数，表示从哪开始搜索。

```javascript
var str = 'how do you do!';
console.log(str.indexOf('do')); // 4
console.log(str.lastIndexOf('do')); // 11
console.log(str.indexOf('do', 6)); // 11
console.log(str.lastIndexOf('do', 10)); // 4
```

---

## 参考资料

- 《JavaScript高级程序设计》（第三版） 5.6.3
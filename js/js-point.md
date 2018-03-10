

# JS 知识片段

记录平常在看书、练习和做项目时遇到的一些知识点，会持续更新，并分门别类。

## 目录

- [对象](#对象)

---

## 对象

- **判断对象是否包含某个属性**

  有两种方法：`in` 运算符和 `hasOwnProperty()` 。前者不但会查找对象自身属性，还会查找整个原型链的属性；后者只会查找对象的自身属性。例如：

  ```javascript
  var obj = {
      a: 'hello',
      b: 'world'
  };
  'a' in obj; // true
  'toString' in obj; // true
  obj.hasOwnProperty('a'); // true
  obj.hasOwnProperty('toString'); // false
  ```

  另外，要注意 `in` 运算符的不同使用场合，用于判断对象是否具有某个属性，它会查找自身属性和原型属性。但如果用 `in` 运算符进行属性遍历，那么它只会列出对象本身的属性。

  ```javascript
  var obj = {
      a: 'hello',
      b: 'world'
  };
  'toString' in obj; // true
  var arr = [];
  for (var prop in obj) {
      arr.push(prop);
  }
  console.log(arr.join(' ')); // a b
  ```

  那如果想遍历一个对象所有的属性呢？


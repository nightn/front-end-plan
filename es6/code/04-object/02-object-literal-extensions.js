// 描述：对象字面量语法扩展
// 作者：nightn(http://github.com/nightn)
// 目录：
//   1. 属性初始化的简写语法
//   2. 简写方法
//   3. 可计算的属性名


// 1. 属性初始化的简写语法（property initializer shorthand syntax）
// 当一个对象的属性名和局部变量名一样时，可以省略属性的冒号和 value
// 传统写法
function createPerson1(name, age) {
    return {
        name: name,
        age: age
    };
}
// 简写语法
function createPerson2(name, age) {
    return {
    // JavaScript 引擎看到单独的 name 时，会从外层作用域去寻找同名局部变量
        name,
        age
    };
}


// 2. 简写方法（concise method syntax）
// 对象字面量中定义方法，可以省略冒号和 function 关键字
// 传统写法
let person1 = {
    name: 'nightn',
    sayName: function() {
        console.log(this.name);
    }
}
// 简写语法
let person2 = {
    name: 'nightn',
    sayName() {
        console.log(this.name);
    }
}
// 【注意】二者并不是完全等价。简写方法可以访问 `super`，而传统写法不行


// 3. 可计算的属性名（Computed Property Names）
let lastname = 'last name';
let getKey = () => 'isGenius';
let creator = {
    'first name': 'Brendan',
    [lastname]: 'Eich',  // 属性名由变量计算得到
    [getKey()]: true     // 甚至，属性名还可以由函数调用得到
};
console.log(creator['last name']);  // "Eich"
console.log(creator.isGenius);      // true

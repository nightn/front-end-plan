// 描述：对象的解构
// 作者：nightn(https://github.com/nightn)
// 目录：
//   1. 简单情况
//   2. 默认值
//   3. 别名
//   4. 嵌套对象解构


// 1. 简单情况
// 对象解构用于初始化变量
let { name, age } = {
    name: 'nightn',
    age: 24
};
console.log(name, age);  // nightn 24
// 对象解构用于给变量赋值
// 【注意】此时圆括号不可省略，否则会当成不合法的代码块来解析
let width, height;
({width, height} = {
    width: 200,
    height: 100
});
console.log(width, height);  // 200 100


// 2. 默认值
// 我们可以为变量设置默认值，这在传入的配置对象缺少一些属性时很有用
let mapOption = {
    mapType: 'GoogleMap',
    enableZoom: true
}
let { mapType, title = 'map demo' } = mapOption;
console.log(title);  // map demo
// 上述 mapOption 没有 title 属性，所以 title 变量取其默认值 "map demo"


// 3. 别名
// 有时候我们不想用对象属性名作为局部变量名（有点类似于 import ... as ...）
let { enableZoom: canZoom } = mapOption;
console.log(canZoom);         // true
// console.log(enableZoom);   // ReferenceError: enableZoom is not defined
// 当然，默认值和别名可以一起使用
let { title: mapName = 'map demo' } = mapOption;
console.log(mapName);  // map demo


// 4. 嵌套对象解构
let node = {
    type: 'Identifier',
    name: 'foo',
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    }
};
let { 
    loc: { start },  // 解构出 node.loc.start 以初始化本地变量 start
    loc: { end: { line: endLine } } // 解构出 node.loc.end.line 以初始化本地变量 endLine
} = node;
console.log(start);    // { line: 1, column: 1 }
console.log(endLine);  // 1

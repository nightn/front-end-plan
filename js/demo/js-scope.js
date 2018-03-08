
// 变量声明提升
a = 2;
var a;
console.log(a); // 2


// 函数声明提升
foo(); // 1
var foo;
function foo() {
    console.log(1);
}
foo = function() {
    console.log(2);
}


// 函数声明会提升，但函数表达式不会提升
// bar(); // 报错
var bar = function() {
    console.log('bar');
}


// with 语句
var nightn = {
    name: 'nightn',
    age: '24'
};
function testWith() {
    var name = 'foo';
    with(nightn) {
        var x = 1;
        console.log(name);
    }
    console.log(name);
    console.log(x);
}
testWith();


// catch 语句
try {
    undefined();
} catch (err) {
    var innerCatch = 'hello';
    console.log(err); // 可以正常打印 err 对象
}
console.log(innerCatch); // hello

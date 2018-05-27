// 描述：Function 构造函数的扩展
//      也可以使用默认实参和 Rest parameter
// 作者：nightn(https://github.com/nightn)
// 目录：
//   1. Function constructor
//   2. Default parameter in Function constructor
//   3. Rest parameters in Funcion constructor


// 1. Function constructor
let add1 = new Function('first', 'second', 'return first + second');
console.log(add1(1, 2));  // 3


// 2. Default parameter in Function constructor
let add2 = new Function('first', 'second = first', 'return first + second');
console.log(add2(2));  // 4


// 3. Rest parameters in Function constructor
let getArgsLength = new Function('...args', 'return args.length');
console.log(getArgsLength(1, 2, 3, 4, 5));  // 5

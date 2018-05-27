// 描述：Function name property
// 作者：nightn(https://github.com/nightn)
// 目录：


// 函数具有一个 name 属性，返回函数名字所表示的字符串
// 以下列出了所有可能的情况
function hello() {}
let funcExp = function() {};
let namedFuncExp = function attention() {};
let user = {
    get name() {
        return 'nightn';
    },
    sayHi() {}
};
let newFuncObj = new Function();

console.log(hello.name);           // 'name'        (*1)
console.log(funcExp.name);         // 'funcExp'     (*2)
console.log(namedFuncExp.name);    // 'attention'   (*3)
console.log(user.name.name);       // 'get name'    (*4)
console.log(user.sayHi.name);      // 'sayHi'       (*5)
console.log(newFuncObj.name);      // 'anonymous'   (*6)
console.log((function(){}).name);  // ''            (*7)
console.log((() => {}).name);      // ''            (*8)
console.log((function f(){}).name);// 'f'           (*9)
console.log(hello.bind().name);    // 'bound hello' (*10)
console.log(new Function().bind().name);
                                   // 'bound anonymous' (*11)

// 解释
// (*1) 函数声明，name 为函数声明时的名字
// (*2) 匿名函数表达式，name 为表达式赋值的那个变量的名字
// (*3) 具名函数表达式，函数名要优于其赋值的变量名
// (*4) get 函数，name 前缀为 'name '
// (*5) 普通方法，name 为方法名
// (*6) 用 new Function 构建的函数对象，name 为 'anonymous'
// (*7) 未赋值的匿名函数表达式，name 为空字符串
// (*8) 未赋值的箭头函数，name 为空字符串
// (*9) 未赋值的具名函数表达式，name 为函数名
// (*10) 函数调用 bind() 返回的函数，name 前缀为 'bound'
// (*11) 结合 (*6) 和 (*11) 分析

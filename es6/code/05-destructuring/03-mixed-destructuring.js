// 描述：混合解构
// 作者：nightn(https://github.com/nightn)


// 对象和组成混合解构
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
    },
    range: [0, 3]
};

let {
    // 解构出 node.loc.start 以初始化局部变量 start
    loc: { start },
    // 解构出 node.range[0] 以初始化局部变量 startIndex
    range: [ startIndex ]
} = node;

console.log(start);       // { line: 1, column: 1 }
console.log(startIndex);  // 0

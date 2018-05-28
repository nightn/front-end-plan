// 描述：函数参数解构
// 作者：nightn(https://github.com/nightn)


// 举例
function setCookie(name, value,
    {
        secure = false,
        path = '/',
        domain = 'example.com',
        expires = new Date(Date.now() + 360000000)
    } = {}
) {
    // function body
}

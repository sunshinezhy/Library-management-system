var jwt = require('jsonwebtoken');
var token = jwt.sign({
    account: 'a.cc.com',
    _id: '123',
}, 'aaaa');

console.log(token);

// header
// 加密的算法
// jwt

// payload

// signature

jwt.verify(token, 'aaaa', (err, payload) => {
    console.log(err, payload);
});
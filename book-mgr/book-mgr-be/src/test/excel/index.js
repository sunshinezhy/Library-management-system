const xlsx = require('node-xlsx');

const workSheet = xlsx.parse(`${__dirname}/test.xlsx`);

console.log(workSheet[0].data);

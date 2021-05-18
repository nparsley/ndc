
const fs = require('fs');


const challenge = fs.readFileSync('1-json.json');
const challengePARSE = challenge.toString();
const newData = JSON.parse(challengePARSE);



newData.name = 'Nick';
newData.age = 32;


const userJSON = JSON.stringify(newData);
fs.writeFileSync('1-json.json', userJSON);


































































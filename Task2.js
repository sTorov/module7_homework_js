function checkProp(obj, str){
    return str in obj;
}

const obj = {
    prop: 123,
}

console.log(checkProp(obj, 'prop'));
console.log(checkProp(obj, 'a'));
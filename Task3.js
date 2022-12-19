function createEmptyObject(){
    return Object.create(null);
}

const obj = createEmptyObject();

console.log(typeof obj + '\n' + Object.getPrototypeOf(obj));
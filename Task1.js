function getOwnProp(obj){
    if (Object.keys(obj).length > 0) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                console.log(`${key}: ${obj[key]}`);
            }
        }
    } else {
        console.log('Собственные свойства отсутствуют!');
    }
}



const proto = {
    prop: "str",
}

const obj = Object.create(proto);
obj.ownProp = "123";

getOwnProp(obj);
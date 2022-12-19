//Класс электросети
class Circuit{
    static devices = {};

    static getTotalPower(){
        let power = 0;

        for (const prop in this.devices) {
            power += this.devices[prop];
        }

        console.log(`Общая нагрузка: ${power} Вт`);
    }

    static isTurnOn(deviceId){
        for (const prop in this.devices) {
            if(prop == deviceId){
                return true;
            }
        }

        return false;
    }
}


//Класс для манипуляции идентификаторами приборов
class DevicesId{
    static Id = 0;

    static getId(){
        this.Id++;
        return this.Id;
    }
}


//Базовый класс устройств
class Device{
    constructor(type, power){
        this.id = DevicesId.getId();
        this.type = type;
        this.power = power;
    }
 
    //Подключение к электросети
    turnOn(){
        if(!Circuit.isTurnOn(this.id)){
            Circuit.devices[this['id']] = this['power'];
            console.log(`${this.type}-#${this.id} включен.`);
        } else {
            console.log(`${this.type}-#${this.id} уже включен!`);
        }
    }

    //Отключение от электросети
    turnOff(){
        if(Circuit.isTurnOn(this.id)){
            delete Circuit.devices[this['id']];
            console.log(`${this.type}-#${this.id} выключен.`);
        } else {
            console.log(`${this.type}-#${this.id} не включен!`);
        }
    }
}


//Класс компьютера
class PC extends Device{
    constructor(model){
        super('PC', 600);
        this.model = model;
    }

    calculate(){
        if(Circuit.isTurnOn(this.id)){
            let result = 0;
    
            for (const value of arguments) {
                result += value;
            }
    
            return `${this.type}-#${this.id}: результат калькуляции => ${result}`;
        } else {
            return `${this.type}-#${this.id}: нужно включить в сеть!`
        }
    }
}


//Класс лампы
class Lamp extends Device{
    constructor(){
        super('Lamp', 75);
        this.light = false;
    }

    //Переопределение функции отключения от сети для лампы
    turnOff(){
        super.turnOff();
        this.light = false;
    }

    lighting(shine){
        if(Circuit.isTurnOn(this.id)){
            if(shine){
                if(!this.light){
                    console.log(`${this.type}-#${this.id}: лампа начала светиться!`);
                    this.light = true;
                } else {
                    console.log(`${this.type}-#${this.id}: лампа не стала светиться ярче!`)
                }
            } else {
                if(this.light){
                    console.log(`${this.type}-#${this.id}: лампа больше не светиться!`);
                    this.light = false;
                } else {
                    console.log(`${this.type}-#${this.id}: питание есть, но ничего не произошло...`)
                }
            }
        } else {
            console.log(`${this.type}-#${this.id}: нужно включить в сеть!`)
        }
    }
}




const firstPC = new PC('FirstPC');
const superPC = new PC('SuperPC');
const lamp = new Lamp();

console.log(firstPC);
console.log(superPC);
console.log(lamp);

console.log(superPC.calculate(1, 2, 3));
superPC.turnOn();
console.log(superPC.calculate(1, 2, 3));

lamp.lighting(true);
lamp.turnOn();
lamp.lighting(true);
lamp.lighting(true);
lamp.lighting(false);
lamp.lighting(false);

firstPC.turnOn();

Circuit.getTotalPower();
superPC.turnOff();
Circuit.getTotalPower();
lamp.turnOff();
Circuit.getTotalPower();
firstPC.turnOff();
Circuit.getTotalPower();
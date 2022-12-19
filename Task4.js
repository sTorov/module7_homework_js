//объект электросети
const circuit = {
    devices: {},

    getTotalPower: function(){
        let power = 0;

        for (const prop in this.devices) {
            power += this.devices[prop];
        }

        console.log(`Общая нагрузка: ${power} Вт`);
    },
    isTurnOn: function(deviceId){
        for (const prop in this.devices) {
            if(prop == deviceId){
                return true;
            }
        }

        return false;
    }
}

//объект для манипуляции идентификаторами приборов
const devicesId = {
    id: 0,
    getId: function(){
        this.id++;
        return this.id;
    }
}



//Базовая функция-конструктор для всех устройств
function Device(type, power){
    this.id = devicesId.getId();
    this.type = type;
    this.power = power;
}

//Подключение к электросети
Device.prototype.turnOn = function(){
    if(!circuit.isTurnOn(this.id)){
        circuit.devices[this['id']] = this['power'];
        console.log(`${this.type}-#${this.id} включен.`);
    } else {
        console.log(`${this.type}-#${this.id} уже включен!`);
    }
}
//Отключение от электросети
Device.prototype.turnOff = function(){
    if(circuit.isTurnOn(this.id)){
        delete circuit.devices[this['id']];
        console.log(`${this.type}-#${this.id} выключен.`);
    } else {
        console.log(`${this.type}-#${this.id} не включен!`);
    }
}



//Функция-конструктор для компьютера
function PC(model){
    Device.call(this, 'PC', 600);
    this.model = model;
}

// PC.prototype.__proto__ = Device.prototype;
Object.setPrototypeOf(PC.prototype, Device.prototype);

PC.prototype.calculate = function(){
    if(circuit.isTurnOn(this.id)){
        let result = 0;

        for (const value of arguments) {
            result += value;
        }

        return `${this.type}-#${this.id}: результат калькуляции => ${result}`;
    } else {
        return `${this.type}-#${this.id}: нужно включить в сеть!`
    }
}



//Функция-конструктор для лампы
function Lamp(){
    Device.call(this, 'Lamp', 75);
    this.light = false;
}

Object.setPrototypeOf(Lamp.prototype, Device.prototype);

Lamp.prototype.lighting = function(shine){
    if(circuit.isTurnOn(this.id)){
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

//Переопределение функции отключения от сети для лампы
Lamp.prototype.turnOff = function(){
    Device.prototype.turnOff.call(this);
    this.light = false;
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

circuit.getTotalPower();
superPC.turnOff();
circuit.getTotalPower();
lamp.turnOff();
circuit.getTotalPower();
firstPC.turnOff();
circuit.getTotalPower();
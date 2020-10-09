//Объект JSON-строки превратить в JS-объект вида 
//{list: [{name: 'Petr', age: 20, prof: 'mechanic'}, {name: 'Vova', age: 60, prof: 'pilot' }]}

//Исходная JSON-строка
const jsonString = `{
    "list": [
        {
            "name": "Petr",
            "age": "20",
            "prof": "mechanic"
        },
        {
            "name": "Vova",
            "age": "60",
            "prof": "Pilot"
        }
    ]
}`

//Функция сериализации JSON
function getJsonObj(jsonString){
    const data = JSON.parse(jsonString).list; //Распарсим строку
    let result = {}; //Зададим результирующий объект
    result.list = [] //Зададим свойство list по заданию
    data.forEach(function(element){ //В распарсенном объекте массив их двух объектов
        let obj = { //Проходя по каждому объекту заполним по очереди поля
            name: element.name,
            age: element.age,
            prof: element.prof,
        };
        result.list.push(obj); //добавим в result
    })
    return result
};

const result = getJsonObj(jsonString);
// result.list.forEach((element) => {
//     console.log(element);
// })
console.log("result", result);
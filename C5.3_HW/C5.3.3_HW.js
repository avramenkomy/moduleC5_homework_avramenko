//Написать приложение, в которм будет кнопка и input, в который нужно вводить числа в диапазоне 1..10
//При клике на кнопку нужно вывести:
//"Число вне диапазона 1..10" - если число не попалов указанный диапазон
//Если число попадает в диапазон от 1 до 10 — сделать запрос
//c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

const btn = document.querySelector(".j-btn");
const resultBlock = document.querySelector(".j-result");

function useRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log(`Response status: ${xhr.status}`);
        } else {
            const result = JSON.parse(xhr.response) //В случае успешного запроса парсим полученнный объект, 
            //который записывается в поле xhr.response

            //Если так же был передан callback, то вызываем его и передаем в него параметр result
            if (callback) {
                callback(result);
            }
        }
    };
    //Вешаем обработчик ошибки
    xhr.onerror = function() {
        console.log(`Error! Response status: ${xhr.status}`);
    };
    //В завершении отправляем запрос на сервер
    xhr.send();
};

function displayResult(apiData) {
    let cards = ""; //переменная для хранения общего блока для всех карточек
    //переменная apiData приходит распарсенной в массив объектов
    //console.log(apiData); //Для проверки можно вывести
    apiData.forEach(function(item) {
        //На каждой итерации в cardBlock заполняем карточку с версткой из значений объекта в массиве
        const cardBlock = `
            <div class="card">
                <img src="${item.download_url}" class="card-image" width='300'/>
                <p>${item.author}</p>
            </div>
        `;
        //Верстку карточки добавляем к общему блоку с версткой карточек
        cards = cards + cardBlock;
    });
    //Весь блок с карточками записываем в resultNode, который ссылается на div c результатом на 
    //странице, методом innerHTML
    resultBlock.innerHTML = cards;
};

btn.addEventListener("click", function() {
    const value = document.querySelector("input").value;
    const url = "https://picsum.photos/v2/list?limit=" + value;

    if ((Number(value) > 0) && (Number(value) < 11)) {
        useRequest(url, displayResult)
    } else {
        resultBlock.innerHTML = "Число вне диапазона 1..10";
    }
});


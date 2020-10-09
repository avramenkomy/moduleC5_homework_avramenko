//Ищем кнопку
const btn = document.querySelector(".j-btn");

//Ищем блок результата
const resultBlock = document.querySelector(".result");


//Функция проверки input
function checkInput(pageNumber, limit) {
    let resultMessage = "";

    if (!isNaN(Number(pageNumber)) && (Number(pageNumber) > 0) && (Number(pageNumber) < 11)) {
        //console.log("limit", Number(limit));
    } else {
        resultMessage += "Номер страницы вне диапазона от 1 до 10<br>"
    }

    if (!isNaN(Number(limit)) && (Number(limit) > 0) && (Number(limit) < 11)) {
        //console.log("pageNumber", Number(pageNumber));
    } else {
        resultMessage += "Лимит вне диапазона от 1 до 10<br>"       
    }
    return resultMessage
};

//Функция вывода результата на страницу
function displayResult(apiData) {
    let cards = "";
    console.log("apiData", apiData);
    apiData.forEach((item) => {
        const cardBlock = `
            <div class="card">
                <img 
                    src="${item.download_url}"
                    width="350"
                    class="card-image"/>
                <p>${item.author}</p>
            </div>`
        cards = cards + cardBlock;
    });
    resultBlock.innerHTML = cards;
};

//Просмотр localStorage
const btnWatchLocalStorage = document.querySelector(".j-btn-watch-localStorage");
btnWatchLocalStorage.addEventListener("click", () => { console.log("localStorage", localStorage) });

//Очистика localStorage
const btnCleanLocalStorage = document.querySelector(".j-btn-clear");
btnCleanLocalStorage.addEventListener("click", () => {
    localStorage.clear();
    console.log("localStorage is clear!!!")
});

//Проверка наличия данных в localStorage
let myData = localStorage.getItem("myData");

if (myData) {
    displayResult(JSON.parse(myData));
};

//Вешаем обработчик click
btn.addEventListener("click", function () {

    localStorage.clear();

    const pageNumber = document.querySelector(".j-input-page-number").value;
    const limit = document.querySelector(".j-input-limit").value;   

    let resultMessage = checkInput(pageNumber, limit);
    //console.log("resultMessage", Boolean(resultMessage));
    
    resultBlock.innerHTML = resultMessage;

    if (!resultMessage) {
        //console.log("Все верно!")
        fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
            .then((response) => {
                console.log("response", response);
                
                return response.json();
            })
            .then((data) => {                
                console.log("data", data);
                displayResult(data);
                localStorage.setItem("myData", JSON.stringify(data));
            })
            .catch((error) => { resultBlock.innerHTML = "<b>Error</b>" })
    } else {
        //console.log("Некорректные значения!")
    }
});
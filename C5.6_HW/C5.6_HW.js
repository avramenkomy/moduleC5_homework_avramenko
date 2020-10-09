//Находим все элементы
//Кнопка
const btn = document.querySelector(".j-btn");

//Inputы с шириной и высотой
const widthInput = document.querySelector(".j-input-width");
const heightInput = document.querySelector(".j-input-height");

//div, в который выводится картинка или сообщение
const resultBlock = document.querySelector(".result");

//вешаем обработчик
btn.addEventListener("click", function(){
    //Получаем значение ширины и высоты с типом Number
    const widthValue = Number(widthInput.value);
    const heightValue = Number(heightInput.value);

    if ((widthValue && heightValue) && (widthValue < 301 && widthValue > 99) && (heightValue < 301 && heightValue > 99)) {

        url = "https://picsum.photos/" + widthInput.value + "/" + heightInput.value

        fetch(url)
            .then((response) => {  
                return response.url                
            })

            .then((dataURL) => {
                const card = `
                    <div class="card">
                        <img
                            src="${dataURL}"
                            class="image-card"
                            width="${widthValue}"
                            height="${heightValue}"
                        />
                    </div>`
                resultBlock.innerHTML = card;
            })

            .catch((response) => {
                resultBlock.innerHTML = `<b>Error</b>`
            });

    } else {
        resultBlock.innerHTML = "<span class='result-message' style='background: red;'>Одно из чисел вне диапазона 100..300 или введено не число</span>"
    }    
});
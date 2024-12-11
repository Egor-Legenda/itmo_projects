//TIP With Search Everywhere, you can find any action, file, or symbol in your project. Press <shortcut actionId="Shift"/> <shortcut actionId="Shift"/>, type in <b>terminal</b>, and press <shortcut actionId="EditorEnter"/>. Then run <shortcut raw="npm run dev"/> in the terminal and click the link in its output to open the app in the browser.
let r = 2;
let dots = [];
function draw_Graph() {
    // Получаем холст и его контекст
    const canvas = document.getElementById('graphCanvas');
    const context = canvas.getContext('2d');
    r = get_r();
    // Проверка на NaN
    if (isNaN(r)) {
        console.error("Неверное значение для R");
        // Останавливаем выполнение функции, если значение некорректно
    }

    // Ограничиваем R от 2 до 5


    context.clearRect(0, 0, canvas.width, canvas.height);

    // Центр координат
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Масштабируем размер графика
    const scale = 35; // 1 единица = 35 пикселей


    // Рисуем фигуру:
    context.fillStyle = 'dodgerblue';

    // Четверть окружности
    context.beginPath();
    context.arc(centerX, centerY, r / 2 * scale, -Math.PI, -Math.PI / 2);
    context.lineTo(centerX, centerY);
    context.closePath();
    context.fill();

    // Прямоугольник
    context.fillRect(centerX, centerY, r * scale, r * scale);

    // Треугольник
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX + r * scale, centerY);
    context.lineTo(centerX, centerY - r / 2 * scale);
    context.closePath();
    context.fill();

    // отрисовка осей
    context.beginPath();
    context.moveTo(0, centerY);
    context.lineTo(canvas.width, centerY);
    context.moveTo(centerX, 0);
    context.lineTo(centerX, canvas.height);
    context.strokeStyle = 'black';
    context.stroke();
    //  Обозначение осей
    context.font = "14px Arial";
    context.fillStyle = 'black';
    context.fillText("X", canvas.width - 20, centerY - 20);
    context.fillText("Y", centerX + 20, 20);
    // Рисование стрелок
    context.font = "30px Arial";
    context.fillText(">", canvas.width - 15, centerY + 10.5);
    context.font = "35px Arial";
    context.fillText("^", centerX - 8.2, 25);
    // установка меток на оси x
    context.font = "14px Arial";
    context.fillText("|", centerX + r * scale - 2, centerY + 4);
    context.fillText("R", centerX + r * scale - 5, centerY - 10);
    context.fillText("|", centerX + r / 2 * scale - 2, centerY + 4);
    context.fillText("R/2", centerX + r / 2 * scale - 10, centerY - 10);
    context.fillText("|", centerX - r / 2 * scale - 2, centerY + 4);
    context.fillText("-R/2", centerX - r / 2 * scale - 15, centerY - 10);
    context.fillText("|", centerX - r * scale - 2, centerY + 4);
    context.fillText("-R", centerX - r * scale - 10, centerY - 10);
    // установка меток на оси y
    context.font = "24px Arial";
    context.fillText("_", centerX - 7, centerY - r / 2 * scale - 3);
    context.fillText("_", centerX - 7, centerY + r / 2 * scale - 3);
    context.fillText("_", centerX - 7, centerY - r * scale - 3);
    context.fillText("_", centerX - 7, centerY + r * scale - 3);
    context.font = "14px Arial";
    context.fillText("-R/2", centerX + 9, centerY + r / 2 * scale + 4);
    context.fillText("R/2", centerX + 9, centerY - r / 2 * scale + 4);
    context.fillText("-R", centerX + 9, centerY + r * scale + 4);
    context.fillText("R", centerX + 9, centerY - r * scale + 4);
    for (let i = 0; i < dots.length; i+=2) {
        draw_dot(dots[i],dots[i+1]);
    }


}


document.getElementById('graphCanvas').addEventListener('click', function (event) {
    const canvas = document.getElementById('graphCanvas');
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left - canvas.width / 2;
    const y = canvas.height / 2 - (event.clientY - rect.top);

    // Преобразуем координаты клика в единицы графика
    const scale = 35;
    const graphX = x / scale;
    const graphY = y / scale;
    if (valid(graphX) && valid(graphY)) {
        draw_hand_dot(graphX, graphY);
    } else{
        showTooltip()
    }
});

function create_dot() {
    const x = get_x();
    const y = get_y();
    draw_hand_dot(x, y)
}

function draw_dot(x, y) {
    const canvas = document.getElementById('graphCanvas');

    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 35;
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(centerX + x * scale, centerY - y * scale, 5, 0, 2 * Math.PI);
    context.fill();
}

function draw_hand_dot(x, y) {

    const canvas = document.getElementById('graphCanvas');
    const R = get_r();
    const context = canvas.getContext('2d');
    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;
    context.fillStyle = 'red'
    context.beginPath();
    context.arc(centerX + x * 35, centerY - y * 35, 5, 0, 2 * Math.PI)
    context.fill();
    if (!isNaN(y) && !isNaN(x)) {

        sendRequest(x, y, R);
    }
}

function draw_dot(x, y) {
    const canvas = document.getElementById('graphCanvas');

    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 35;
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(centerX + x * scale, centerY - y * scale, 5, 0, 2 * Math.PI);
    context.fill();
}

//прием, валидация x
function get_x() {

    const selectX = document.querySelector('input[name="X"]:checked');
    let xInput;
    if (selectX) {
        const mask = /^-?[0-9]*\.?[0-9]+$/
        if (!mask.test(selectX.value.toString())) {
            showTooltip()
            return NaN;
        }
        xInput = selectX.value;

    } else {
        showTooltip();
        return NaN;
    }
    return xInput;
}

// прием, валидация y
function get_y() {
    let select = document.getElementById('yInput').value.replace(',', '.');

    let selectY = parseFloat(select);
    const mask = /^-?[0-9]*\.?[0-9]+$/
    if (!mask.test(selectY.toString())) {
        showTooltip()
        return NaN;
    }
    if (selectY > 5) {
        showTooltip()
        return NaN
    } else if (selectY < -5) {
        showTooltip()
        return NaN;
    }
    return selectY;
}

// прием, валидация r
function get_r() {
    let select = (document.getElementById('rInput').value);
    let selectR = parseFloat(select.replace(',', '.'));
    const mask = /^[0-9]*\.?[0-9]+$/

    if (selectR > 5) {
        showTooltip()
        selectR = 5;
    } else if (selectR < 1) {
        showTooltip()
        selectR = 2;
    } else if (!mask.test(selectR.toString())) {
        showTooltip()
        return r;
    }

    r = selectR;
    return selectR;
}


// отправка через гет
function sendRequest(x, y, r) {
    dots.push(x);
    dots.push(y);
    var xhr = new XMLHttpRequest();
    var url = "controller?X=" + encodeURIComponent(x) + "&Y=" + encodeURIComponent(y) + "&R=" + encodeURIComponent(r);
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //window.location.href = "result.jsp";
            document.getElementById("table_shot").innerHTML = `
                        <tr>
                            <td>x</td>
                            <td>y</td>
                            <td>r</td>
                            <td>check</td>
                        </tr>` + xhr.responseText;
        }


    };
    xhr.send();

    return false;
}

function new_row(x,y,r,isHit){


    let table = document.getElementById("table_shot"); // Находим HTML-таблицу

    let row = document.createElement("tr"); // Создаем новую строку

    let cellX = document.createElement("td"); // Создаем ячейку для x
    cellX.textContent = x;
    row.appendChild(cellX);

    let cellY = document.createElement("td");
    cellY.textContent = y;
    row.appendChild(cellY);

    let cellR = document.createElement("td");
    cellR.textContent = r;
    row.appendChild(cellR);

    let cellStatus = document.createElement("td");
    cellStatus.textContent = isHit;
    row.appendChild(cellStatus);

}

function valid(input){
    if (input <= 5 && input >=-5){
        return true;
    }
}

// Функция для показа подсказки
function showTooltip() {
    const tooltip = document.getElementById("tooltip");
    tooltip.classList.add("show");

    // Скрываем подсказку через 3 секунды
    setTimeout(() => {
        tooltip.classList.remove("show");
    }, 3000);
    // const cont = document.getElementById("container");
    // cont.classList.add("show");
    // setTimeout(() => {
    //     cont.classList.remove("show");
    // }, 3000);
}


// Рисуем график по умолчанию при загрузке страницы
//window.onload = draw_Graph;


var r = NaN;

function draw_Graph() {
    const canvas = document.getElementById('graph');
    const context = canvas.getContext('2d');

    if (isNaN(r) && results.length > 0) {
        r = results[results.length-1].r;

    }
    if (isNaN(r)) {
        console.error("Неверное значение для R");
    }
    document.getElementById("formGraph:r").value = r;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Центр координат
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Масштабируем размер графика
    const scale = 35;


    // Рисуем фигуру:
    context.fillStyle = 'dodgerblue';

    // Четверть окружности
    context.beginPath();
    context.arc(centerX, centerY, r * scale, 0, Math.PI / 2);
    context.lineTo(centerX, centerY);
    context.closePath();
    context.fill();

    // Прямоугольник
    context.fillRect(centerX, centerY, r/2 * scale, -r * scale);

    // Треугольник
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX - r * scale, centerY);
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

    var dots = results;
    for (let i = 0; i < dots.length; i++) {
        draw_dot(dots[i].x, dots[i].y);
    }


}

window.onload = draw_Graph;

function setRValue(value) {

    document.getElementById("formGraph:r").value = value;
    r = value;
    draw_Graph();
}

function draw_dot(x, y) {
    const canvas = document.getElementById('graph');

    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 35;
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(centerX + x * scale, centerY - y * scale, 5, 0, 2 * Math.PI);
    context.fill();
}

function checkR(r) {
    return ((r <= 5) && (r >= 1));
}

function checkX(x) {
    return ((x <= 5) && (x >= -5));
}

function checkY(y) {
    return ((y <= 3) && (y >= -5));
}


function draw_dot_after_submit() {
    x =  document.querySelector('#formSubmit\\:X_spinner_input').value.replace(',', '.');;
    y = document.getElementById('formSubmit:Y').value.replace(',', '.');;
    console.log(checkX(x))
    if (checkX(x) && checkY(y)) {
        draw_dot(x, y)
    }

}

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('graph');
    if (!canvas) {
        console.error("Элемент с ID 'graph' не найден!");
        return;
    }

    draw_Graph();

    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();

        const x = event.clientX - rect.left - canvas.width / 2;
        const y = canvas.height / 2 - (event.clientY - rect.top);

        const scale = 35;
        const graphX = x / scale;
        const graphY = y / scale;
        if (checkX(graphX) && checkY(graphY)) {
            draw_dot(graphX, graphY);
            console.log(document.getElementById("formGraph:y"));


            document.getElementById("formGraph:y").value = graphY;
            document.getElementById("formGraph:x").value = graphX;
            submitGraphData();
        } else {
            const messageElement = document.getElementById('formSubmit:YMessage');


            if (messageElement) {
                messageElement.textContent = "Ошибка: координаты вне диапазона!";
                messageElement.style.display = "block";
                messageElement.style.color = "red";
                messageElement.style.opacity = "1";


                setTimeout(() => {

                    messageElement.style.opacity = "0";

                    setTimeout(() => {
                        messageElement.style.display = "none";
                    }, 1000);
                }, 4000);
            } else {
                console.error('Элемент с ID "YMessage" не найден!');
            }
        }
    });
});


// Graph.js
import React, { useEffect, useRef , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitPoint} from '../redux/reducers/pointsSubmit';


const Graph = () => {

    const canvasRef = useRef(null);
    const dispatch = useDispatch();
    const points = useSelector((state) => state.points.points);
    const r = useSelector((state) => state.points.r);
    const [errorMessage, setErrorMessage] = useState('');

    const currentR = isNaN(r) && points.length > 0 ? points[points.length - 1].r : r;

    useEffect(() => {

        const effectiveR = isNaN(r) && points.length > 0 ? points[points.length - 1].r : r;

        if (!isNaN(effectiveR)) {
            drawGraph(effectiveR);
        }
    }, [points, r]);

    useEffect(() => {
        console.log('Redux state R:', r);
    }, [r]);

    const drawGraph = (radius) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const scale = 35;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (isNaN(radius)) return;
        context.fillStyle = 'dodgerblue';
        context.beginPath();
        if (radius >= 0) {
            //окружность

            context.arc(centerX, centerY, radius * scale, Math.PI, 3 * Math.PI / 2);
            context.lineTo(centerX, centerY);
            context.fill();
            //прямоугольник
            context.fillRect(centerX, centerY, (radius / 2) * scale, -radius * scale);
            //треугольник
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.lineTo(centerX + (radius / 2) * scale, centerY);
            context.lineTo(centerX, centerY + (radius) * scale);
            context.fill();
        } else {

            context.arc(centerX, centerY, Math.abs(radius) * scale, 0,  Math.PI / 2);
            context.lineTo(centerX, centerY);
            context.fill();
            //прямоугольник
            context.fillRect(centerX, centerY, -(Math.abs(radius) / 2) * scale, Math.abs(radius)* scale);
            //треугольник
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.lineTo(centerX - (Math.abs(radius) / 2) * scale, centerY);
            context.lineTo(centerX, centerY - (Math.abs(radius)) * scale);
            context.fill();
        }
        // Рисуем оси
        context.strokeStyle = 'black';
        context.beginPath();
        context.moveTo(0, centerY);
        context.lineTo(canvas.width, centerY);
        context.moveTo(centerX, 0);
        context.lineTo(centerX, canvas.height);
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
        if (radius != 0) {
            context.font = "14px Arial";
            context.fillText("|", centerX + radius * scale - 2, centerY + 4);
            context.fillText("R", centerX + radius * scale - 5, centerY - 10);
            context.fillText("|", centerX + radius / 2 * scale - 2, centerY + 4);
            context.fillText("R/2", centerX + radius / 2 * scale - 10, centerY - 10);
            context.fillText("|", centerX - radius / 2 * scale - 2, centerY + 4);
            context.fillText("-R/2", centerX - radius / 2 * scale - 15, centerY - 10);
            context.fillText("|", centerX - radius * scale - 2, centerY + 4);
            context.fillText("-R", centerX - radius * scale - 10, centerY - 10);
            // установка меток на оси y
            context.font = "24px Arial";
            context.fillText("_", centerX - 7, centerY - radius / 2 * scale - 3);
            context.fillText("_", centerX - 7, centerY + radius / 2 * scale - 3);
            context.fillText("_", centerX - 7, centerY - radius * scale - 3);
            context.fillText("_", centerX - 7, centerY + radius * scale - 3);
            context.font = "14px Arial";
            context.fillText("-R/2", centerX + 9, centerY + radius / 2 * scale + 4);
            context.fillText("R/2", centerX + 9, centerY - radius / 2 * scale + 4);
            context.fillText("-R", centerX + 9, centerY + radius * scale + 4);
            context.fillText("R", centerX + 9, centerY - radius * scale + 4);
        }
        // Рисуем точки

        points.forEach((point) => {
            const x = centerX + point.x * scale;
            const y = centerY - point.y * scale;
            if(point.r<0) {

                context.fillStyle = 'red';
                context.beginPath();
                context.arc(x, y, 5, 0, 2 * Math.PI);
                context.fill();
            } else  {
                context.fillStyle = 'green';
                context.beginPath();
                context.arc(x, y, 5, 0, 2 * Math.PI);
                context.fill();
            }
        });
    };

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scale = 35;

        const x = (event.clientX - rect.left - canvas.width / 2) / scale;
        const y = (canvas.height / 2 - (event.clientY - rect.top)) / scale;

        if (isNaN(currentR)) {
            setErrorMessage('Введите значение R!');
            setTimeout(() => setErrorMessage(''), 2000);
            return;
        }

        if (x >= -5 && x <= 5 && y >= -5 && y <= 5) {
            const point = { x, y, r: currentR };
            console.log('Submitting point:', point);
            dispatch(submitPoint(point));
        } else {
            setErrorMessage('Координаты вне допустимого диапазона!');
            setTimeout(() => setErrorMessage(''), 2000);
        }
    };

    return (
        <div className="parent-container">
            <canvas ref={canvasRef} width={400} height={400} onClick={handleCanvasClick}></canvas>
            {errorMessage && <div className="error-popup">{errorMessage}</div>}

        </div>
    );
};

export default Graph;

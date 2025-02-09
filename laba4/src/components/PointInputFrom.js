import React, {useEffect, useState} from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoints } from '../redux/reducers/pointsReducer';
import {setRadius} from "../redux/reducers/pointsReducer";

const PointInputForm = () => {
    const [x, setX] = useState(null);
    const [y, setY] = useState('');
    const [r, setR] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch();

    const radioValues = ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'];

    const validateAndSubmit = async () => {

        setError('');
        setSuccess('');

        if (x === null) {
            setError('Пожалуйста, выберите значение X.');
            return;
        }

        if (!y || isNaN(y) || y < -5 || y > 5) {
            setError('Y должно быть числом от -5 до 5.');
            return;
        }

        if (r === null) {
            setError('Пожалуйста, выберите значение R.');
            return;
        }

        const point = {
            x: parseFloat(x),
            y: parseFloat(y),
            r: parseFloat(r),
        };

        try {
            const response = await fetch('http://localhost:8080/laba3-1.0-SNAPSHOT/rest-server/points/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(point),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Успешно добавлена точка:', data);
                setSuccess('Точка успешно добавлена!');
                dispatch(fetchPoints());

            } else {
                const errorText = await response.text();
                setError(`Ошибка: ${errorText}`);
            }
        } catch (error) {
            console.error('Ошибка при отправке точки:', error);
            setError('Не удалось отправить точку. Проверьте подключение.');
        }
    };

    useEffect(() => {
        dispatch(setRadius((r)));
        console.log(parseFloat(r));

    }, [r]);

    const handleRChange = (value) => {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
            dispatch(setRadius(parsedValue));
        }
    };
    return (


        <div>
            {error && <div className="error-popup">{error}</div>}

        <div className="form-container">
            <h3>Введите координаты точки и радиус области:</h3>


            <div>
                <h4>Координата X:</h4>
                <FormControl>
                    <RadioGroup
                        row
                        value={x}
                        onChange={(event) => setX(event.target.value)}
                        className="radio-group"
                    >
                        {radioValues.map((value) => (
                            <FormControlLabel
                                key={value}
                                value={value}
                                control={<Radio />}
                                label={<div className="circle">{value}</div>}
                                className="radio-item"
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>

            <div>
                <h4>Координата Y:</h4>
                <TextField
                    value={y}
                    placeholder="Введите Y (-5 ... 5)"
                    onChange={(event) => setY(event.target.value)}
                    type="number"
                    className="text-field"
                />
            </div>

            <div>
                <h4>Радиус R:</h4>
                <FormControl>
                    <RadioGroup
                        row
                        value={r}
                        onChange={(event) => { setR(event.target.value);}}
                        className="radio-group"
                    >
                        {radioValues.map((value) => (
                            <FormControlLabel
                                key={value}
                                value={value}
                                control={<Radio />}
                                label={<div className="circle">{value}</div>}
                                className="radio-item"
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>

            <Button
                onClick={validateAndSubmit}
                style={{
                    marginTop: '20px',
                    backgroundColor: 'darkblue',
                    color: 'white',
                }}
                variant="contained"
                className="custom-button"
            >
                Отправить
            </Button>
        </div>
        </div>
    );
};

export default PointInputForm;


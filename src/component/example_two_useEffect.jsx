import React from 'react';
import {useEffect, useState, useCallback, useRef} from 'react';
import styles from './few.module.css';

const ExamleButton = () => {
    const ref = useRef();
    const [count, setCount] = useState(0);
    const [initChange, setInitChange] = useState(false);
    /**
     * Сейчас наступил react 18 - и начиная с него - если пользователь спровоцировал запуск useEffect-а путем вз-ия с интерфейсом
     * клик. заполнил инпут
     * То тогда функция переданная в useEffect
     * выполнится до отрисовки в браузере.
     */

    const meowClick = () => {
        setInitChange(true);
    }
    const primer = useCallback(() => {
        console.log('rrtttttt');
        return setTimeout(() => { setCount(ref.current.clientWidth); }, 3000);
    }, []);

    useEffect(() => {
        console.log('rerender');
    }, [])

    useEffect(() => {
        if (initChange) {
            primer();
        }
    }, [initChange, primer])
    return (
        <div className="block" ref={ref}>
           <button onClick={meowClick}>Click!</button>
            <div>
                {count}
            </div>
        </div>
    );
};

export default ExamleButton;
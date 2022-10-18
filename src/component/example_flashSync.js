import React from 'react';
import { useState, useEffect } from 'react';
import {flushSync} from 'react-dom';

//Вызовите flushSync, чтобы заставить React сбросить всю ожидающую работу и синхронно обновить DOM.

// Когда юзать? Только когда есть интеграция со сторонним АПИ - для которого требуется заставить React
// сделать обновления здесь и сейчас

// Бьет по производительности

export default function PrintApp() {
    const [isPrinting, setIsPrinting] = useState(false);

    useEffect(() => {
        // прикол в том что Апи брааузера для печати файла заставит выполнится эту функцию перед открытием файла на печать
        // но нам еще надо чтобы обновился DOM или стили дже допустим страницы до открытия окна печати
        function handleBeforePrint() {
            flushSync(() => {
            setIsPrinting(true);
            })
        }

        function handleAfterPrint() {
            setIsPrinting(false);
        }

        window.addEventListener('beforeprint', handleBeforePrint);
        window.addEventListener('afterprint', handleAfterPrint);
        return () => {
            window.removeEventListener('beforeprint', handleBeforePrint);
            window.removeEventListener('afterprint', handleAfterPrint);
        }
    }, []);

    return (
        <>
            <h1>isPrinting: {isPrinting ? 'yes' : 'no'}</h1>
            <button onClick={() => window.print()}>
                Print
            </button>
        </>
    );
}

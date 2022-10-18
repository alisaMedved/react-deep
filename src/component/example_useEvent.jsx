import React from 'react';
import {useState, useRef, useCallback} from 'react';

export const InputSection = () => {
    /**
     * Речь пойдет о предложении предложенном 5 мая Деном Абрамовый  - useEvent
     * Ситуация: чатик - внизу инпут для сообщения и кнопка.
     * Ну угораздилл что допустим нужен код  с такими связями.
     * SendButton не меняется при вводе каждой буквы в TextField, однако
     * SendButton перерендеривается. Почему?
     * В SendButton в качестве пропса отправляют onClick (весьма стандартная ситуация) и
     * и при ом TextField setupdate каждой буквой text --> а обновление переменной из useState
     * заставляет общего рожителя InputSection перендериваться.
     * А каждый новыйй перерендер InputSection - новая инициализация  onClick.
     *
     * Решение по классике - ставим useCallback
     * но какую завсимость пропишем к нему - text? Она ж так часто меняется
     * и при том требуется ведь ее актуальное значение в onClick.
     *
     * Выход - useRef - постоянство ссылки а то чему равно одно из полей обекта...это делу не мешает
     * **/
    const [text, setText] = useState('');
    const textRef = useRef('');
    textRef.current = text;

    const onClick = useCallback(() => {
        console.log('send message = ', textRef.current);
    }, []);

    // Код на useEvent
    // рефов нет
    // const onClick = useEvent(() => {
    //     console.log('send message = ', text);
    // }, []);
    return (
        <>
           <TextField value={text} onChange={setText}  />
            <SendButton onClick={onClick} />
        </>
    );
};


const SendButton = React.memo(({onClick}) => {
    console.log('RENDER');
    return (
        <button onClick={onClick}>test</button>
    );
});

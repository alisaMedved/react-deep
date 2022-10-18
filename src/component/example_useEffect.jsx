import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {apiGetBooks} from './api';

const Books = ({categoryId}) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        /**
         * Мы переместили функцию внутрь эффекта, так что её не нужно указывать в списке зависимостей.
         * Но странно - линтер больше не ругается
         */
        const loadBooks = async() => {
            return await apiGetBooks({categoryId});
        }
        loadBooks().then(r => setBooks(r));
    }, [categoryId]);

    /***
     * Если по какой-то причине вы не можете переместить функцию в эффект, есть другие варианты:
     *
     * Можно попробовать поместить функцию снаружи компонента.
     * В таком случае она гарантированно не будет ссылаться на пропсы и состояние,
     * так что её не требуется перечислять в списке зависимостей.
     * */

    useEffect(() => {
        apiGetBooks({categoryId}).then(r => setBooks(r));
    }, [categoryId]);

     /**
     * Если функция, которую вы вызываете, является чистым вычислением и её безопасно вызывать во время рендера,
     * вы можете вызвать её снаружи эффекта, а не внутри, и сделать эффект зависящим от результата этого вызова, а не от самой функции.
      **/
     const getHello = (arg ) => {
      return arg * 2;
     }
     const meow = getHello(2);

    useEffect(() => {
        apiGetBooks({meow}).then(r => setBooks(r));
    }, [meow]);
     /**
     * В крайнем случае можете добавить саму функцию в список зависимостей эффекта, но обернув её определение
      * в хук useCallback. Тогда функция будет оставаться неизменной, до тех пор, пока не изменятся её зависимости:
     */

     const loadBooks = useCallback(async() => {
         return await apiGetBooks({categoryId});
     }, [categoryId]);

    useEffect(() => {
        loadBooks().then(r => setBooks(r));
    }, [loadBooks]);

    /**
     * Если функция использует пропсы и/или состояние или она с side effect
     * ей место в useEffect! Выше представлены три способа ее туда закинуть или
     * как обойтись без ее закидывания по правильному.
     */

    return (
        <ul>
            {
                books.map((book) => {
                    return <li key={book.id}>{book.name}</li>
                })
            }
        </ul>
    );
};

export default Books;
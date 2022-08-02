import { useState, useEffect } from 'react';
import useMarvelservice from '../../services/Marvel-service';
import ErrorMessage from '../error-message/error-message';
import PreloaderSpinner from '../preloader-spinner/preloader-spinner';

import './comics-list.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [loadingItems, setLoadingItems] = useState(false);
    const [offset, setOffset] = useState(0);
    const [endList, setEndList] = useState(false);
    const {loading, error, getAllComics, clearError} = useMarvelservice();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        setEndList(endList => false)
    },[endList]);

    const onRequest = (offset, initial) => {
        initial ? setLoadingItems(false) : setLoadingItems(true);
        getAllComics(offset)
        .then(onComicsLoading)
    }

    const onComicsLoading = (newComicsList) => {
        clearError();
        let ended = false;
        if (newComicsList.length < 8) ended = true;
        setComicsList((comicsList) => [...comicsList,...newComicsList]);
        setLoadingItems(false);
        setOffset(offset => offset + 8);
        setEndList(endList => ended);
        console.log(offset)
    }

    function renderElements(comicsList) {
        const elements = comicsList.map((item) => {
            const {name, thumbnail, id, price} = item;
            const fitImage = thumbnail.indexOf('image_not_available') !== -1 ? "fill-image" : '';
            const priceControl = price !== 0 ? `${price}$` : 'Sold out';
            return (
            <li key={id} className="comics__item">
                <a href="#">
                    <img src={thumbnail} alt={name} className={`comics__item-img ${fitImage}`}/>
                    <div className="comics__item-name">{name}</div>
                    <div className="comics__item-price">{priceControl}</div>
                </a>
            </li>
            )
        })
        return (
            <ul className="comics__grid">
                {elements}
            </ul>
        )
    }

    const items = renderElements(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !loadingItems ? <PreloaderSpinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
           {items}
            <button
            disabled={loadingItems}
            onClick={() => onRequest(offset)}
            style={{'display': endList ? 'none' : 'block'}}
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
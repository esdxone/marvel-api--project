import {useState, useEffect, useRef} from 'react';
import useMarvelservice from '../../services/Marvel-service';
import PreloaderSpinner from '../preloader-spinner/preloader-spinner';
import ErrorMessage from '../error-message/error-message';

import './char-list.scss';

const CharList = (props) => {

    const [charlist, setCharList] = useState([]);
    const [loadingItems, setLoadingItems] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endList, setEndList] = useState(false);
    const {loading, error, getAllCharacters} = useMarvelservice();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        setEndList(endList => false)
    },[endList]);

    const onRequest = (offset, initial) => {
        initial ? setLoadingItems(false) : setLoadingItems(true);
        getAllCharacters(offset)
        .then(onCharLoaded)
    }

    const onCharLoaded = (newCharlist) => {
        let ended = false;
        if (newCharlist.length < 9) ended = true
        setCharList(charlist => [...charlist,...newCharlist])
        setLoadingItems(loadingItems => false);
        setOffset(offset => offset + 9);
        setEndList(endList => ended);
    }

    let itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    function renderElements(charlist) {
        const elements = charlist.map((item, i) => {
            const {name,thumbnail, id} = item;
            const fitImage = thumbnail.indexOf('image_not_available') !== -1 ? "fill-image" : '';
            return (
                <li key={id}
                ref={elem => itemRefs.current[i] = elem}
                tabIndex="0"
                className="char__item"
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onSelectedChar(id);
                        focusOnItem(i);
                    }
                }}
                onClick={() => {
                    props.onSelectedChar(id);
                    focusOnItem(i);}
                }>
                <img className={fitImage} src={thumbnail} alt="abyss"/>
                <div className="char__name">{name}</div>
            </li>
            )
        })

        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }
        const items = renderElements(charlist);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !loadingItems ? <PreloaderSpinner/> : null;

        return(
            <div className="char__list">
                {errorMessage}
                {spinner}
                {items}
                <button
                disabled={loadingItems}
                onClick={() => onRequest(offset)}
                style={{'display': endList ? 'none' : 'block'}}
                className="button button__main button__long">
                    <div  className="inner">load more</div>
                </button>
            </div>
        )
    }

export default CharList;

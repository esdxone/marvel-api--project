import {useState, useEffect, useRef} from 'react';
import Marvelservice from '../../services/Marvel-service';
import PreloaderSpinner from '../preloader-spinner/preloader-spinner';
import ErrorMessage from '../error-message/error-message';

import './char-list.scss';

const CharList = (props) => {

    const [charlist, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endList, setEndList] = useState(false);

    const marvelService = new Marvelservice();

    useEffect(() => {
        onRequest();
    },[]);

    useEffect(() => {
        setEndList(endList => false)
    },[endList]);

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onRequest = (offset) => {
        onCharLoadingList();
        marvelService
        .getAllCharacters(offset)
        .then(onCharLoaded)
        .catch(onError)
    }

    const onCharLoadingList = () => {
        setLoadingItems(true);
    }

    const onCharLoaded = (newCharlist) => {
        let ended = false;
        if (newCharlist.length < 9) ended = true
        setCharList(charlist => [...charlist,...newCharlist])
        setLoading(loading => false);
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
        const spinner = loading ? <PreloaderSpinner/> : null;
        const content = !(spinner || errorMessage) ? items : null;

        return(
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
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

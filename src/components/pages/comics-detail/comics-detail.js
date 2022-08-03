import { Link, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import useMarvelservice from '../../../services/Marvel-service';
import ErrorMessage from '../../error-message/error-message';
import PreloaderSpinner from '../../preloader-spinner/preloader-spinner';

import './comics-detail.scss';

const ComicsDetail = () => {

    const {comicId} = useParams();
    const [comic, setComic] = useState([]);
    const {loading, error, getComics, clearError} = useMarvelservice();

    useEffect(() => {
        getComic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[comicId])

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const getComic = () => {
        clearError();
        getComics(comicId)
        .then(onComicLoaded)
    }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <PreloaderSpinner/> : null;
        const content = !(spinner || errorMessage || !comic) ? <ComicElement comic={comic}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const ComicElement = ({comic}) => {
    const {name, thumbnail, description, pageCount, language, price} = comic;
    return (
        <>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{`${price}`}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default ComicsDetail;
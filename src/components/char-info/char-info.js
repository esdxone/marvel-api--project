import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import useMarvelservice from '../../services/Marvel-service';
import ErrorMessage from '../error-message/error-message';
import PreloaderSpinner from '../preloader-spinner/preloader-spinner';
import PreloaderSkeleton from '../preloader-skeleton/preloader-skeleton';

import './char-info.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelservice();

    useEffect(() => {
        getChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const getChar = () => {
        clearError();
        const {charId} = props;
        if (!charId) {
            return;
        }
        getCharacter(charId)
        .then(onCharLoaded)
    }
        const skeleton = char || loading || error ? null : <PreloaderSkeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <PreloaderSpinner/> : null;
        const content = !(spinner || errorMessage || !char) ? <CharElement data={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
}

const CharElement = ({data}) => {
    const {name, thumbnail, description, homepage, wiki, comics} = data;
    const fitImage = thumbnail.indexOf('image_not_available') !== -1 ? "fill-image" : '';
    return (
        <>
         <div className="char__basics">
            <img className={fitImage} src={thumbnail} alt={name}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "Comics not found"}
                {   comics.map((item, i) => {
                    // eslint-disable-next-line
                    if(i > 9) return
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useMarvelservice from '../../services/Marvel-service';
import setContent from '../../utils/set-content';

import './char-info.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const {process, getCharacter, setProcess, clearError} = useMarvelservice();

    useEffect(() => {
        if (!props.charId) return;
        getChar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const getChar = () => {
        clearError();
        if (!props.charId) return;
        getCharacter(props.charId)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'))
    }

        return (
            <div className="char__info">
                {setContent(process, CharElement, char)}
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
                    const comicsId = item.resourceURI.split('/').pop();
                    // eslint-disable-next-line
                    if(i > 9) return
                        return (
                            <Link to={`/comics/${comicsId}`} key={i} className="char__comics-item">
                                {item.name}
                            </Link>
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
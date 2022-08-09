import { useState, useEffect } from 'react';
import setContent from '../../utils/set-content';
import useMarvelservice from '../../services/Marvel-service';

import './char-random.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const CharRandom = (props) => {

    const [char, setChar] = useState({});
    const {process, setProcess, getCharacter, clearError} = useMarvelservice();

    useEffect(() => {
        getChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const getChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
        .then(onCharLoaded)
        .then(() => setProcess('confirmed'));
    }

        return (
        <div className="randomchar">
            {setContent(process, CharElement, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div onClick={getChar} className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
        )
}

const CharElement = ({data}) => {

    const {name, description, thumbnail, homepage, wiki} = data;
    // const fitImage = thumbnail.indexOf('image_not_available') !== -1 ? "fit-image" : '';
    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt={name} title={name} className={`randomchar__img ${'fit-image'}`}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
               {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default CharRandom;
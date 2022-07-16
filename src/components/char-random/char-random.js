import { Component } from 'react';
import PreloaderSpinner from '../preloader-spinner/preloader-spinner';
import ErrorMessage from '../error-message/error-message';
import Marvelservice from '../../services/Marvel-service';

import './char-random.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class CharRandom extends Component {

    constructor(props) {
        super(props);
        this.state = {
           char: {},
           loading: true,
           error: false
         }
    }

    marvelService = new Marvelservice();

    componentDidMount() {
        this.getChar();
    }

    onCharLoading() {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    getChar = () => {
        this.onCharLoading();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render () {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <PreloaderSpinner/> : null;
        const content = !(spinner || errorMessage) ? <CharElement data={char}/> : null;

        return (
        <div className="randomchar">
             {errorMessage}
             {spinner}
             {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div onClick={this.getChar} className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
        )
    }
}

const CharElement = ({data}) => {

    const {name, description, thumbnail, homepage, wiki} = data;
    const fitImage = thumbnail.indexOf('image_not_available') !== -1 ? "fit-image" : '';
    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt={name} title={name} className={`randomchar__img ${fitImage}`}/>
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
import {Component} from 'react';
import Marvelservice from '../../services/Marvel-service';
import PreloaderSpinner from '../preloader-spinner/preloader-spinner';
import ErrorMessage from '../error-message/error-message';

import './char-list.scss';

class CharList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            charlist: [],
            loading: true,
            error: false
        }
    }

    marvelService = new Marvelservice();

    componentDidMount() {
        this.getChar();
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharLoaded = (charlist) => {
        this.setState({
            charlist,
            loading: false
        })
    }

    getChar = () => {
        this.marvelService
        .getAllCharacters()
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    renderElements() {
        const elements = this.state.charlist.map(item => {
            const {name,thumbnail} = item;
            const fitImage = thumbnail.indexOf('image_not_available') !== -1 ? "fill-image" : '';
            return (
                <li key={name} className="char__item">
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

    render() {
        const {loading,error} = this.state;
        const items = this.renderElements();
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <PreloaderSpinner/> : null;
        const content = !(spinner || errorMessage) ? items : null;

        return(
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;

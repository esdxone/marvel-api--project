import { Component } from 'react';
import PropTypes from 'prop-types';
import Marvelservice from '../../services/Marvel-service';
import ErrorMessage from '../error-message/error-message';
import PreloaderSpinner from '../preloader-spinner/preloader-spinner';
import PreloaderSkeleton from '../preloader-skeleton/preloader-skeleton';

import './char-info.scss';


class CharInfo extends Component {

        state = {
           char: null,
           loading: false,
           error: false
         }

    marvelService = new Marvelservice();

    componentDidMount() {
        this.getChar();
    }

    componentDidUpdate(prevPops) {
        if (this.props.charId !== prevPops.charId) {
            this.getChar();
        }
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
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;
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
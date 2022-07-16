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
            error: false,
            loadingItems: false,
            offset: 210,
            endList: false
        }
    }

    marvelService = new Marvelservice();

    componentDidMount() {
        this.onRequest(this.state.offset);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.endList === this.state.offset) {
            this.setState({
                endList: false
            })
        }
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onRequest = (offset) => {
        this.onCharLoadingList();
        this.marvelService
        .getAllCharacters(offset)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    onCharLoadingList = () => {
        this.setState({
            loadingItems: true
        })
    }

    onCharLoaded = (newCharlist) => {
        let ended = false;
        if (newCharlist.length < 9) ended = true

        this.setState(({charlist, offset}) => ({
                charlist: [...charlist,...newCharlist],
                loading: false,
                loadingItems: false,
                offset: offset + 9,
                endList: ended
        }))
    }

    renderElements(charlist) {
        const elements = charlist.map(item => {
            const {name,thumbnail, id} = item;
            const {onSelectedChar} = this.props;
            const fitImage = thumbnail.indexOf('image_not_available') !== -1 ? "fill-image" : '';
            return (
                <li key={id} className="char__item" onClick={() => onSelectedChar(id)}>
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
        const {charlist,loading,error, loadingItems, offset, endList} = this.state;
        const items = this.renderElements(charlist);
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
                onClick={() => this.onRequest(offset)}
                style={{'display': endList ? 'none' : 'block'}}
                className="button button__main button__long">
                    <div  className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;

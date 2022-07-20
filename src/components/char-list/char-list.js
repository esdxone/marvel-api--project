import React, {Component} from 'react';
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
        console.log(this.focus)
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

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }


    renderElements(charlist) {
        const elements = charlist.map((item, i) => {
            const {name,thumbnail, id} = item;
            const {onSelectedChar} = this.props;
            const fitImage = thumbnail.indexOf('image_not_available') !== -1 ? "fill-image" : '';
            return (
                <li key={id}
                ref={this.setRef}
                tabIndex="0"
                className="char__item"
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        this.props.onSelectedChar(id);
                        this.focusOnItem(i);
                    }
                }}
                onClick={() => {
                    onSelectedChar(id);
                    this.focusOnItem(i);}
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

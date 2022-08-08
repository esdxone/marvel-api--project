import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import useMarvelservice from '../../services/Marvel-service';
import ErrorMessage from '../error-message/error-message';
import PreloaderSpinner from '../preloader-spinner/preloader-spinner';
import AppBanner from '../app-banner/app-banner';


const DetailPageLayout = ({Component, dataType}) => {

    const {elementId} = useParams();
    const [item, setItem] = useState([]);
    const {loading, error, getComics, getCharacter, clearError} = useMarvelservice();

    useEffect(() => {
        getItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[elementId])

    const onItemLoaded = (item) => {
        setItem(item);
    }

    const getItem = () => {
        clearError();

        // eslint-disable-next-line default-case
        switch (dataType) {
            case 'comic':
                getComics(elementId)
                    .then(onItemLoaded);
                break;
            case 'character':
                getCharacter(elementId)
                    .then(onItemLoaded);
        }

    }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <PreloaderSpinner/> : null;
        const content = !(spinner || errorMessage || !item) ? <Component item={item}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}



export default DetailPageLayout;
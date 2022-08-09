import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
import useMarvelservice from '../../services/Marvel-service';
import setContent from '../../utils/set-content';
import AppBanner from '../app-banner/app-banner';


const DetailPageLayout = ({Component, dataType}) => {

    const {elementId} = useParams();
    const [item, setItem] = useState([]);
    const {process, setProcess, getComics, getCharacter, clearError} = useMarvelservice();

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
                    .then(onItemLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(elementId)
                    .then(onItemLoaded)
                    .then(() => setProcess('confirmed'));
        }

    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, item)}
        </>
    )
}



export default DetailPageLayout;
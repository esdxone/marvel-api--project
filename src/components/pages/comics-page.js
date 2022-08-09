import {Helmet} from 'react-helmet';
import ComicsList from '../comics-list/comics-list';
import AppBanner from '../app-banner/app-banner';


const ComicsPage = () => {

    return (
        <>
           <Helmet>
                <meta
                name="description"
                content="Comics list"
                />
                <title>Comics list</title>
            </Helmet>
             <AppBanner/>
             <ComicsList/>
        </>
    )
}

export default ComicsPage;
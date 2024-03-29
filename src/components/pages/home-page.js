import { useState } from 'react';
import {Helmet} from 'react-helmet';
import CharRandom from '../char-random/char-random';
import CharList from '../char-list/char-list';
import CharInfo from '../char-info/char-info';
import CharSearch from '../char-search/char-search';
import ErrorBoundary from '../error-boundary/error-boundary';
import bgDecoration from '../../resources/img/vision.png';

const HomePage = () => {
    const [currentChar, setCurrentChar] = useState(null);

    const onSelectedChar = (id) => setCurrentChar(id);
    return (
         <>
            <Helmet>
                <meta
                name="description"
                content="Marvel infomation portal"
                />
                <title>Marvel</title>
            </Helmet>
            <ErrorBoundary>
                <CharRandom/>
            </ErrorBoundary>

            <div className="char__content">
                <ErrorBoundary>
                <CharList onSelectedChar={onSelectedChar}/>
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                    <CharInfo charId={currentChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                    <CharSearch/>
                    </ErrorBoundary>
                </div>
            </div>

            <img className="bg-decoration" src={bgDecoration} alt="vision"/>
        </>
    )
}
export default HomePage;
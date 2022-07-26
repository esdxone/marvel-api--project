import { useState } from 'react';

import AppHeader from '../app-header/app-header';
import CharRandom from '../char-random/char-random';
import CharList from '../char-list/char-list';
import CharInfo from '../char-info/char-info';
import ErrorBoundary from '../error-boundary/error-boundary';
import bgDecoration from '../../resources/img/vision.png'

const App = () => {

  const [currentChar, setCurrentChar] = useState(null);

  const onSelectedChar = (id) => setCurrentChar(id);

    return (
      <div className="app">
       <AppHeader/>
       <main>
          <ErrorBoundary>
             <CharRandom/>
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
               <CharList onSelectedChar={onSelectedChar}/>
            </ErrorBoundary>
            <ErrorBoundary>
               <CharInfo charId={currentChar}/>
            </ErrorBoundary>
          </div>
           <img className="bg-decoration" src={bgDecoration} alt="vision"/>
       </main>
      </div>
    )
}

export default App;

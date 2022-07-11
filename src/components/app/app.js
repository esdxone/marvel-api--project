import AppHeader from '../app-header/app-header';
import CharRandom from '../char-random/char-random';
import CharList from '../char-list/char-list';
import CharInfo from '../char-info/char-info';

import bgDecoration from '../../resources/img/vision.png'

const App = () => {
  return (
    <div className="app">
     <AppHeader/>
     <main>
        <CharRandom/>
        <div className="char__content">
          <CharList/>
          <CharInfo/>
        </div>
         <img className="bg-decoration" src={bgDecoration} alt="vision"/>
     </main>
    </div>
  )
}

export default App;

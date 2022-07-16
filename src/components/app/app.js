import { Component } from 'react';

import AppHeader from '../app-header/app-header';
import CharRandom from '../char-random/char-random';
import CharList from '../char-list/char-list';
import CharInfo from '../char-info/char-info';
import ErrorBoundary from '../error-boundary/error-boundary';
import bgDecoration from '../../resources/img/vision.png'

class App extends Component {

  state = {
    currentChar: null
  }

  onSelectedChar = (id) => {
    this.setState({
      currentChar: id
    })
  }

  render() {
    return (
      <div className="app">
       <AppHeader/>
       <main>
          <ErrorBoundary>
             <CharRandom/>
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
               <CharList onSelectedChar={this.onSelectedChar}/>
            </ErrorBoundary>
            <ErrorBoundary>
               <CharInfo charId={this.state.currentChar}/>
            </ErrorBoundary>
          </div>
           <img className="bg-decoration" src={bgDecoration} alt="vision"/>
       </main>
      </div>
    )
  }
}

export default App;

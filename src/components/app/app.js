
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import { HomePage, ComicsPage, Page404, ComicsDetail } from '../pages';


const App = () => {

    return (
      <Router>
           <div className="app">
            <AppHeader/>
            <main>
               <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/comics" element={<ComicsPage/>}/>
                  <Route path="/comics/:comicId" element={<ComicsDetail/>}/>
                  <Route path="*" element={<Page404/>}/>
               </Routes>
            </main>
            </div>
      </Router>
    )
}

export default App;

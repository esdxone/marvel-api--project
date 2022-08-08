
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppHeader from '../app-header/app-header';
import PreloadeSpinner from '../preloader-spinner/preloader-spinner';

const HomePage = lazy(() => import('../pages/home-page'));
const ComicsPage = lazy(() => import('../pages/comics-page'));
const ComicsDetail = lazy(() => import('../pages/comics-detail/comics-detail'));
const CharDetail = lazy(() => import('../pages/char-detail/char-detail'));
const DetailPageLayout = lazy(() => import('../pages/detail-page-layout'));
const Page404 = lazy(() => import('../pages/404'));


const App = () => {

    return (
       <Router>
         <Suspense fallback={<PreloadeSpinner/>}>
           <div className="app">
            <AppHeader/>
            <main>
               <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/comics" element={<ComicsPage/>}/>
                  <Route
                  path="/comics/:elementId"
                  element={<DetailPageLayout dataType="comic" Component={ComicsDetail}/>}
                  />
                  <Route
                  path="/characters/:elementId"
                  element={<DetailPageLayout dataType="character" Component={CharDetail}/>}
                  />
                  <Route path="*" element={<Page404/>}/>
               </Routes>
            </main>
            </div>
            </Suspense>
         </Router>
    )
}

export default App;

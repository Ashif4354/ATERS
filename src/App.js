import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import SignIn from './Pages/SignIn/SignIn';
import Result from './Pages/Results/Result';


function App() {
  return (
    <BrowserRouter>
      {/* <AppHeader /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/results' element={<Result />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

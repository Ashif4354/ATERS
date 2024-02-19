import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
// import Footer from './Components/Footer/Footer';
import SignIn from './Pages/SignIn/SignIn';
import Schedule from './Pages/Schedule/Schedule';
import Profile from './Pages/Profile/Profile';
// import { ScheduleBlank } from './Pages/Schedule/Schedule';


function App() {
  return (
    <BrowserRouter>
      {/* <AppHeader /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/profile' element={<Profile />} />
        {/* <Route path='/schedule/:id' element={<Schedule />} /> */}

      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

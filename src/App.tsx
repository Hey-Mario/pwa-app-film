import './App.css';
import { useEffect, useMemo, useState } from 'react';
import instance from './constants/axiosConfig';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // instance.get('/users/me')
    //   .then((user) => {
    //     setUser(user.data);
    //     setIsLoading(false);
    //     // console.log(user);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     console.error(err);
    //   });
  },[])

  // if(isLoading){
  //   return(
  //     <div>Loading...</div>
  //   )
  // }

  return (
    <BrowserRouter>
      <div className="bg-light" style={{ minHeight: "100vh" }}>
        <div className="container-full">
          <Routes>
            {/* Visitor authorized page */}
            <Route path={''} element={<Login />} />
            <Route path={'home'} element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

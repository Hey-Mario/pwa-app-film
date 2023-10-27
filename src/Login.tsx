import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/authentication.css";
import instance from './constants/axiosConfig';
import copy from 'copy-to-clipboard';

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const API_KEY = localStorage.getItem('api_key') ?? "";

  const navigate = useNavigate();

  useEffect(()=>{
    if(API_KEY){
      navigate('home')
    }
  },[])

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    if (!email || !password) {
      alert("champ requis")
      setIsLoading(false)
      return;
    }
    try {
      // console.log(data);
      const res = await instance.get(`/search/movie?query=login&api_key=${password}`);
      if(res.data.results){
        localStorage.setItem('api_key', password);
      } else {
        setError(res?.data?.status_message);
      }
      setIsLoading(false);
      const myerror = "Vous êtes connéctés";
      setError(myerror);
      setTimeout(() => {
        navigate('/home')
      }, 500)
    } catch (error: any) {
      const myerror = "Api key invalide"
      setIsLoading(false);
      setError(myerror);
      console.error(error);
    }

  }


  function myFunction(e: any) {
    var copyText = "7733263982f2fbede06debb35a9009ff";

    // Copy the text inside the text field
    copy(copyText)

    // Alert the copied text
    alert("API KEY COPIÉ: " + copyText);
    e.preventDefault()
  }

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
          <form className="card px-4 pt-2 pb-4">
            <img width={150} className='mx-auto my-2' src='./mariFilx.jpg' alt='logo_facebook' />
            <div className="my-3">
              <input
                style={{ border: "1px solid #dddfe2" }} 
                type="email"
                name="email"
                placeholder='Email' 
                className="form-control-lg" 
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-1">
              <input 
                style={{ border: "1px solid #dddfe2" }} 
                type="password" 
                name="password" 
                placeholder='API KEY'
                className="form-control-lg" 
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              {error} <br />
              <button className='btn btn-warning btn-sm' onClick={myFunction}>Copier API KEY</button>
            </div>
            <div className="d-grid gap-2">
              { !isLoading ?
                <button className="btn btn-lg text-white" style={{backgroundColor: '#ce6000'}} onClick={handleSubmit}>Se connecter</button> :
                <button className="btn btn-lg text-white" style={{backgroundColor: '#ce6000'}} type="button" disabled>
                  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  Chargement...
                </button>
              }
            </div>
          </form>
      </div>
    </div>
  )
}

export default Login;
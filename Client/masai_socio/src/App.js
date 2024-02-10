
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Posts from './Components/Posts';
import SignIN from './Components/SignIN';


function App() {
  

  return (
    <>
    <div style={{display:'flex',justifyContent:"space-around"}}>
      {/* <Link to="/login">SignIN</Link> */}
      <Link to="/">Home</Link>
      <Link to="/register">SignUp</Link>
      <Link to="/login">SignIn</Link>
      <Link to="/posts">Posts</Link>

      
    </div>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/posts' element={<Posts/>}/>
      <Route path='/login' element={<SignIN/>}/>

      

      
    </Routes>
      
        
    </>
  )
}

export default App

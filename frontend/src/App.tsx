import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import Home from "@/pages/Home"

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index path={"/"} element={<Home />}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App

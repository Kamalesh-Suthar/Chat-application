import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Signin";

function App() {
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App

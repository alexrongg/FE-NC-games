import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header';
import ReviewsPage from './pages/ReviewsPage';
import ReviewPage from './pages/ReviewPage';
import { useState, useEffect } from "react"
import { UserContext } from './contexts/UserContext';

function App() {
  const [loggedInUser, setLoggedInUser] = useState("cooljmessy")
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://alex-games.herokuapp.com/api/categories')
        .then((res) => res.json())
        .then((categories) => {
            setCategories(categories);
            
        });
}, []); 

  return (
    <BrowserRouter>
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
    <Header categories={categories} />
    <Routes>
    <Route path="/" element={<ReviewsPage/>}></Route>
    <Route path="/reviews/:category" element={<ReviewsPage/>}></Route>
    <Route path="/review/:review_id" element={<ReviewPage/>}></Route>
    </Routes>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

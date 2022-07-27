import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header';
import ReviewsPage from './pages/ReviewsPage';
import { useState, useEffect } from "react"

function App() {
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
    <Header categories={categories} />
    <Routes>
    <Route path="/reviews" element={<ReviewsPage/>}></Route>
    <Route path="/reviews/:category" element={<ReviewsPage/>}></Route>
     
    </Routes>
    </BrowserRouter>
  );
}

export default App;

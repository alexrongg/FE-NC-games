import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header';
import ReviewsPage from './pages/ReviewsPage';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/reviews" element={<ReviewsPage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

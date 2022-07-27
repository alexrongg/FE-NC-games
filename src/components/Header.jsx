import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Header() {
    const [categories, setCategories] = useState();

    useEffect(() => {
        fetch('https://alex-games.herokuapp.com/api/categories')
            .then((res) => res.json())
            .then(({categories}) => {
                setCategories(categories);
            });
    }, []);    

    return (
        <header>
            <div className="logo-wrapper">
                <img alt="Logo of the website" src="https://www.seekpng.com/png/full/226-2262632_gaming-week-in-review-gaming-review.png"></img>
                <h1>Games review</h1>
                <div className="logo-text">REVIEWS FOR YOUS</div>
            </div>
            <p>Hello Guest!</p>
            <Link to={'/users'}>Login</Link>
            <nav className="nav-bar">
                <ul>
                    <Link to={'/reviews'}>All Reviews</Link>
                    <Link to={'/users'}>All Users</Link>
                    <Link to={'/categories'}>All Categories</Link>
                </ul>
            </nav>
        </header>
    );
};
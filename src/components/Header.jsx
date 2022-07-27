import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Header({categories}) {

    const dropDownHandler = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    };

    window.onclick = function(e) {
        if (!e.target.matches('.dropbtn')) {
        let myDropdown = document.getElementById("myDropdown");
          if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
          }
        }
      }

    return (
        <header>
            <div className="logo-wrapper">
                <img alt="Logo of the website" src="https://www.seekpng.com/png/full/226-2262632_gaming-week-in-review-gaming-review.png"></img>
                <h1>Games review</h1>
                <div className="logo-text">REVIEWS FOR YOUS</div>
            </div>
            <p>Hello Guest!</p>
            <Link to={'/users'}>Login</Link>
            <nav className="navbar">
                <ul>
                    <Link to={'/reviews'}>All Reviews</Link>
                    <Link to={'/users'}>All Users</Link>
                    <Link to={'/categories'}>All Categories</Link>
                    <div class="dropdown">
                    <button class="dropbtn" onClick={dropDownHandler}>Categories</button>
                    <div id="myDropdown" class="dropdown-content">   
                    {categories.map((category) => {
                    return (   
                        <Link key={category.description} className="categoryLinks" to={`/reviews/${category.slug}`}>{category.slug}</Link>
                    )
                })}
                </div>
                </div>
                </ul>
            </nav>
        </header>
    );
};
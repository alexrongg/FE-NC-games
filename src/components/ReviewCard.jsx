import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"

export default function ReviewCard() {

    const [reviews, setReviews] = useState([]);
    const {category}= useParams()
    console.log(category)

    
    useEffect(() => {
        if (category) {
            fetch(`https://alex-games.herokuapp.com/api/reviews?category=${category}`)
            .then((res) => res.json())
            .then((items) => setReviews(items))
        } else {
           fetch('https://alex-games.herokuapp.com/api/reviews')
            .then((res) => res.json())
            .then((items) => setReviews(items)) 
        }
    }, [category]); 
    

 return (reviews.map((review) => {
    return (
        <div className="review-card" key={review.review_id}>
            <img src={review.review_img_url} alt="Picture of review"></img>
            <button>⬆️</button>
            <h3>{review.votes}</h3>
            <button>⬇️</button>
            <h2>{review.title} by {review.designer}</h2>
            <p>{review.review_body}</p>
            <p>Category: {review.category} <br></br>
            Review owner: {review.owner}</p>
            <Link to={`/reviews/${review.review_id}/comments`}>comments : {review.comment_count}</Link>
        </div>
    )
}))
}
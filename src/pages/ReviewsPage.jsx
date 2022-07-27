import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://alex-games.herokuapp.com/api/reviews')
        .then((res) => res.json())
        .then((items) => setReviews(items))
    }, []);

    // const upVoteOnClickHandler = (review) => {
    //     axios.post()
    // };
    // const downVoteOnClickHandler

    return (
        reviews.map((review) => {
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
        })
    );
};
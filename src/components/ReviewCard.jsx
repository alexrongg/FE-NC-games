import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
const axios = require("axios")

export default function ReviewCard() {

    const [reviews, setReviews] = useState([]);
    const {category}= useParams()
    const [vote, setVote] = useState(false)

    
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
    }, [category, vote]); 

    const addVoteHandler = (review_id) => {
        setVote(false)
        axios
        .patch(`https://alex-games.herokuapp.com/api/reviews/${review_id}`, {"inc_votes" : 1})
        .then(() => setVote(true))
    }
    const removeVoteHandler = (review_id) => {
        setVote(false)
        axios
        .patch(`https://alex-games.herokuapp.com/api/reviews/${review_id}`, {"inc_votes" : -1})
        .then(() => setVote(true))
    }
    

 return (reviews.map((review) => {
    return (
        <div className="review-card" key={review.review_id}>
            <img src={review.review_img_url} alt={`${review.owner}'s game review`}></img>
            <button onClick={()=> {addVoteHandler(review.review_id)}}>⬆️</button>
            <h3>{review.votes}</h3>
            <button onClick={()=> {removeVoteHandler(review.review_id)}}>⬇️</button>
            <h2>{review.title} by {review.designer}</h2>
            <p>{review.review_body.split('', 300)}<Link to={`../review/${review.review_id}`}> read more...</Link></p>
            <p>Category: {review.category} <br></br>
            Review owner: {review.owner}</p>
            <Link to={`/reviews/${review.review_id}/comments`}>comments : {review.comment_count}</Link>
        </div>
    )
}))
}
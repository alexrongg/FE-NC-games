import {useParams} from "react-router-dom"
import {useState, useEffect, useContext} from "react"
import { UserContext } from '../contexts/UserContext';
const axios = require("axios")


export default function ReviewPage() {
    const {review_id} = useParams()
    const [review, setReview] = useState({})
    const [reviewComments, setReviewComments] = useState([])
    const [err, setErr] = useState("")
    const [commentBody, setCommentBody] = useState("")
    const { loggedInUser } = useContext(UserContext);
    const [vote, setVote] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [deleted, setDeleted ] = useState(false)

    const getComments = () => {
        fetch(`https://alex-games.herokuapp.com/api/reviews/${review_id}/comments`)
            .then(function(response) {
                if (!response.ok){
                    throw "No comment";
                }
                return response.json()
            })
            .then(({comments}) => {
                setReviewComments(comments)
                setIsLoading(false)
            })
            .catch((err) => {
                setErr(err)
            })
    };

    console.log(reviewComments)

    useEffect(() => {
        setIsLoading(true)
           fetch(`https://alex-games.herokuapp.com/api/reviews/${review_id}`)
            .then((res) => res.json())
            .then(({review}) => {
                setReview(review)
                setIsLoading(false)
            });
        getComments()
    }, [review_id, vote, submitted, deleted]); 
   
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
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
        .post(`https://alex-games.herokuapp.com/api/reviews/${review_id}/comments`, { "username": loggedInUser, "body": commentBody})
        .then((res) => {
            setCommentBody("")
            setSubmitted(true)
        })
        .catch((err) => {
            setSubmitted(false)
        })
    };
    
    const removeCommentHandler = (comment_id, author) => {
        if (author === loggedInUser) {
            axios
            .delete(`https://alex-games.herokuapp.com/api/comments/${comment_id}`)
            .then(() => {
            setDeleted(true)  
            })
            
            
        } else {
            setDeleted(false)
            throw "Cannot delete comment that's not yours"
        }
        
    };
     
      
return (
    <div>
    <div className="review-page">
        {(isLoading) ? (<p>Loading...</p>) : (
        <div>
        <p><button onClick={() => {removeVoteHandler(review_id)}}>-</button> votes: {review.votes} <button onClick={() => {addVoteHandler(review_id)}}>+</button></p><img src={review.review_img_url}></img>
        <h2>{review.title} by {review.designer}</h2>
        <p>{review.review_body}</p>
        <p>Created at: {review.created_at} by {review.owner}</p>
        </div>)} 
        
    </div>
    <div className="comment-section">
        <h3>Comments</h3>
        {(err === "No comment") ? <p>No comments found...</p> : 
        <div>
        {reviewComments.map((comment) => {
            return (<div><button>-</button> {comment.votes} <button>+</button> {comment.body} - {comment.author} <button onClick={() => {removeCommentHandler(comment.comment_id, comment.author)}} disabled={(deleted)? true : false}>DEL</button></div>)
        })}
        
        <div className="post-comment">
        </div>
        </div>   
    }
     <form onSubmit={onSubmitHandler}>
            <label for="comment">New comment:</label><br/>
            <textarea value={commentBody}name="commentbox" rows="10" cols="70" placeholder="comment here" onChange={(e) => setCommentBody(e.target.value)}></textarea><br/>
            <input type="submit" value="Submit" disabled={(submitted)? true : false}></input>   
        </form>
    </div>
    </div>
)
};
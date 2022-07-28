import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"
const axios = require("axios")


export default function ReviewPage() {
    const {review_id} = useParams()
    const [review, setReview] = useState({})
    const [reviewComments, setReviewComments] = useState([])
    const [err, setErr] = useState()
    const [commentBody, setCommentBody] = useState("")
    const [username, setUsername] = useState("")
    const [vote, setVote] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
           fetch(`https://alex-games.herokuapp.com/api/reviews/${review_id}`)
            .then((res) => res.json())
            .then(({review}) => {
                setReview(review)
                setIsLoading(false)
            });
            fetch(`https://alex-games.herokuapp.com/api/reviews/${review_id}/comments`)
            .then(function(response) {
                if (!response.ok){
                    throw Error(response.statusText);
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
    }, [review_id, vote, submitted]); 
   
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
        setSubmitted(true)
        e.preventDefault();
        axios
        .post(`https://alex-games.herokuapp.com/api/reviews/${review_id}/comments`, { "username": username, "body": commentBody})
        .then((res) => {
            setSubmitted(false)
            setCommentBody("")
            setUsername("")
        })
        .catch((err) => {
            console.log(err)
        })
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
        {(err) ? <p>No comments found...</p> : 
        <div>
        {reviewComments.map((comment) => {
            return (<div><button>-</button> {comment.votes} <button>+</button> {comment.body} - {comment.author}</div>)
        })}
        <div className="post-comment">
        </div>
        </div>   
    }
     <form onSubmit={onSubmitHandler}>
            <label for="comment">New comment:</label><br/>
            <textarea value={commentBody}name="commentbox" rows="10" cols="70" placeholder="comment here" onChange={(e) => setCommentBody(e.target.value)}></textarea><br/>
            <label for="username">Your username:</label><br/>
            <input value={username} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}></input><br/>
            <input type="submit" value="Submit"></input>
        </form>
    </div>
    </div>
)
};
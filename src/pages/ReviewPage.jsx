import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"


export default function ReviewPage() {
    const {review_id} = useParams()
    const [review, setReview] = useState({})
    const [reviewComments, setReviewComments] = useState([])
    const [err, setErr] = useState()

    useEffect(() => {
           fetch(`https://alex-games.herokuapp.com/api/reviews/${review_id}`)
            .then((res) => res.json())
            .then(({review}) => {
                setReview(review)
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
            })
            .catch((err) => {
                setErr(err)
            })
    }, [review_id]); 

    
    
return (
    <div>
    <div className="review-page">
        <p><button>-</button> votes: {review.votes} <button>+</button></p><img src={review.review_img_url}></img>
        <h2>{review.title} by {review.designer}</h2>
        <p>{review.review_body}</p>
        <p>Created at: {review.created_at} by {review.owner}</p>
    </div>
    <div className="comment-section">
        <h3>Comments</h3>
        {(err) ? <p>No comments found...</p> : 
        <div>
        {reviewComments.map((comment) => {
            return (<p><button>-</button> {comment.votes} <button>+</button> {comment.body} - {comment.author}</p>)
        })}
        </div>
           
    }
    </div>
    </div>
)
};
import { useState } from "react";
import "./Comment.css";
import CommentsForm from './CommentsForm.jsx';

export default function Comment() {
    let [comments, setComments] = useState([{
        username: "@sk",
        remarks: "Great job",
        rating: 4,
    }]);

    let addNewComment = (comment) => {
        setComments((currComments) => [...currComments, comment]);
    };

    return (
        <>
            <div>
                <h3>All Comments</h3>
                {
                    comments.map((comment, idx) => (
                        <div className="comment" key={idx}>
                            <span>- {comment.username}</span>
                            &nbsp;
                            <span>Rating : {comment.rating} <i className="fa-sharp fa-solid fa-star fa-xs"></i></span>
                            &nbsp;
                            <span>{comment.remarks}</span>
                        </div>
                    ))
                }
            </div>
            <hr />
            <CommentsForm addNewComment={addNewComment} />
        </>
    );
}

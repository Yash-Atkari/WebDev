import { useState } from "react";
import Score from "./Score";

export default function Quizzes({ quizzes, answers}) {
    let [score, setScore] = useState(0);
    let [showScore, setShowScore] = useState(false);
    let [answeredQues, SetAnsweredQues] = useState(Array(quizzes.length).fill(false));

    let handleInput = (event, idx) => {
        if(!answeredQues[idx]) {
            SetAnsweredQues((prev) => {
                const updated = [...prev];
                updated[idx] = true;
                return updated;
            });
        }

        if(event.target.value == answers[idx]) {
            setScore((currScore) => currScore + 1);
        }
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        setShowScore(true);
    }

    return (
        <div>
            {!showScore ? (
                <div>
                    {quizzes.map((quiz, idx) => (
                        <div key={idx}>
                            <h2>{quiz.ques}</h2>
                            <ol>
                                <li><button value={quiz.opt1} onClick={(event) => handleInput(event, idx)} disabled={answeredQues[idx]}>{quiz.opt1}</button></li>
                                <li><button value={quiz.opt2} onClick={(event) => handleInput(event, idx)} disabled={answeredQues[idx]}>{quiz.opt2}</button></li>
                                <li><button value={quiz.opt3} onClick={(event) => handleInput(event, idx)} disabled={answeredQues[idx]}>{quiz.opt3}</button></li>
                                <li><button value={quiz.opt4} onClick={(event) => handleInput(event, idx)} disabled={answeredQues[idx]}>{quiz.opt4}</button></li>
                            </ol>
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            ) : (
                <Score score={score} quizzes={quizzes} answers={answers}/>
            )}
        </div>
    );
}

import { useState } from "react";
import Quizzes from "./Quizzes";

export default function Score({ score, quizzes, answers}) {
    let [retakeQuiz, setRetakeQuiz] = useState(false);

    let handleInput = () => {
        setRetakeQuiz(true);
    }

    return (
        <div>
            {!retakeQuiz ? (
                <div>
                    <h2>Score: {score}</h2>
                    <button onClick={handleInput}>Retake Quiz</button>
                </div>
            ) : (
                <Quizzes quizzes={quizzes} answers={answers}/>
            )}
        </div>
    );
}

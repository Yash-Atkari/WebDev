import { useState } from "react";
import Quizzes from "./Quizzes";

export default function StartQuiz() {
    let [quizzes, setQuizzes] = useState([
        {
            ques: "What is the capital of France?",
            opt1: "Berlin",
            opt2: "Madrid",
            opt3: "Paris",
            opt4: "Rome",
        },
        {
            ques: "Which planet is known as the Red Planet?",
            opt1: "Earth",
            opt2: "Mars",
            opt3: "Jupiter",
            opt4: "Saturn",
        },
        {
            ques: "Who wrote 'To Kill a Mockingbird'?",
            opt1: "Harper Lee",
            opt2: "Mark Twain",
            opt3: "J.K. Rowling",
            opt4: "Jane Austen",
        },
        {
            ques: "What is the largest mammal?",
            opt1: "Elephant",
            opt2: "Giraffe",
            opt3: "Blue Whale",
            opt4: "Great White Shark",
        },
        {
            ques: "What is the smallest prime number?",
            opt1: "1",
            opt2: "2",
            opt3: "3",
            opt4: "5",
        }
    ]);

    let [answers, setAnswers] = useState(["Paris", "Mars", "Harper Lee", "Blue Whale", "2"]);
    let [showQuiz, setShowQuiz] = useState(false);

    let handleSubmit = (event) => {
        event.preventDefault();
        setShowQuiz(true);
    }

    return (
        <div>
            {!showQuiz ? (
                <form onSubmit={handleSubmit}>
                    <h2>Welcome to the Quiz App</h2>
                    <button type="submit">Start Quiz</button>
                </form>
            ) : (
                <Quizzes quizzes={quizzes} answers={answers} />
            )}
        </div>
    );
}

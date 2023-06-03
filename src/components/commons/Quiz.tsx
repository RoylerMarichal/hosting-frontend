import { useState, useEffect } from "react";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_CHALLANGES_BY_USER_BY_TOURNAMENT,
  SAVE_CHALLANGE_FOR_USER,
} from "../../utils/queries";
import { toast } from "react-toastify";

const Quiz = (props: { quiz: any }) => {
  //Global data
  useEffect(() => {
    localStorage.setItem("startTime", new Date().toISOString());
  }, []);
  const [bonusTime, setBonusTime] = useState(0);
  const [points, setPoints] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [correct, setCorrect] = useState<number[]>([]);
  const [quiz, setQuiz] = useState(props.quiz);
  const [questions, setQuestions] = useState(quiz.questions);
  console.log(questions);  
  const [question, setQuestion] = useState(questions[currentQuestion]);
  const [answers, setAnswers] = useState(JSON.parse(question.answers));
  const [correctAnswer, setCorrectAnswer] = useState(
    JSON.parse(question.correctAnswer)
  );
  const [explanation, setExplanation] = useState(question.explanation);
  const [messageForCorrectAnswer, setMessageForCorrectAnswer] = useState(
    question.messageForCorrectAnswer
  );
  const [messageForIncorrectAnswer, setMessageForIncorrectAnswer] = useState(
    question.messageForIncorrectAnswer
  );
  

  const { data: userChanllanges } = useQuery(
    GET_CHALLANGES_BY_USER_BY_TOURNAMENT,
    {
      variables: {
        tournamentId: parseInt(quiz.tournamentId),
      },
      onCompleted: (data) => {
        
        if (data?.getChallangeByUser.includes(quiz.id)) {
          toast.warning('Ya jugaste este desafío')
          setTimeout(() => {
            window.location.href = "/tournament/"+quiz.tournamentId;
          }, 3000); 
        }
      },
    }
  );
 
     //Points = Number of questions / 100
  const point = 100 / questions.length;
  const sixtyPercent = 60;

  const [questionType, setQuestionType] = useState(question.questionType);
  const [answerSelectionType, setAnswerSelectionType] = useState(
    question.answerSelectionType
  );

  //Quiz functions
  const handleAnswerOptionClick = (answerIndex: number) => {
    if (answerSelectionType === "single") {
      let sel = [answerIndex];
      setSelected(sel);
      selected.push(answerIndex);
    } else {
      if (selected.includes(answerIndex)) {
        setSelected(selected.filter((item: number) => item !== answerIndex));
      } else {
        setSelected([...selected, answerIndex]);
      }
    }
  };

  const compareArrayAnswers = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Sort the arrays
    arr1.sort();
    arr2.sort();

    // Check if all items exist and are in the same order
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    // Otherwise, return true
    return true;
  };

  const handleNextQuestionClick = () => {
    evaluatePrevAnswer();

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      console.log("currentQuestion1", currentQuestion);
      setQuestion(questions[nextQuestion]);
      setAnswers(JSON.parse(questions[nextQuestion].answers));
      setCorrectAnswer(JSON.parse(questions[nextQuestion].correctAnswer));
      setExplanation(questions[nextQuestion].explanation);
      setMessageForCorrectAnswer(
        questions[nextQuestion].messageForCorrectAnswer
      );
      setMessageForIncorrectAnswer(
        questions[nextQuestion].messageForIncorrectAnswer
      );

      setQuestionType(questions[nextQuestion].questionType);
      setAnswerSelectionType(questions[nextQuestion].answerSelectionType);
      setSelected([]);
      setCorrect([]);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartClick = () => {
    setPoints(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setSelected([]);
    setCorrect([]);
  };

  const handleBackClick = () => {
    const previousQuestion = currentQuestion - 1;
    if (previousQuestion >= 0) {
      setCurrentQuestion(previousQuestion);
      setQuestion(questions[previousQuestion]);
      setAnswers(JSON.parse(questions[previousQuestion].answers));
      setCorrectAnswer(questions[previousQuestion].correctAnswer);
      setExplanation(questions[previousQuestion].explanation);
      setMessageForCorrectAnswer(
        questions[previousQuestion].messageForCorrectAnswer
      );
      setMessageForIncorrectAnswer(
        questions[previousQuestion].messageForIncorrectAnswer
      );

      setQuestionType(questions[previousQuestion].questionType);
      setAnswerSelectionType(questions[previousQuestion].answerSelectionType);
      setSelected([]);
      setCorrect([]);
    }
  };

  const evaluatePrevAnswer = () => {
    if (answerSelectionType === "single") {
      if (selected[0] == correctAnswer) {
        setPoints(points + point);
      } else {
      }
    } else {
      let result = compareArrayAnswers(correctAnswer, selected);
      if (result) {
        setPoints(points + point);
      } else {
        console.log("false");
      }
    }
  };

  const handleFinishClick = () => {
   
    
    //evaluate bonus points
    let startTime = new Date(localStorage.getItem("startTime")!);
    let endTime = new Date();
    let timeDiff = endTime.getTime() - startTime.getTime();
    let seconds = timeDiff / 1000;
    let bonus = (props.quiz?.timeInMinutes * 60 - seconds) / 7;
    if (bonus < 0) {
      bonus = 0;
    }else{
      
    }
    
    setBonusTime(points > sixtyPercent ? bonus : 0);
    points > 60 && setBonusTime(bonus);
    evaluatePrevAnswer();
    saveChallangeForThisUser(points, bonus);
    setShowScore(true);
  };

  const [saveChallange, { data }] = useMutation(SAVE_CHALLANGE_FOR_USER, {
    variables: {
      challengeId: 0,
      playerId: null,
      points: 0,
      bonusTimePoints: 0,
    },
    onCompleted: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const saveChallangeForThisUser = (points: number, bonus: number) => {
    let payload = {
      challengeId: quiz.id,
      playerId: null,
      points: points,
      bonusTimePoints: points > sixtyPercent ? bonus : 0,
    };
  
    saveChallange({
      variables: payload,
    });
  };

  return (
    <div className="overflow-y-auto px-3 mt-3 mb-20 relative">
      {showScore ? (
        <div className="h-screen   rounded-3xl  flex">
          <div className="bg-blue-200 pb-20  h-[30%] w-full flex flex-col pt-14   rounded-3xl shadow-xl m-3 p-2">
            <span className="mx-auto subtitle">
              Su puntuación es
              <span className="bg-green-200 p-2 rounded-lg shadow-xl mx-3">
                {Number(points).toFixed(0)}
              </span>{" "}
              puntos de {Number(point * questions.length).toFixed(0)}
            </span>
            <hr className="mt-7 text-gray-700 bg-gray-100 h-0.5" />
            <br />
            <span className="mx-auto subtitle">
              Su bonificación por tiempo es
              <span className="bg-green-200 p-2 rounded-lg shadow-xl mx-3">
                {Number(bonusTime).toFixed(0)}
              </span>{" "}
            </span>

            <span className="mx-auto mt-20 subtitle">
              Total
              <span className="bg-green-200 p-2 rounded-lg shadow-xl mx-3">
                {Number(bonusTime + points).toFixed(2)}
              </span>{" "}
            </span>

            <Link className="btn-main w-20 px-3 mx-auto my-14" reloadDocument={true} to={"/tournament/"+quiz.tournamentId}>
              Finalizar
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex p-2 rounded-xl text-white shadow-xl  g-main justify-between">
            <div>
              <span>Pregunta {currentQuestion + 1}</span>/{questions.length}
            </div>
            <Timer
              handleFinishClick={ handleFinishClick}
              timeInMinutes={props.quiz?.timeInMinutes}
            />
          </div>
          <div className="question-text my-7 text-xl text-gray-700  ">
            {question.question}
          </div>
          <div className="answer-section flex flex-col">
            {answers.map((answer: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(index + 1)}
                className={`bg-gray-50 p-4 rounded-xl shadow-md my-3 ${
                  selected.includes(index + 1)
                    ? "bg-green-500 text-white font-bold"
                    : ""
                }`}
              >
                <span className="text-base font-medium"> {answer}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="navigation">
        {currentQuestion < questions.length - 1 && (
          <button
            className="btn-main bottom-[10%] left-[5%] lg:bottom-[10%] lg:left-[30%] fixed flex items-center"
            onClick={handleNextQuestionClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>

            <span>Siguiente</span>
          </button>
        )}

        {currentQuestion === questions.length - 1 && !showScore ? (
          <button
            className="btn-main bottom-[10%] left-[5%] lg:bottom-[10%] lg:left-[30%] fixed flex items-center cursor-pointer border-blue-600 border-2"
            onClick={handleFinishClick}
          >
            <span>Finalizar</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Quiz;

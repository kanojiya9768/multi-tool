"use client";
import React, { useState, useEffect } from "react";
import { Button } from "/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function TriviaQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScoreCard, setShowScoreCard] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      if (data.response_code !== 0) {
        throw new Error("No questions found");
      }
      setQuestions(data.results);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setScore(0);
      setShowScoreCard(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setShowScoreCard(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
        <p className="text-lg text-gray-500">No questions available.</p>
      </div>
    );
  }

  if (showScoreCard) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
        <Card className="w-full max-w-3xl p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Quiz Completed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg font-semibold">
              Your Score: {score} out of {questions.length}
            </p>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={index} className="border p-4 rounded">
                  <h3 className="text-xl font-semibold">
                    Question {index + 1}:
                  </h3>
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: q.question }}
                  />
                  <p className="mt-2 text-gray-700">
                    <strong>Correct Answer:</strong>{" "}
                    <span
                      dangerouslySetInnerHTML={{ __html: q.correct_answer }}
                    />
                  </p>
                </div>
              ))}
            </div>
            <Button
              onClick={fetchQuestions}
              variant="secondary"
              className="mt-4"
            >
              Restart Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const allOptions = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
      <Card className="w-full max-w-3xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold primary-text-gradient">
            Trivia Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold primary-text-gradient">
              Question {currentQuestionIndex + 1} of {questions.length}:
            </h3>
            <div
              className="text-lg primary-text-gradient"
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            />
          </div>
          <div className="space-y-2">
            {allOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleOptionClick(option)}
                variant={
                  selectedOption === option
                    ? option === currentQuestion.correct_answer
                      ? "success"
                      : "destructive"
                    : "outline"
                }
                className="w-full"
                disabled={selectedOption !== null}
              >
                <div dangerouslySetInnerHTML={{ __html: option }} />
              </Button>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Score: {score}</p>
            <Button
              onClick={handleNextQuestion}
              variant="secondary"
              disabled={selectedOption === null}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "Show Results"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

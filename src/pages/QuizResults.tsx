import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card/Card';
import { useAuth } from '../hooks/useAuth';

interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  points: number;
  explanation?: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  duration: number;
  totalPoints: number;
  passingScore: number;
  questions: QuizQuestion[];
  showCorrectAnswers: boolean;
  allowRetake: boolean;
}

interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  answers: { [questionId: string]: string | number };
  score: number;
  passed: boolean;
  timeSpent: number;
  attemptNumber: number;
}

const QuizResultsPage: React.FC = () => {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    // Load quiz data and user's latest attempt
    const loadData = () => {
      // Mock quiz data
      const mockQuiz: Quiz = {
        id: quizId || '1',
        title: 'JavaScript Fundamentals Quiz',
        description: 'Test your knowledge of JavaScript basics including variables, functions, and data types.',
        courseId: courseId || '1',
        courseName: 'Complete Web Development Bootcamp 2025',
        duration: 30,
        totalPoints: 100,
        passingScore: 70,
        showCorrectAnswers: true,
        allowRetake: true,
        questions: [
          {
            id: '1',
            type: 'multiple_choice',
            question: 'Which of the following is NOT a JavaScript data type?',
            options: ['string', 'boolean', 'integer', 'undefined'],
            correctAnswer: 2,
            points: 10,
            explanation: 'JavaScript has number data type, not integer. Integer is a subset of number.'
          },
          {
            id: '2',
            type: 'multiple_choice',
            question: 'What is the correct way to declare a variable in JavaScript?',
            options: ['var myVariable;', 'variable myVariable;', 'declare myVariable;', 'v myVariable;'],
            correctAnswer: 0,
            points: 10,
            explanation: 'Variables in JavaScript are declared using var, let, or const keywords.'
          },
          {
            id: '3',
            type: 'true_false',
            question: 'JavaScript is a statically typed language.',
            correctAnswer: 'false',
            points: 10,
            explanation: 'JavaScript is a dynamically typed language, meaning variables can hold different types of values.'
          },
          {
            id: '4',
            type: 'multiple_choice',
            question: 'Which method is used to add an element to the end of an array?',
            options: ['push()', 'add()', 'append()', 'insert()'],
            correctAnswer: 0,
            points: 10,
            explanation: 'The push() method adds one or more elements to the end of an array.'
          },
          {
            id: '5',
            type: 'short_answer',
            question: 'What does DOM stand for?',
            correctAnswer: 'Document Object Model',
            points: 15,
            explanation: 'DOM stands for Document Object Model, which represents the HTML document as a tree structure.'
          },
          {
            id: '6',
            type: 'multiple_choice',
            question: 'Which of the following is the correct way to write a JavaScript function?',
            options: [
              'function myFunction() {}',
              'def myFunction() {}',
              'function = myFunction() {}',
              'create myFunction() {}'
            ],
            correctAnswer: 0,
            points: 10,
            explanation: 'Functions in JavaScript are declared using the function keyword followed by the function name.'
          },
          {
            id: '7',
            type: 'true_false',
            question: 'The === operator checks for both value and type equality.',
            correctAnswer: 'true',
            points: 10,
            explanation: 'The === operator is the strict equality operator that checks both value and type.'
          },
          {
            id: '8',
            type: 'multiple_choice',
            question: 'What will be the output of: console.log(typeof null)?',
            options: ['null', 'undefined', 'object', 'boolean'],
            correctAnswer: 2,
            points: 15,
            explanation: 'This is a known quirk in JavaScript. typeof null returns "object" due to a legacy bug.'
          },
          {
            id: '9',
            type: 'short_answer',
            question: 'What is the difference between let and var?',
            correctAnswer: 'let has block scope, var has function scope',
            points: 20,
            explanation: 'let has block scope and cannot be redeclared in the same scope, while var has function scope and can be redeclared.'
          }
        ]
      };

      // Get user's latest attempt
      const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]') as QuizAttempt[];
      const userAttempts = attempts.filter(
        attempt => attempt.quizId === quizId && attempt.userId === user?.id
      );
      const latestAttempt = userAttempts.length > 0 
        ? userAttempts.reduce((latest, current) => 
            new Date(current.startTime) > new Date(latest.startTime) ? current : latest
          )
        : null;

      setQuiz(mockQuiz);
      setAttempt(latestAttempt);
      setLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [quizId, user, courseId]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const isCorrectAnswer = (question: QuizQuestion, userAnswer: string | number): boolean => {
    if (question.type === 'short_answer') {
      const correctAnswer = question.correctAnswer.toString().toLowerCase();
      const userAnswerString = userAnswer.toString().toLowerCase();
      return userAnswerString.includes(correctAnswer) || correctAnswer.includes(userAnswerString);
    }
    return userAnswer === question.correctAnswer;
  };

  const getAnswerText = (question: QuizQuestion, answer: string | number): string => {
    if (question.type === 'multiple_choice' && question.options) {
      const index = typeof answer === 'number' ? answer : parseInt(answer.toString());
      return question.options[index] || 'No answer';
    }
    if (question.type === 'true_false') {
      return answer.toString();
    }
    return answer.toString();
  };

  const percentage = attempt ? Math.round((attempt.score / quiz!.totalPoints) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!quiz || !attempt) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            No Results Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We couldn't find any quiz results for this attempt.
          </p>
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Back to Course
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <Card className="mb-6">
          <div className="text-center">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              attempt.passed 
                ? 'bg-green-100 dark:bg-green-900' 
                : 'bg-red-100 dark:bg-red-900'
            }`}>
              {attempt.passed ? (
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              ) : (
                <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {attempt.passed ? 'Congratulations!' : 'Keep Learning!'}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {attempt.passed 
                ? `You passed the ${quiz.title} with a score of ${percentage}%!`
                : `You scored ${percentage}% on the ${quiz.title}. You need ${quiz.passingScore}% to pass.`
              }
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {attempt.score}/{quiz.totalPoints}
                </div>
                <p className="text-gray-600 dark:text-gray-300">Points</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {percentage}%
                </div>
                <p className="text-gray-600 dark:text-gray-300">Score</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatTime(attempt.timeSpent)}
                </div>
                <p className="text-gray-600 dark:text-gray-300">Time Spent</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate(`/courses/${courseId}`)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Back to Course
              </button>
              
              {quiz.allowRetake && !attempt.passed && (
                <button
                  onClick={() => navigate(`/courses/${courseId}/quiz/${quizId}`)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Retake Quiz
                </button>
              )}
              
              {quiz.showCorrectAnswers && (
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {showAnswers ? 'Hide' : 'Show'} Correct Answers
                </button>
              )}
            </div>
          </div>
        </Card>

        {/* Detailed Results */}
        {showAnswers && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detailed Results
            </h2>
            
            <div className="space-y-6">
              {quiz.questions.map((question, index) => {
                const userAnswer = attempt.answers[question.id];
                const isCorrect = userAnswer !== undefined && isCorrectAnswer(question, userAnswer);
                
                return (
                  <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Question {index + 1}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          isCorrect 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {question.points} pts
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {question.question}
                    </p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Your Answer: </span>
                        <span className={`${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {userAnswer !== undefined ? getAnswerText(question, userAnswer) : 'No answer'}
                        </span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Correct Answer: </span>
                        <span className="text-green-600 dark:text-green-400">
                          {getAnswerText(question, question.correctAnswer)}
                        </span>
                      </div>
                      
                      {question.explanation && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-3">
                          <span className="font-medium text-blue-800 dark:text-blue-200">Explanation: </span>
                          <span className="text-blue-700 dark:text-blue-300">{question.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizResultsPage;

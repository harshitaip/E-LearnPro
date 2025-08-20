 import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../components/Card/Card';
import { useAuth } from '../hooks/useAuth';
import '../styles/quiz.css';

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
  duration: number; // in minutes
  totalPoints: number;
  passingScore: number; // percentage
  questions: QuizQuestion[];
  attempts: number;
  timeLimit: boolean;
  randomizeQuestions: boolean;
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
  timeSpent: number; // in seconds
  attemptNumber: number;
}

const QuizPage: React.FC = () => {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string | number }>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load quiz data
  useEffect(() => {
    // Mock quiz data - in real app this would come from API
    const loadQuiz: Quiz = {
      id: quizId || '1',
      title: 'JavaScript Fundamentals Quiz',
      description: 'Test your knowledge of JavaScript basics including variables, functions, and data types.',
      courseId: courseId || '1',
      courseName: 'Complete Web Development Bootcamp 2025',
      duration: 30,
      totalPoints: 100,
      passingScore: 70,
      attempts: 3,
      timeLimit: true,
      randomizeQuestions: false,
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
    
    // Simulate API call
    setTimeout(() => {
      setQuiz(loadQuiz);
      setLoading(false);
    }, 1000);
  }, [courseId, quizId]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && quiz && quiz.timeLimit && timeRemaining !== null && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev && prev <= 1) {
            // Submit quiz when time runs out - simplified version
            setQuizCompleted(true);
            toast.warning('Time\'s up! Quiz submitted automatically.');
            return 0;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [quizStarted, quiz, timeRemaining]); // Simplified dependencies

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    if (quiz?.timeLimit) {
      setTimeRemaining(quiz.duration * 60); // Convert minutes to seconds
    }
    toast.success('Quiz started! Good luck!');
  };

  const handleAnswerChange = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = (): { score: number; totalPoints: number; passed: boolean } => {
    if (!quiz) return { score: 0, totalPoints: 0, passed: false };

    let earnedPoints = 0;
    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer !== undefined) {
        if (question.type === 'short_answer') {
          // Simple string comparison for short answers (in real app, this would be more sophisticated)
          const correctAnswer = question.correctAnswer.toString().toLowerCase();
          const userAnswerString = userAnswer.toString().toLowerCase();
          if (userAnswerString.includes(correctAnswer) || correctAnswer.includes(userAnswerString)) {
            earnedPoints += question.points;
          }
        } else if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points;
        }
      }
    });

    const percentage = (earnedPoints / quiz.totalPoints) * 100;
    return {
      score: earnedPoints,
      totalPoints: quiz.totalPoints,
      passed: percentage >= quiz.passingScore
    };
  };

  const handleSubmitQuiz = async () => {
    if (!quiz || !user) return;

    setSubmitting(true);
    
    try {
      const result = calculateScore();
      
      // Create quiz attempt record
      const quizAttempt: QuizAttempt = {
        id: crypto.randomUUID(),
        quizId: quiz.id,
        userId: user.id,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        answers,
        score: result.score,
        passed: result.passed,
        timeSpent: quiz.timeLimit ? (quiz.duration * 60) - (timeRemaining || 0) : 0,
        attemptNumber: 1
      };

      // Save to localStorage (in real app, this would be sent to backend)
      const existingAttempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
      existingAttempts.push(quizAttempt);
      localStorage.setItem('quizAttempts', JSON.stringify(existingAttempts));

      setQuizCompleted(true);
      
      if (result.passed) {
        toast.success(`Congratulations! You passed with ${Math.round((result.score / result.totalPoints) * 100)}%`);
      } else {
        toast.error(`You scored ${Math.round((result.score / result.totalPoints) * 100)}%. You need ${quiz.passingScore}% to pass.`);
      }

      // Navigate to results page after a delay
      setTimeout(() => {
        navigate(`/courses/${courseId}/quiz/${quizId}/results`);
      }, 3000);

    } catch (err) {
      console.error('Failed to submit quiz:', err);
      toast.error('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentQuestion = quiz?.questions[currentQuestionIndex];
  const progress = quiz ? ((currentQuestionIndex + 1) / quiz.questions.length) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quiz Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The quiz you're looking for could not be found.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Go Back
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!quizStarted && !quizCompleted && (
          <Card>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {quiz.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {quiz.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                <div className="space-y-2">
                  <p><strong>Course:</strong> {quiz.courseName}</p>
                  <p><strong>Questions:</strong> {quiz.questions.length}</p>
                  <p><strong>Total Points:</strong> {quiz.totalPoints}</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Passing Score:</strong> {quiz.passingScore}%</p>
                  <p><strong>Time Limit:</strong> {quiz.timeLimit ? `${quiz.duration} minutes` : 'No limit'}</p>
                  <p><strong>Attempts Allowed:</strong> {quiz.attempts}</p>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Instructions:</h3>
                <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                  <li>• Read each question carefully before answering</li>
                  <li>• You can navigate between questions using the Previous/Next buttons</li>
                  <li>• All answers are automatically saved</li>
                  {quiz.timeLimit && <li>• You have {quiz.duration} minutes to complete the quiz</li>}
                  <li>• Click "Submit Quiz" when you're finished</li>
                </ul>
              </div>

              <button
                onClick={handleStartQuiz}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Quiz
              </button>
            </div>
          </Card>
        )}

        {quizStarted && !quizCompleted && currentQuestion && (
          <>
            {/* Quiz Header */}
            <Card className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {quiz.title}
                </h1>
                {quiz.timeLimit && timeRemaining !== null && (
                  <div className={`text-lg font-semibold ${
                    timeRemaining < 300 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    Time: {formatTime(timeRemaining)}
                  </div>
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300 progress-bar"
                    data-progress={Math.round(progress)}
                  ></div>
                </div>
              </div>
            </Card>

            {/* Question Card */}
            <Card className="mb-6">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentQuestion.question}
                  </h2>
                  <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm font-medium">
                    {currentQuestion.points} points
                  </span>
                </div>

                {/* Question Options */}
                <div className="space-y-3">
                  {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <label key={`${currentQuestion.id}-${index}-${option}`} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <input
                            type="radio"
                            name={currentQuestion.id}
                            value={index}
                            checked={answers[currentQuestion.id] === index}
                            onChange={(e) => handleAnswerChange(currentQuestion.id, parseInt(e.target.value))}
                            className="mr-3 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-gray-900 dark:text-white">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === 'true_false' && (
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value="true"
                          checked={answers[currentQuestion.id] === 'true'}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="mr-3 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-900 dark:text-white">True</span>
                      </label>
                      <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value="false"
                          checked={answers[currentQuestion.id] === 'false'}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="mr-3 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-900 dark:text-white">False</span>
                      </label>
                    </div>
                  )}

                  {currentQuestion.type === 'short_answer' && (
                    <textarea
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      placeholder="Type your answer here..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  )}
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
              >
                Previous
              </button>

              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-8 py-2 rounded-lg transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}

        {quizCompleted && (
          <Card className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Quiz Completed!
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your quiz has been submitted successfully. Redirecting to results...
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizPage;

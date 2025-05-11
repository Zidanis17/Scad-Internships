import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

// Dummy assessment data
const dummyAssessments = [
  {
    id: 1,
    name: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics, including variables, functions, and control flow.',
    duration: '30 minutes',
    questionsCount: 25,
    difficulty: 'Intermediate'
  },
  {
    id: 2,
    name: 'React Developer Assessment',
    description: 'Evaluate your React skills, including components, hooks, and state management.',
    duration: '45 minutes',
    questionsCount: 30,
    difficulty: 'Advanced'
  },
  {
    id: 3,
    name: 'SQL Basics',
    description: 'Test your understanding of SQL queries, joins, and database concepts.',
    duration: '25 minutes',
    questionsCount: 20,
    difficulty: 'Beginner'
  },
  {
    id: 4,
    name: 'Python Programming',
    description: 'Assess your Python programming skills, including syntax, data structures, and functions.',
    duration: '40 minutes',
    questionsCount: 30,
    difficulty: 'Intermediate'
  },
  {
    id: 5,
    name: 'Web Accessibility',
    description: 'Test your knowledge of web accessibility principles and WCAG guidelines.',
    duration: '20 minutes',
    questionsCount: 15,
    difficulty: 'Intermediate'
  }
];

// Dummy completed assessments
const dummyCompletedAssessments = [
  {
    id: 1,
    assessmentId: 2,
    name: 'React Developer Assessment',
    score: 92,
    date: '2025-04-01',
    isPublic: true
  },
  {
    id: 2,
    assessmentId: 1,
    name: 'JavaScript Fundamentals',
    score: 85,
    date: '2025-03-15',
    isPublic: true
  }
];

const Assessments = () => {
  const [availableAssessments, setAvailableAssessments] = useState([]);
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  
  // Mock questions for the selected assessment
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAvailableAssessments(dummyAssessments);
      setCompletedAssessments(dummyCompletedAssessments);
      setIsLoading(false);
    }, 500);
  }, []);
  
  const handleStartAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    
    // Generate mock questions for this assessment
    const mockQuestions = generateMockQuestions(assessment);
    setQuestions(mockQuestions);
    setCurrentQuestion(0);
    setAnswers({});
    setAssessmentComplete(false);
    setIsAssessmentModalOpen(true);
  };
  
  const generateMockQuestions = (assessment) => {
    // Generate mock questions based on the assessment type
    const questionCount = assessment.questionsCount > 5 ? 5 : assessment.questionsCount;
    const mockQuestions = [];
    
    for (let i = 0; i < questionCount; i++) {
      let questionText = '';
      let options = [];
      
      if (assessment.name.includes('JavaScript')) {
        questionText = generateJSQuestion(i);
        options = generateJSOptions(i);
      } else if (assessment.name.includes('React')) {
        questionText = generateReactQuestion(i);
        options = generateReactOptions(i);
      } else if (assessment.name.includes('SQL')) {
        questionText = generateSQLQuestion(i);
        options = generateSQLOptions(i);
      } else if (assessment.name.includes('Python')) {
        questionText = generatePythonQuestion(i);
        options = generatePythonOptions(i);
      } else {
        questionText = generateWebAccessibilityQuestion(i);
        options = generateWebAccessibilityOptions(i);
      }
      
      mockQuestions.push({
        id: i + 1,
        question: questionText,
        options: options,
        correctAnswer: Math.floor(Math.random() * options.length) // Random correct answer for demo
      });
    }
    
    return mockQuestions;
  };
  
  const generateJSQuestion = (index) => {
    const questions = [
      'What is the output of: console.log(typeof undefined)?',
      'Which method adds elements to the end of an array?',
      'What does the === operator do?',
      'How do you declare a constant variable in JavaScript?',
      'What is a closure in JavaScript?'
    ];
    return questions[index % questions.length];
  };
  
  const generateJSOptions = (index) => {
    const allOptions = [
      ['undefined', 'object', 'string', 'null'],
      ['push()', 'pop()', 'shift()', 'unshift()'],
      ['Checks value only', 'Checks value and type', 'Assigns a value', 'None of these'],
      ['const x = 5;', 'let x = 5;', 'var x = 5;', 'x = 5;'],
      ['A function that returns another function', 'A function with no parameters', 'A function with access to variables in its outer scope', 'A function that throws an error']
    ];
    return allOptions[index % allOptions.length];
  };
  
  const generateReactQuestion = (index) => {
    const questions = [
      'What hook is used to perform side effects in function components?',
      'What is the virtual DOM?',
      'How do you pass data from parent to child components?',
      'What is the purpose of the key prop when rendering lists?',
      'What is the React context API used for?'
    ];
    return questions[index % questions.length];
  };
  
  const generateReactOptions = (index) => {
    const allOptions = [
      ['useState', 'useEffect', 'useReducer', 'useContext'],
      ['A copy of the real DOM', 'A slow version of the DOM', 'A server-side DOM implementation', 'A JavaScript object representation of the DOM'],
      ['Using props', 'Using state', 'Using context', 'Using Redux'],
      ['To style elements', 'To help React identify changed elements', 'To add event listeners', 'To improve SEO'],
      ['Global styling', 'State management across components without prop drilling', 'Form validation', 'API fetching']
    ];
    return allOptions[index % allOptions.length];
  };
  
  const generateSQLQuestion = (index) => {
    const questions = [
      'Which SQL command is used to retrieve data from a database?',
      'What does JOIN do in SQL?',
      'What is a primary key?',
      'Which SQL function returns the number of rows in a table?',
      'What is the difference between DELETE and TRUNCATE?'
    ];
    return questions[index % questions.length];
  };
  
  const generateSQLOptions = (index) => {
    const allOptions = [
      ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
      ['Combines rows from different tables', 'Separates tables', 'Creates new tables', 'None of these'],
      ['A column that uniquely identifies each row', 'A column that allows NULL values', 'A column that can be duplicated', 'A foreign key reference'],
      ['COUNT(*)', 'SUM()', 'AVG()', 'MAX()'],
      ['DELETE removes specific rows, TRUNCATE removes all rows', 'They are identical', 'DELETE is faster', 'TRUNCATE can target specific rows']
    ];
    return allOptions[index % allOptions.length];
  };
  
  const generatePythonQuestion = (index) => {
    const questions = [
      'Which of the following is a correct way to create a list in Python?',
      'What does the len() function do?',
      'How do you define a function in Python?',
      'What is the output of: print(2**3)?',
      'What does the import keyword do?'
    ];
    return questions[index % questions.length];
  };
  
  const generatePythonOptions = (index) => {
    const allOptions = [
      ['my_list = []', 'my_list = list()', 'my_list = {}', 'Both A and B'],
      ['Returns the last element', 'Returns the number of elements', 'Returns the first element', 'Returns the largest element'],
      ['function name():', 'def name():', 'define name():', 'func name():'],
      ['6', '8', '5', '9'],
      ['Creates a new variable', 'Brings in modules to use in your code', 'Exports your code', 'Prints variables']
    ];
    return allOptions[index % allOptions.length];
  };
  
  const generateWebAccessibilityQuestion = (index) => {
    const questions = [
      'What does WCAG stand for?',
      'Which HTML attribute provides alternative text for images?',
      'What is the purpose of ARIA landmarks?',
      'Why is color contrast important for accessibility?',
      'What is the recommended minimum contrast ratio for text?'
    ];
    return questions[index % questions.length];
  };
  
  const generateWebAccessibilityOptions = (index) => {
    const allOptions = [
      ['Web Content Accessibility Guidelines', 'World Code Access Group', 'Web Compliance Assurance Guidelines', 'Wide Content Access Group'],
      ['alt', 'title', 'src', 'href'],
      ['To add visual styles', 'To help screen readers identify page regions', 'To improve SEO', 'To handle events'],
      ['For visual appeal', 'For branding consistency', 'To help users with visual impairments', 'All of the above'],
      ['2:1', '3:1', '4.5:1', '7:1']
    ];
    return allOptions[index % allOptions.length];
  };
  
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const completeAssessment = () => {
    // Calculate score based on correct answers
    let correctCount = 0;
    
    Object.keys(answers).forEach(questionIndex => {
      const question = questions[questionIndex];
      if (answers[questionIndex] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / questions.length) * 100);
    setAssessmentScore(score);
    setAssessmentComplete(true);
  };
  
  const handleSaveAssessment = () => {
    // Add assessment to completed list
    const newCompletedAssessment = {
      id: completedAssessments.length + 1,
      assessmentId: selectedAssessment.id,
      name: selectedAssessment.name,
      score: assessmentScore,
      date: new Date().toISOString().split('T')[0],
      isPublic: isPublic
    };
    
    setCompletedAssessments([...completedAssessments, newCompletedAssessment]);
    setIsAssessmentModalOpen(false);
  };
  
  const handleToggleVisibility = (assessmentId) => {
    setCompletedAssessments(
      completedAssessments.map(assessment => 
        assessment.id === assessmentId 
          ? { ...assessment, isPublic: !assessment.isPublic } 
          : assessment
      )
    );
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Available Assessments</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableAssessments.map(assessment => (
              <div key={assessment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{assessment.name}</h3>
                <p className="text-gray-600 mb-4">{assessment.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Duration: {assessment.duration}</span>
                  <span>Questions: {assessment.questionsCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    assessment.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    assessment.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {assessment.difficulty}
                  </span>
                  <Button 
                    onClick={() => handleStartAssessment(assessment)}
                    disabled={completedAssessments.some(ca => ca.assessmentId === assessment.id)}
                  >
                    {completedAssessments.some(ca => ca.assessmentId === assessment.id) ? 'Completed' : 'Start Assessment'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Completed Assessments</h2>
          </div>
          
          {completedAssessments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Completed</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visibility</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {completedAssessments.map((assessment) => (
                    <tr key={assessment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{assessment.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          assessment.score >= 90 ? 'bg-green-100 text-green-800' :
                          assessment.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {assessment.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{assessment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {assessment.isPublic ? 'Public on Profile' : 'Private'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          onClick={() => handleToggleVisibility(assessment.id)}
                          variant={assessment.isPublic ? 'secondary' : 'primary'}
                          size="small"
                        >
                          {assessment.isPublic ? 'Make Private' : 'Make Public'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              You haven't completed any assessments yet. Start an assessment to see your results here.
            </div>
          )}
        </div>
      </div>
      
      {/* Assessment Modal */}
      <Modal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        title={selectedAssessment ? selectedAssessment.name : ''}
        size="large"
      >
        {selectedAssessment && !assessmentComplete ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-medium">Question {currentQuestion + 1} of {questions.length}</p>
              <p className="text-gray-500">{selectedAssessment.difficulty} Level</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-xl">{questions[currentQuestion]?.question}</p>
            </div>
            
            <div className="space-y-3">
              {questions[currentQuestion]?.options.map((option, optionIndex) => (
                <div 
                  key={optionIndex}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestion] === optionIndex 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestion, optionIndex)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                      answers[currentQuestion] === optionIndex 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion] === optionIndex && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <span className="ml-3">{option}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                onClick={handlePrevQuestion} 
                variant="secondary"
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button 
                onClick={handleNextQuestion}
                disabled={answers[currentQuestion] === undefined}
              >
                {currentQuestion < questions.length - 1 ? 'Next' : 'Complete Assessment'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
              <span className="text-3xl font-bold text-blue-600">{assessmentScore}%</span>
            </div>
            
            <h3 className="text-2xl font-semibold">Assessment Complete!</h3>
            
            <p className="text-gray-600">
              {assessmentScore >= 90 ? 'Excellent job! You have mastered this topic.' :
               assessmentScore >= 70 ? 'Good job! You have a solid understanding of this topic.' :
               'You might need some more practice with this topic.'}
            </p>
            
            <div className="py-4">
              <div className="flex items-center justify-center space-x-2">
                <input
                  type="checkbox"
                  id="makePublic"
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="makePublic">Show this assessment on my public profile</label>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button onClick={handleSaveAssessment}>
                Save Result
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Assessments;
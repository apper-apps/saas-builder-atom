import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const QuestionnaireCard = ({ onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const questions = [
    {
      id: 1,
      text: "Do you prioritize rapid development and time-to-market?",
      description: "Consider how quickly you need to launch your SaaS product"
    },
    {
      id: 2,
      text: "Is scalability a primary concern for your application?",
      description: "Think about your expected user growth and performance needs"
    },
    {
      id: 3,
      text: "Do you need extensive customization capabilities?",
      description: "Consider if you'll need to modify core functionality significantly"
    }
  ];

  const answerOptions = [
    { value: 'yes', label: 'Yes', icon: 'Check', color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50' },
    { value: 'maybe', label: 'Maybe', icon: 'HelpCircle', color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50' },
    { value: 'no', label: 'No', icon: 'X', color: 'from-red-500 to-pink-600', bgColor: 'bg-red-50' }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const hasAnsweredCurrent = selectedAnswers[currentQuestion.id];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    toast.success(`Answer "${answer}" selected`);
  };

  const handleNext = () => {
    if (!hasAnsweredCurrent) {
      toast.warning("Please select an answer before continuing");
      return;
    }
    
    if (isLastQuestion) {
      toast.success("Questionnaire completed! Proceeding to comparisons...");
      onComplete(selectedAnswers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      toast.info(`Question ${currentQuestionIndex + 2} of ${questions.length}`);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (isLastQuestion) {
      const answeredQuestions = Object.keys(selectedAnswers).length;
      if (answeredQuestions === 0) {
        toast.warning("Please answer at least one question to continue");
        return;
      }
      toast.success("Questionnaire completed! Proceeding to comparisons...");
      onComplete(selectedAnswers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      toast.info(`Skipped to question ${currentQuestionIndex + 2} of ${questions.length}`);
    }
  };
return (
    <div className="questionnaire-container">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Current Question */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="questionnaire-card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentQuestion.text}
            </h3>
            <p className="text-sm text-gray-600">
              {currentQuestion.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {answerOptions.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.value)}
                className={`answer-option ${
                  selectedAnswers[currentQuestion.id] === option.value 
                    ? 'answer-option-selected' 
                    : 'answer-option-unselected'
                } ${option.bgColor}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center mb-3`}>
                  <ApperIcon name={option.icon} size={20} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">{option.label}</span>
                {selectedAnswers[currentQuestion.id] === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <ApperIcon name="CheckCircle" size={16} className="text-green-600" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>
      
      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center space-x-3">
          {!isFirstQuestion && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="ArrowLeft" size={16} />
              <span>Previous</span>
            </Button>
          )}
          
          <Button
            onClick={handleSkip}
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
          >
            Skip Question
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500">
            {Object.keys(selectedAnswers).length} of {questions.length} answered
          </div>
          
          <Button
            onClick={handleNext}
            variant={isLastQuestion ? "success" : "primary"}
            size="lg"
            className="flex items-center space-x-2"
          >
            <span>
              {isLastQuestion ? "Complete Questionnaire" : "Next Question"}
            </span>
            <ApperIcon 
              name={isLastQuestion ? "CheckCircle" : "ArrowRight"} 
              size={16} 
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCard;
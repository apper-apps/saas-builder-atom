import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const QuestionnaireCard = ({ onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
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

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    toast.success(`Answer "${answer}" selected`);
  };

  const handleSubmit = () => {
    const answeredQuestions = Object.keys(selectedAnswers).length;
    if (answeredQuestions < questions.length) {
      toast.warning(`Please answer all ${questions.length} questions to continue`);
      return;
    }
    
    toast.success("Questionnaire completed! Proceeding to comparisons...");
    onComplete(selectedAnswers);
  };

  const canSubmit = Object.keys(selectedAnswers).length === questions.length;

  return (
    <div className="questionnaire-container">
      <div className="space-y-8">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="questionnaire-card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {question.text}
                </h3>
                <p className="text-sm text-gray-600">
                  {question.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {answerOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleAnswerSelect(question.id, option.value)}
                    className={`answer-option ${
                      selectedAnswers[question.id] === option.value 
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
                    {selectedAnswers[question.id] === option.value && (
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
        ))}
        
        <div className="text-center mt-8">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            variant="primary"
            size="lg"
            className="flex items-center space-x-2"
          >
            <ApperIcon name="ArrowRight" size={20} />
            <span>Continue to Comparisons</span>
          </Button>
          
          <div className="mt-4 text-sm text-gray-500">
            {Object.keys(selectedAnswers).length} of {questions.length} questions answered
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCard;
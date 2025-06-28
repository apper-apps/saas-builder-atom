import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ProgressBar = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  stepLabels = ['Priorities', 'Assessment', 'Comparison', 'Recommendation'],
  className = '' 
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (stepNumber, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'current') return 'Circle';
    return 'Circle';
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Line Container */}
      <div className="relative mb-8">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded-full transform -translate-y-1/2" />
        
        {/* Progress Line */}
        <motion.div
          className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transform -translate-y-1/2"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const status = getStepStatus(stepNumber);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            
            return (
              <motion.div
                key={stepNumber}
                className="flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Step Circle */}
                <motion.div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center relative z-10
                    ${isCompleted 
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg' 
                      : isCurrent 
                        ? 'bg-white border-4 border-primary-500 text-primary-600 shadow-lg' 
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }
                  `}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {isCompleted ? (
                    <ApperIcon name="Check" size={16} />
                  ) : (
                    <span className="text-sm font-bold">{stepNumber}</span>
                  )}
                </motion.div>

                {/* Step Label */}
                <motion.div
                  className={`
                    mt-3 text-sm font-medium text-center px-2
                    ${isCurrent ? 'text-primary-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'}
                  `}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {stepLabels[index]}
                </motion.div>

                {/* Current Step Pulse */}
                {isCurrent && (
                  <motion.div
                    className="absolute w-10 h-10 rounded-full border-2 border-primary-300"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="text-center">
        <motion.p
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
        </motion.p>
        
        <motion.div
          className="mt-2 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {Math.round(progressPercentage)}% Complete
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Error = ({ message = "Something went wrong", onRetry, showRetry = true }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      >
        <ApperIcon name="AlertCircle" size={32} className="text-red-500" />
      </motion.div>
      
      <motion.h3
        className="text-lg font-semibold text-gray-900 mb-2 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Oops! Something went wrong
      </motion.h3>
      
      <motion.p
        className="text-gray-600 text-center mb-6 max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>
      
      {showRetry && onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onRetry}
            variant="primary"
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" size={16} />
            <span>Try Again</span>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Error;
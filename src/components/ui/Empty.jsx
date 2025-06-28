import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Empty = ({ 
  title = "No data available", 
  message = "Get started by selecting your priorities above.",
  actionText = "Get Started",
  onAction,
  icon = "Search"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
      >
        <ApperIcon name={icon} size={40} className="text-primary-500" />
      </motion.div>
      
      <motion.h3
        className="text-xl font-bold text-gray-900 mb-3 text-center gradient-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      
      <motion.p
        className="text-gray-600 text-center mb-8 max-w-md leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>
      
      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onAction}
            variant="primary"
            size="lg"
            className="flex items-center space-x-2 shadow-elevated"
          >
            <ApperIcon name="ArrowRight" size={18} />
            <span>{actionText}</span>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;
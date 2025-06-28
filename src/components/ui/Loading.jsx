import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Loading = ({ message = "Loading...", variant = "default" }) => {
  if (variant === "priorities") {
    return (
      <div className="space-y-4">
        {[...Array(7)].map((_, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-5 h-5 bg-surface-200 rounded animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-surface-200 rounded animate-pulse mb-1"></div>
              <div className="h-3 bg-surface-100 rounded animate-pulse w-3/4"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "comparisons") {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="h-6 bg-surface-200 rounded animate-pulse mb-4 w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-4 bg-surface-100 rounded animate-pulse"></div>
              <div className="h-4 bg-surface-100 rounded animate-pulse"></div>
              <div className="h-4 bg-surface-100 rounded animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <ApperIcon name="Loader2" size={32} className="text-primary-500" />
      </motion.div>
      <motion.p 
        className="text-gray-600 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default Loading;
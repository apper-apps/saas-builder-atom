import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Header = () => {
  return (
    <motion.header
      className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <motion.div
            className="flex items-center justify-center space-x-3 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ApperIcon name="Compass" size={24} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display">
              SaaS Builder Compass
            </h1>
          </motion.div>
          
          <motion.p
            className="text-xl text-primary-100 mb-6 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            🛣️ Feature-Based Roadmap: Find Your Ideal SaaS Builder
          </motion.p>
          
          <motion.div
            className="text-lg text-primary-50 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Interactive Apper VS Lovable comparison tool that guides you through personalized 
            feature analysis to help you choose the perfect SaaS building platform for your needs.
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
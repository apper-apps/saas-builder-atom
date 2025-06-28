import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gray-900 text-white mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Compass" size={24} className="text-primary-400" />
              <span className="text-xl font-bold">SaaS Builder Compass</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your guide to choosing between Apper and Lovable based on your specific 
              project requirements and priorities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Full Comparison Table
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Watch Apper Demo
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Try Apper Free
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Talk to a Specialist
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Check" size={16} className="text-green-400" />
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Check" size={16} className="text-green-400" />
                <span>Side-by-side comparisons</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Check" size={16} className="text-green-400" />
                <span>Priority-based analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Check" size={16} className="text-green-400" />
                <span>Expert recommendations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} SaaS Builder Compass. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
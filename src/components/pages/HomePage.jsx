import { motion } from 'framer-motion';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import ComparisonWizard from '@/components/organisms/ComparisonWizard';

const HomePage = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ComparisonWizard />
        </motion.div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default HomePage;
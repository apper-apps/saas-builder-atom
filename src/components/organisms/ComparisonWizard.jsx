import { motion } from 'framer-motion';
import { useComparison } from '@/hooks/useComparison';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import PrioritySelector from '@/components/molecules/PrioritySelector';
import ComparisonTable from '@/components/molecules/ComparisonTable';
import RecommendationCard from '@/components/molecules/RecommendationCard';

const ComparisonWizard = () => {
  const {
    priorities,
    selectedPriorities,
    comparisons,
    recommendation,
    currentStep,
    loading,
    error,
    togglePriority,
    continueToStep,
    resetComparison,
    retry,
    canContinue
  } = useComparison();

  const handleContinue = async () => {
    if (!canContinue) {
      toast.error("Please select at least one priority to continue");
      return;
    }
    
    try {
      await continueToStep(currentStep + 1);
      toast.success("Loading your personalized comparison...");
    } catch (err) {
      toast.error("Failed to continue. Please try again.");
    }
  };

  const handleReset = () => {
    resetComparison();
    toast.info("Comparison reset. Start fresh!");
  };

  if (error) {
    return <Error message={error} onRetry={retry} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Step 1: Priority Selection */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-white to-primary-50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              🔽 Step 1: What matters most to you?
            </h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            Check one or more priorities that are important for your SaaS project:
          </p>

          {loading && currentStep === 1 ? (
            <Loading variant="priorities" message="Loading priorities..." />
          ) : priorities.length === 0 ? (
            <Empty 
              title="No priorities available"
              message="Unable to load priority options."
              icon="AlertCircle"
              onAction={retry}
              actionText="Retry"
            />
          ) : (
            <PrioritySelector
              priorities={priorities}
              selectedPriorities={selectedPriorities}
              onTogglePriority={togglePriority}
            />
          )}

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {selectedPriorities.length} of {priorities.length} selected
            </div>
            <Button
              onClick={handleContinue}
              disabled={!canContinue || loading}
              variant="success"
              className="flex items-center space-x-2"
            >
              <span>🟢 Continue</span>
              <ApperIcon name="ArrowRight" size={16} />
            </Button>
          </div>
        </Card>
      </motion.section>

      {/* Step 2: Comparisons */}
      {currentStep >= 2 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-white to-secondary-50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                🔽 Step 2: Based on your needs, here's how they compare
              </h2>
            </div>

            {loading && currentStep === 2 ? (
              <Loading variant="comparisons" message="Analyzing your priorities..." />
            ) : comparisons.length === 0 ? (
              <Empty 
                title="No comparisons available"
                message="Please select priorities in Step 1 to see comparisons."
                icon="BarChart3"
                onAction={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                actionText="Go to Step 1"
              />
            ) : (
              <div className="space-y-6">
                {comparisons.map((comparison, index) => (
                  <motion.div
                    key={comparison.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ComparisonTable comparison={comparison} />
                  </motion.div>
                ))}
                
                <div className="text-center mt-8">
                  <Button
                    onClick={() => continueToStep(3)}
                    variant="primary"
                    size="lg"
                    className="flex items-center space-x-2"
                  >
                    <ApperIcon name="Brain" size={20} />
                    <span>🧠 Get My Recommendation</span>
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.section>
      )}

      {/* Step 3: Recommendation */}
      {currentStep >= 3 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {loading && currentStep === 3 ? (
            <Loading message="Generating your personalized recommendation..." />
          ) : recommendation ? (
            <RecommendationCard 
              recommendation={recommendation} 
              onReset={handleReset}
            />
          ) : (
            <Empty 
              title="Recommendation not available"
              message="Unable to generate recommendation. Please try again."
              icon="AlertTriangle"
              onAction={retry}
              actionText="Try Again"
            />
          )}
        </motion.section>
      )}

      {/* Section Dividers */}
      {currentStep >= 2 && <div className="section-divider"></div>}
    </div>
  );
};

export default ComparisonWizard;
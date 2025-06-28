import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const RecommendationCard = ({ recommendation, onReset }) => {
  const getRecommendationIcon = (winner) => {
    switch (winner) {
      case 'apper':
        return 'Trophy';
      case 'lovable':
        return 'Award';
      default:
        return 'Scale';
    }
  };

  const getRecommendationColor = (winner) => {
    switch (winner) {
      case 'apper':
        return 'success';
      case 'lovable':
        return 'info';
      default:
        return 'primary';
    }
  };

  const getConfidenceBadge = (confidence) => {
    const variants = {
      high: 'success',
      medium: 'warning',
      low: 'error'
    };
    return <Badge variant={variants[confidence]} animate>{confidence.toUpperCase()} CONFIDENCE</Badge>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-white to-surface-50 border-2 border-primary-200">
        <div className="text-center mb-6">
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <ApperIcon 
              name={getRecommendationIcon(recommendation.winner)} 
              size={32} 
              className="text-white" 
            />
          </motion.div>
          
          <motion.h2
            className="text-2xl font-bold gradient-text mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Which Tool is Right for You?
          </motion.h2>
          
          <motion.div
            className="flex items-center justify-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {getConfidenceBadge(recommendation.confidence)}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{recommendation.apperWins}</div>
            <div className="text-sm text-green-700">Apper Wins</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{recommendation.lovableWins}</div>
            <div className="text-sm text-blue-700">Lovable Wins</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{recommendation.ties}</div>
            <div className="text-sm text-gray-700">Ties</div>
          </div>
        </div>

        {recommendation.winner !== 'tie' && (
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-lg font-semibold text-gray-900 mb-3">
              📊 Based on your selected priorities:
            </div>
            <div className="space-y-2">
              {recommendation.reasoning.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center space-x-2 text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <ApperIcon name="Check" size={16} className="text-green-500" />
                  <span>{reason}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-lg font-bold text-green-800 mb-1">
                ➡️ Choose: {recommendation.winner === 'apper' ? 'Apper' : 'Lovable'}
              </div>
            </motion.div>
          </motion.div>
        )}

        {recommendation.winner === 'apper' && (
          <motion.div
            className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="font-semibold text-yellow-800 mb-2">⚠️ Choose Lovable only if:</div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• You're deeply familiar with Supabase</li>
              <li>• You want to custom-code everything</li>
              <li>• You don't mind stitching together multiple tools</li>
            </ul>
          </motion.div>
        )}

        <motion.div
          className="border-t border-gray-200 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-lg font-semibold text-gray-900 mb-4">🔚 Next Steps</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" size="sm" className="text-xs">
              🔗 Full Comparison
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              📺 Watch Demo
            </Button>
            <Button variant="primary" size="sm" className="text-xs">
              🧪 Try Free
            </Button>
            <Button variant="secondary" size="sm" className="text-xs">
              💬 Talk to Expert
            </Button>
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="ghost" onClick={onReset} className="text-sm">
              <ApperIcon name="RotateCcw" size={16} className="mr-2" />
              Start Over
            </Button>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default RecommendationCard;
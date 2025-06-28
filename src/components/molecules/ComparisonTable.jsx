import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const ComparisonTable = ({ comparison }) => {
  const getWinnerBadge = (winner) => {
    if (winner === 'apper') {
      return <Badge variant="success" animate>Apper Wins</Badge>;
    } else if (winner === 'lovable') {
      return <Badge variant="info" animate>Lovable Wins</Badge>;
    } else {
      return <Badge variant="primary" animate>Tie</Badge>;
    }
  };

  const getStatusIcon = (support) => {
    if (support.includes('✅')) {
      return <ApperIcon name="CheckCircle" size={16} className="text-green-500" />;
    } else if (support.includes('⚠️')) {
      return <ApperIcon name="AlertTriangle" size={16} className="text-yellow-500" />;
    } else if (support.includes('❌')) {
      return <ApperIcon name="XCircle" size={16} className="text-red-500" />;
    }
    return null;
  };

  return (
    <Card className={`${comparison.winner === 'apper' ? 'comparison-winner' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          {comparison.feature}
        </h3>
        {getWinnerBadge(comparison.winner)}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full comparison-table">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Apper</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Lovable</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Support</td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(comparison.apperSupport)}
                  <span className="text-sm">{comparison.apperSupport}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(comparison.lovableSupport)}
                  <span className="text-sm">{comparison.lovableSupport}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {(comparison.apperDetails || comparison.lovableDetails) && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {comparison.apperDetails && (
            <div className="bg-surface-50 rounded-lg p-3">
              <div className="font-medium text-gray-900 mb-1">Apper Details:</div>
              <div className="text-gray-600">{comparison.apperDetails}</div>
            </div>
          )}
          {comparison.lovableDetails && (
            <div className="bg-surface-50 rounded-lg p-3">
              <div className="font-medium text-gray-900 mb-1">Lovable Details:</div>
              <div className="text-gray-600">{comparison.lovableDetails}</div>
            </div>
          )}
        </div>
      )}

      <motion.div 
        className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <ApperIcon name="Lightbulb" size={16} className="text-primary-600" />
          <span className="text-sm font-medium text-primary-900">Result:</span>
          <span className="text-sm text-primary-800">{comparison.resultText}</span>
        </div>
      </motion.div>
    </Card>
  );
};

export default ComparisonTable;
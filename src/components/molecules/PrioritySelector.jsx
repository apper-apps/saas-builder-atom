import { motion } from 'framer-motion';
import Checkbox from '@/components/atoms/Checkbox';
import Card from '@/components/atoms/Card';

const PrioritySelector = ({ priorities, selectedPriorities, onTogglePriority }) => {
  return (
    <div className="space-y-4">
      {priorities.map((priority, index) => (
        <motion.div
          key={priority.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card 
            hover 
            className={`feature-card transition-all duration-300 ${
              selectedPriorities.includes(priority.key) 
                ? 'ring-2 ring-primary-500 bg-gradient-to-r from-primary-50 to-secondary-50' 
                : 'hover:border-primary-200'
            }`}
          >
            <Checkbox
              checked={selectedPriorities.includes(priority.key)}
              onChange={() => onTogglePriority(priority.key)}
              label={priority.label}
              description={priority.description}
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PrioritySelector;
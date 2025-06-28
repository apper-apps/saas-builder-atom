import { motion } from 'framer-motion';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label, 
  description,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <motion.label
      className={`flex items-start space-x-3 cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <div className="flex items-center h-5 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="checkbox-custom"
          {...props}
        />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
          {label}
        </div>
        {description && (
          <div className="text-xs text-gray-500 mt-1">
            {description}
          </div>
        )}
      </div>
    </motion.label>
  );
};

export default Checkbox;
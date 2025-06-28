import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  animate = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800",
    success: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800",
    warning: "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800",
    error: "bg-gradient-to-r from-red-100 to-pink-100 text-red-800",
    info: "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800"
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-sm"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (animate) {
    return (
      <motion.span
        className={classes}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        {...props}
      >
        {children}
      </motion.span>
    );
  }
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;
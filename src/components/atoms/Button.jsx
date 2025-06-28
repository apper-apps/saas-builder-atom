import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  onClick,
  type = 'button',
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-card hover:shadow-elevated focus:ring-primary-500",
    secondary: "bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:border-primary-600 focus:ring-primary-500",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    success: "bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-card hover:shadow-elevated focus:ring-accent-500",
    danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-card hover:shadow-elevated focus:ring-red-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
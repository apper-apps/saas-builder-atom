import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '', 
  hover = false,
  padding = 'lg',
  shadow = 'card',
  background = 'white',
  ...props 
}, ref) => {
  const baseClasses = "rounded-xl transition-all duration-300";
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const shadowClasses = {
    none: '',
    card: 'shadow-card',
    elevated: 'shadow-elevated',
    hover: hover ? 'hover:shadow-elevated' : ''
  };
  
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-surface-50',
    gradient: 'bg-gradient-to-br from-white to-surface-50'
  };
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${shadowClasses.hover} ${backgroundClasses[background]} ${className}`;
  
  const MotionDiv = motion.div;
  
  return (
    <MotionDiv
      ref={ref}
      className={classes}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
    </MotionDiv>
  );
});

Card.displayName = 'Card';

export default Card;
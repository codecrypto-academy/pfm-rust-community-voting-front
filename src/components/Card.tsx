
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" } : {}}
      className={cn(
        'card-community',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;

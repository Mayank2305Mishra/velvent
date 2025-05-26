"use client";

import React from "react";
import { motion } from "framer-motion";

export function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  [key: string]: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {React.Children.map(children, (child) => {
        return React.isValidElement(child) ? (
          <motion.div
            variants={{
              initial: { opacity: 0, y: 15 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {child}
          </motion.div>
        ) : (
          child
        );
      })}
    </motion.div>
  );
}
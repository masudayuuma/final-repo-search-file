import React from 'react';
import styles from '@/styles/styles.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/masudayuuma"
        target="_blank"
        rel="noopener noreferrer"
      >
        Created by masudayuuma
      </a>
    </footer>
  );
};

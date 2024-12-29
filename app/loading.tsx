'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/styles/loading.module.css'

const DNAStrand: React.FC<{ reverse?: boolean }> = ({ reverse = false }) => (
  <svg
    className={`w-24 h-24 ${reverse ? 'rotate-180' : ''}`}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M50 10C30 10 10 30 10 50C10 70 30 90 50 90"
      stroke="#3B82F6"
      strokeWidth="4"
      strokeLinecap="round"
      className={styles.dnaStrand}
    />
    <path
      d="M50 10C70 10 90 30 90 50C90 70 70 90 50 90"
      stroke="#60A5FA"
      strokeWidth="4"
      strokeLinecap="round"
      className={styles.dnaStrand}
    />
    {[20, 40, 60, 80].map((y, index) => (
      <circle
        key={index}
        cx="50"
        cy={y}
        r="3"
        fill="#2563EB"
        className={styles.nucleotide}
        style={{ animationDelay: `${index * 0.2}s` }}
      />
    ))}
  </svg>
)

const LoadingText: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingText} aria-live="polite">
      Loading{dots}
    </div>
  );
};

export default function Loading() {
  return (
    <div className={styles.loadingContainer} role="alert" aria-busy="true">
      <div className={styles.loadingContent}>
        <div className={styles.loadingBackground}></div>
        <div className={styles.dnaContainer}>
          <DNAStrand />
          <DNAStrand reverse />
        </div>
        <LoadingText />
      </div>
    </div>
  )
}

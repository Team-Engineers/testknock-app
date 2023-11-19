import React from 'react';
import { MathComponent } from 'mathjax-react';
import './mathText.css';

export const MathText = ({ text, textTag = 'p' }) => {

  const parts = text.split(/\$(.*?)\$/);
  const TextTag = textTag || 'p';

  const jsxElements = parts.map((part, index) => {
    if (index % 2 === 0) {
      return <span key={index}>{part}</span>;
    } else {
      return <MathComponent key={index} tex={part} display={false}  className='math-expression'/>;
    }
  });

  return <TextTag className='text-spacing'>{jsxElements}</TextTag>;
};



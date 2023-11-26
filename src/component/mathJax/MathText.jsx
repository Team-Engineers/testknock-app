import React from 'react';
import { MathComponent } from 'mathjax-react';
import './mathText.css';

export const MathText = ({ text, textTag = 'p' }) => {
  const TextTag = textTag || 'p';

  if(typeof text !== 'string'){
    text = text[0]
  }
  
  const parts = text.split(/\$(.*?)\$/);

  const jsxElements = parts.map((part, index) => {
    if (index % 2 === 0) {
      // return <div key = {index} dangerouslySetInnerHTML={{ __html: part }} />
      if (part.trim() !== '') {
        return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
      } else {
        return null; // Skip rendering empty parts
      }
    } else {
      return <MathComponent key={index} tex={part} display={false}  className='math-expression' />;
    }
  });

  return <TextTag className='text-spacing'>{jsxElements}</TextTag>;
};

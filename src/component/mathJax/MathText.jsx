import React from 'react';
import { MathComponent } from 'mathjax-react';
import './mathText.css';

export const MathText = ({ text, textTag = 'p' }) => {
  const TextTag = textTag || 'p';

  if (typeof text !== 'string') {
    text = text[0];
  }

  const hasHTMLTags = /<.*?>/.test(text);

  if (hasHTMLTags) {
    return <TextTag className='text-spacing' dangerouslySetInnerHTML={{ __html: text }} />;
  }

  const parts = text.split(/\$(.*?)\$/);

  const jsxElements = parts.map((part, index) => {
    if (index % 2 === 0) {
      return <span key={index}>{part}</span>;
    } else {
      return <MathComponent key={index} tex={part} display={false} className='math-expression' />;
    }
  });

  return <TextTag className='text-spacing'>{jsxElements}</TextTag>;
};

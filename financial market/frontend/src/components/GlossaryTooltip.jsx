import React from 'react';
import './GlossaryTooltip.css';

const GlossaryTooltip = ({ term, explanation, children }) => {
  return (
    <span className="glossary-tooltip-container">
      <span className="glossary-term">{children || term}</span>
      <div className="glossary-tooltip">
        <div className="glossary-tooltip-title">{term}</div>
        <div className="glossary-tooltip-body">{explanation}</div>
      </div>
    </span>
  );
};

export default GlossaryTooltip;

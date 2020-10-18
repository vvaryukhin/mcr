import React from 'react';

import './index.scss';

interface IHighlightProps {
  text: string;
  highlight: string;
  tag?: keyof JSX.IntrinsicElements;
}

const Highlight = ({
  text,
  highlight,
  tag: CustomTag = 'span',
}: IHighlightProps) => {
  const lowerCaseHighlight = highlight.toLowerCase();
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <CustomTag>
      {parts.map((part, key) =>
        part.toLowerCase() === lowerCaseHighlight ? (
          <span className="highlighted" key={key}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </CustomTag>
  );
};

export default Highlight;

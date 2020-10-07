import React from 'react';

import './index.scss';

const Loader = () => {
  return (
    <div className="loader" data-test-id="call-records-list/loader">
      <div className="loader__overlay"></div>
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;

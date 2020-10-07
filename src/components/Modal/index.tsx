import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import makeSwipeHandlers from 'utils/swipe';
import Transition from 'components/Transition';
import { modalRoot } from 'elements';
import { blockScroll, unlockScroll } from 'utils';

import './index.scss';

interface IModalProps {
  isOpened: boolean;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ isOpened, onClose, children }) => {
  useEffect(() => {
    isOpened ? blockScroll() : unlockScroll();
  }, [isOpened]);

  const handlers = useMemo(() => makeSwipeHandlers({ onSwipeBottom: onClose }), [
    onClose,
  ]);

  return ReactDOM.createPortal(
    <Transition visible={isOpened} name="modal">
      <div className="modal">
        <div onClick={onClose} className="modal__overlay" {...handlers}></div>
        <div className="modal__content">{children}</div>
      </div>
    </Transition>,
    modalRoot
  );
};

export default Modal;

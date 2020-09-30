import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { nextFrame, transitionEnd } from 'utils';

interface IModalProps {
  isOpened?: boolean;
  onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const modalRoot = document.getElementById('modal-root')!;

const Modal: React.FC<IModalProps> = ({ isOpened = false, onClose, children }) => {
  const [showModal, setShowModal] = useState(isOpened);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    modalRef.current = node;
    if (node) {
      // using nextFrame to make sure that
      // opacity changed after repaint
      nextFrame(() => {
        node.style.opacity = '1';
      });
    }
  }, []);

  useEffect(() => {
    if (isOpened) {
      return setShowModal(isOpened);
    } else if (modalRef.current) {
      modalRef.current.style.opacity = '0';
      // hide modal after transition ended
      return transitionEnd(modalRef.current, () => {
        setShowModal(false);
      });
    }
  }, [isOpened]);

  return showModal
    ? ReactDOM.createPortal(
        <div
          ref={refCallback}
          style={{
            opacity: 0,
            position: 'absolute',
            zIndex: 100,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <div
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              zIndex: 10,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              zIndex: 20,
              background: 'white',
              padding: '20px',
              borderRadius: '3px',
              width: 'calc(100% - 20px)',
              maxWidth: '400px',
            }}
          >
            {children}
          </div>
        </div>,
        modalRoot
      )
    : null;
};

export default Modal;

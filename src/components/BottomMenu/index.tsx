import React from 'react';
import Modal from 'components/Modal';

import './index.scss';

interface IBottomMenu {
  isOpened: boolean;
  onClose: () => void;
  items: IBottomMenuItem[];
}

interface IBottomMenuItem {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  theme?: 'default' | 'danger';
}

const BottomMenu = ({ isOpened, onClose, items }: IBottomMenu) => {
  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <div className="bottom-menu">
        {items.map(({ title, theme, onClick }, idx) => (
          <button
            key={`bottom-menu-item-${idx}`}
            className={`bottom-menu__button ${
              theme === 'danger' ? 'bottom-menu__button--danger' : ''
            }`}
            onClick={onClick}
          >
            {title}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default BottomMenu;

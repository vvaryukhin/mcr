import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import NotificationItem from './notification-item';
import store from './store';
import { ICreateNotificationProps, INotification } from './types';
import { modalRoot } from 'elements';
import { mapRight } from 'utils';

import './index.scss';

export const notify = ({ title, message }: ICreateNotificationProps) => {
  store.addNotification({ title, message });
};

const NOTIFICATION_DURATION = 5000;

interface INotificationsProps {
  duration?: number;
}

const Notifications = ({
  duration = NOTIFICATION_DURATION,
}: INotificationsProps) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const removeNotification = useCallback(
    (id: number) => {
      setNotifications(notifications => notifications.filter(n => n.id !== id));
    },
    [setNotifications]
  );

  useEffect(() => {
    const addNotification = (notification: INotification) => {
      setNotifications(v => [...v, notification]);
    };

    store.register({ add: addNotification, remove: removeNotification });
  }, [duration, setNotifications, removeNotification]);

  return ReactDOM.createPortal(
    <div className="notification-container">
      {mapRight(notifications, val => (
        <NotificationItem
          notification={val}
          key={val.id}
          duration={duration}
          removeNotification={removeNotification}
        />
      ))}
    </div>,
    modalRoot
  );
};

export default Notifications;

import { useCallbackRef } from 'hooks';
import React, { useCallback, useEffect, useMemo } from 'react';
import { isNumber, nextFrame, transitionEnd } from 'utils';
import { addClass, hasClass, removeClass } from 'utils/classes';
import makeSwipeHandlers from 'utils/swipe';
import { INotification } from './types';

interface INotificationItemProps {
  notification: INotification;
  duration: number;
  removeNotification: (id: number) => void;
}

const NotificationItem = ({
  notification,
  duration,
  removeNotification,
}: INotificationItemProps) => {
  const [notificationRef, cbRef] = useCallbackRef<HTMLDivElement>(node => {
    if (node) {
      addClass(node, 'notification--inserting');
      nextFrame(() => {
        removeClass(node, 'notification--inserting');
      });
    }
  }, []);

  const remove = useCallback(
    (direction: 'left' | 'right' = 'right') => {
      const el = notificationRef.current;
      if (el) {
        addClass(
          el,
          'notification--removing',
          `notification--removing-${direction}`
        );
        transitionEnd(el, () => {
          removeNotification(notification.id);
        });
      }
    },
    [notificationRef, notification, removeNotification]
  );

  useEffect(() => {
    let timeoutId: number | null = null;
    timeoutId = window.setTimeout(() => {
      const el = notificationRef.current;
      if (el && hasClass(el, 'notification--removing')) {
        return;
      }
      remove();
    }, duration);
    return () => {
      isNumber(timeoutId) && clearTimeout(timeoutId);
    };
  }, [notificationRef, duration, remove]);

  const swipeHandlers = useMemo(() => {
    return makeSwipeHandlers({
      onSwipeLeft: () => remove('left'),
      onSwipeRight: () => remove('right'),
    });
  }, [remove]);

  return (
    <div
      className="notification"
      ref={cbRef}
      onClick={() => remove()}
      {...swipeHandlers}
    >
      <div className="notification__content">
        <h4 className="heading notification__title">{notification.title}</h4>
        <div className="notification__message">{notification.message}</div>
      </div>
      <div className="notification__closer">Close</div>
    </div>
  );
};

export default NotificationItem;

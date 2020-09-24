import uniq from 'utils/uniq';
import { ICreateNotificationProps, INotification } from './types';

type AddNotification = (notification: INotification) => void;
type RemoveNotification = (id: number) => void;

class NotificationStore {
  private add?: AddNotification;
  private remove?: RemoveNotification;

  addNotification(notification: ICreateNotificationProps) {
    this.add?.({ ...notification, id: uniq.id, isRemoved: false });
  }

  removeNotification(id: number) {
    this.remove?.(id);
  }

  register(options: { add: AddNotification; remove: RemoveNotification }) {
    const { add, remove } = options;
    this.add = add;
    this.remove = remove;
  }
}

const store = new NotificationStore();

export default store;

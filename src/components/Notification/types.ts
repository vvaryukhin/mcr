export interface ICreateNotificationProps {
  title: string;
  message: string;
}

export interface INotification extends ICreateNotificationProps {
  id: number;
  isRemoved: boolean;
}

import React from 'react';
import { ToastNotification } from '@carbon/react';
import styles from './alert.module.css';

interface AlertProps {
  title?: string;
  subtitle?: string;
  onClose: () => any;
}

export const Alert: React.FC<AlertProps> = ({ title, subtitle, onClose }) => (
  <ToastNotification
    className={styles.alert}
    ariaLabel="Close alert"
    onClose={onClose}
    onCloseButtonClick={onClose}
    statusIconDescription="notification"
    title={title || 'An error has occurred'}
    subtitle={subtitle}
  />
);

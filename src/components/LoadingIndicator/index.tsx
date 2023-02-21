import Image from 'next/image';
import styles from './loadingIndicator.module.css';

export const LoadingIndicator: React.FC = () => (
  <Image
    height={28}
    width={28}
    className={styles.loadingPulse}
    src="/loading-pulse.svg"
    alt="Loading..."
  />
);

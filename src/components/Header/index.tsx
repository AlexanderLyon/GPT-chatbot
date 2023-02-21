import styles from './header.module.css';
import { Cognitive } from '@carbon/react/icons';

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h2>
        <Cognitive size={25} /> GPT-3 Chat
      </h2>
    </div>
  );
};

import Image from 'next/image';
import styles from './NewsStoryVisual.module.css';

/** The launch announcement uses the EmAI mark; project stories use real photos. */
export function NewsStoryVisual({ className = '' }: { variant?: 'launch'; className?: string }) {
  return (
    <div className={`${styles.visual} ${className}`} aria-hidden="true">
      <div className={styles.grid} />
      <Image src="/logo.svg" width={144} height={144} alt="" className={styles.mark} />
      <span className={styles.name}>Em<span>AI</span><i>.</i></span>
      <span className={styles.caption}>HELLO, WORLD.</span>
    </div>
  );
}

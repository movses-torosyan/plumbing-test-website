import { ReviewsAutoSlider } from "./ui/reviews-auto-slider";
import styles from "./ReviewsSection.module.css";

export function ReviewsSection() {
  return (
    <section className={styles.section} aria-labelledby="reviews-title">
      <div className={styles.glow} />
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Customer reviews</p>
          <h2 id="reviews-title" className={styles.title}>Trusted in every home.</h2>
        </div>
        <p className={styles.summary}><strong>5.0</strong><span>★★★★★</span>Based on local customer feedback</p>
      </header>
      <ReviewsAutoSlider />
    </section>
  );
}
import styles from "./reviews-auto-slider.module.css";

const reviews = [
  { quote: "They found the leak quickly, explained every option, and left the entire area spotless.", name: "Sarah M.", service: "Leak detection" },
  { quote: "Our water heater was replaced the same day. The pricing was clear and the workmanship was excellent.", name: "Daniel R.", service: "Water heater" },
  { quote: "Professional from the first call to the final cleanup. This is the team we will call again.", name: "Maya T.", service: "Pipe repair" },
  { quote: "Fast arrival, honest advice, and no surprise charges. The drain has worked perfectly ever since.", name: "James L.", service: "Drain cleaning" },
  { quote: "Careful, courteous, and incredibly knowledgeable. They treated our home with real respect.", name: "Olivia K.", service: "Plumbing service" },
];

export function ReviewsAutoSlider() {
  const loop = [...reviews, ...reviews];

  return (
    <div className={styles.viewport}>
      <div className={styles.track}>
        {loop.map((review, index) => (
          <article key={`${review.name}-${index}`} className={styles.card} aria-hidden={index >= reviews.length ? "true" : undefined}>
            <div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote>“{review.quote}”</blockquote>
            <footer>
              <span className={styles.avatar}>{review.name.charAt(0)}</span>
              <span><strong>{review.name}</strong><small>{review.service}</small></span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
import styles from "./News.module.css";

// Placeholder data — replaced with a live fetch from GET /api/news in Phase 4.
const placeholderPosts = [
  {
    id: 1,
    title: "5 Tips to Keep Your Kitchen Spotless Between Cleans",
    date: "Coming soon",
  },
  {
    id: 2,
    title: "Why We Switched to Eco-Friendly Products",
    date: "Coming soon",
  },
];

function News() {
  return (
    <section id="news" className="section">
      <div className="container">
        <p className={styles.eyebrow}>News & Tips</p>
        <h2 className={styles.heading}>From the ATClean blog</h2>

        <div className={styles.grid}>
          {placeholderPosts.map((post) => (
            <article key={post.id} className={styles.card}>
              <p className={styles.date}>{post.date}</p>
              <h3 className={styles.cardTitle}>{post.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default News;

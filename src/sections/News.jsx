import { useEffect, useState } from "react";
import { fetchPublishedNews } from "../api/news";
import styles from "./News.module.css";

function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedNews()
      .then(setPosts)
      .catch(() => setPosts([])) // fail quietly — a broken blog feed shouldn't break the homepage
      .finally(() => setLoading(false));
  }, []); // empty array = run once, right after this component first mounts

  if (loading) {
    return null; // nothing to show yet — avoids a layout flash of empty content
  }

  if (posts.length === 0) {
    return null; // no published posts yet — hide the section rather than show an empty grid
  }

  return (
    <section id="news" className="section">
      <div className="container">
        <p className={styles.eyebrow}>News & Tips</p>
        <h2 className={styles.heading}>From the ATClean blog</h2>

        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.card}>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt=""
                  className={styles.cardImage}
                />
              )}
              <div className={styles.cardBody}>
                <p className={styles.date}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <h3 className={styles.cardTitle}>{post.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default News;

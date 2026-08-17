import styles from "./About.module.css";

function About() {
  return (
    <section className={`section ${styles.about}`}>
      <div className="container">
        <p className={styles.eyebrow}>About Us</p>
        <h2 className={styles.heading}>A cleaner space, a calmer mind</h2>
        <p className={styles.body}>
          ATClean has been helping homes and businesses breathe easier since
          2022. We believe a truly clean space should feel effortless to live
          and work in — so our trained, background-checked team handles the
          detail work, while you get your time back. No harsh chemicals, no
          rushed jobs, just consistent, professional care every single visit.
        </p>
      </div>
    </section>
  );
}

export default About;

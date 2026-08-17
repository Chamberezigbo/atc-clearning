import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

// Placeholder "cleaning tip" slides — swap slideColor for real photos later.
const slides = [
  {
    tip: "Tip: Clean top to bottom so dust falls where you'll vacuum last.",
    slideColor: "#a083dc",
  },
  {
    tip: "Tip: Microfiber cloths trap dust instead of just pushing it around.",
    slideColor: "#d7b4f3",
  },
  {
    tip: "Tip: Let cleaning products sit for a minute before wiping for a deeper clean.",
    slideColor: "#8d6bd0",
  },
];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`container ${styles.hero}`}>
      <div>
        <p className={styles.eyebrow}>ATClean</p>
        <h1 className={styles.heading}>A calmer home starts here</h1>
        <p className={styles.subheading}>
          Professional, trustworthy cleaning for homes and offices — so you can
          focus on everything else.
        </p>
        <a href="#contact" className={styles.ctaButton}>
          Chat on WhatsApp
        </a>
      </div>

      <div className={styles.carousel}>
        {slides.map((slide, index) => (
          <div
            key={slide.tip}
            className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ""}`}
            style={{ "--slide-color": slide.slideColor }}
          >
            <p className={styles.slideTip}>{slide.tip}</p>
          </div>
        ))}

        <div className={styles.dots}>
          {slides.map((slide, index) => (
            <button
              key={slide.tip}
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;

import { useEffect, useState } from "react";
import { fetchActiveHeroSlides } from "../api/heroSlides";
import styles from "./Hero.module.css";

// Fallback shown while slides load, or if the admin hasn't added any yet.
const fallbackSlides = [
  { id: "fallback-1", tip: "Tip: Clean top to bottom so dust falls where you'll vacuum last.", imageUrl: null },
  { id: "fallback-2", tip: "Tip: Microfiber cloths trap dust instead of just pushing it around.", imageUrl: null },
  { id: "fallback-3", tip: "Tip: Let cleaning products sit for a minute before wiping for a deeper clean.", imageUrl: null },
];

function Hero() {
  const [slides, setSlides] = useState(fallbackSlides);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchActiveHeroSlides()
      .then((data) => {
        if (data.length > 0) setSlides(data);
      })
      .catch(() => {
        // stay on fallbackSlides
      });
  }, []);

  useEffect(() => {
    setActiveIndex(0); // avoid pointing past the end if the slide count just changed

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides]);

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
            key={slide.id}
            className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ""}`}
            style={{
              "--slide-image": slide.imageUrl ? `url(${slide.imageUrl})` : "none",
            }}
          >
            <p className={styles.slideTip}>{slide.tip}</p>
          </div>
        ))}

        <div className={styles.dots}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
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

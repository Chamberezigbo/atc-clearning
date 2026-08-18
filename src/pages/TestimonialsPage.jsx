import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  fetchApprovedTestimonials,
  submitTestimonial,
} from "../api/testimonials";
import { uploadTestimonialPhoto } from "../api/upload";
import styles from "./TestimonialsPage.module.css";

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [highlightForm, setHighlightForm] = useState(false);
  const { hash } = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    fetchApprovedTestimonials()
      .then(setTestimonials)
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  // React Router doesn't scroll to #hash targets on its own when
  // navigating between routes (only the browser's native behavior does
  // that, which only fires on a full page load) — so we do it by hand.
  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setHighlightForm(true);
      const timer = setTimeout(() => setHighlightForm(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [hash, loading]);

  async function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setSubmitError("");
    setUploadingPhoto(true);
    try {
      const { url } = await uploadTestimonialPhoto(file);
      setPhotoUrl(url);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setUploadingPhoto(false);
      e.target.value = "";
    }
  }

  async function onSubmit(formData) {
    setSubmitError("");
    try {
      await submitTestimonial({
        authorName: formData.authorName,
        message: formData.message,
        authorPhotoUrl: photoUrl || null,
      });
      setSubmitted(true);
      reset();
      setPhotoUrl("");
    } catch (err) {
      setSubmitError(err.message);
    }
  }

  return (
    <div className="container section">
      <h1 className={styles.heading}>Testimonials</h1>
      <p className={styles.subheading}>
        Real feedback from real clients — and if you've worked with us,
        we'd love to hear from you too.
      </p>

      {!loading && testimonials.length > 0 && (
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <blockquote key={t.id} className={styles.card}>
              {t.authorPhotoUrl ? (
                <img
                  src={t.authorPhotoUrl}
                  alt=""
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {t.authorName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className={styles.message}>&ldquo;{t.message}&rdquo;</p>
                <footer className={styles.name}>— {t.authorName}</footer>
              </div>
            </blockquote>
          ))}
        </div>
      )}

      <div
        id="submit-testimonial"
        className={`${styles.formSection} ${highlightForm ? styles.formSectionHighlight : ""}`}
      >
        <h2 className={styles.formHeading}>Share Your Experience</h2>
        <p className={styles.formSubheading}>
          Submitted testimonials are reviewed before they appear publicly.
        </p>

        {submitted ? (
          <p className={styles.successMessage}>
            Thank you! Your testimonial has been submitted for review.
          </p>
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <input
              type="text"
              placeholder="Your name"
              className={styles.input}
              {...register("authorName", { required: true })}
            />
            {errors.authorName && (
              <p className={styles.fieldError}>Name is required</p>
            )}

            <textarea
              placeholder="Tell us about your experience"
              className={styles.textarea}
              {...register("message", { required: true })}
            />
            {errors.message && (
              <p className={styles.fieldError}>Message is required</p>
            )}

            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={uploadingPhoto}
              />
              {uploadingPhoto && <p>Uploading photo...</p>}
              {photoUrl && !uploadingPhoto && (
                <img src={photoUrl} alt="" className={styles.avatar} />
              )}
            </div>

            {submitError && (
              <p className={styles.fieldError}>{submitError}</p>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || uploadingPhoto}
            >
              Submit Testimonial
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default TestimonialsPage;

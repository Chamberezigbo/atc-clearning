import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {
  fetchAllHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  toggleHeroSlideActive,
} from "../api/heroSlides";
import { uploadNewsImage } from "../api/upload";
import styles from "./HeroSlideManager.module.css";

function HeroSlideManager() {
  const { token } = useAuth();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { order: 0 } });

  async function loadSlides() {
    setLoading(true);
    try {
      const data = await fetchAllHeroSlides(token);
      setSlides(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSlides();
  }, []);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setUploading(true);
    try {
      const { url } = await uploadNewsImage(token, file);
      setImageUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function onSubmit(formData) {
    setError("");
    try {
      const payload = { ...formData, imageUrl, order: Number(formData.order) };
      if (editingId) {
        await updateHeroSlide(token, editingId, payload);
      } else {
        await createHeroSlide(token, payload);
      }
      reset({ tip: "", order: 0 });
      setImageUrl("");
      setEditingId(null);
      await loadSlides();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(slide) {
    setEditingId(slide.id);
    setImageUrl(slide.imageUrl || "");
    reset({ tip: slide.tip, order: slide.order });
  }

  function cancelEdit() {
    setEditingId(null);
    setImageUrl("");
    reset({ tip: "", order: 0 });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this slide?")) return;
    await deleteHeroSlide(token, id);
    await loadSlides();
  }

  async function handleToggleActive(id) {
    await toggleHeroSlideActive(token, id);
    await loadSlides();
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.formCard}>
        <h3>{editingId ? "Edit Slide" : "New Slide"}</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <textarea
            placeholder="Tip / caption text"
            className={styles.textarea}
            {...register("tip", { required: true })}
          />
          {errors.tip && <p className={styles.fieldError}>Tip text is required</p>}

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading && <p className={styles.meta}>Uploading...</p>}
            {imageUrl && !uploading && (
              <div className={styles.imagePreviewWrap}>
                <img src={imageUrl} alt="" className={styles.imagePreview} />
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setImageUrl("")}
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          <label className={styles.orderField}>
            Display order
            <input
              type="number"
              className={styles.input}
              {...register("order", { required: true, valueAsNumber: true })}
            />
          </label>

          {error && <p className={styles.fieldError}>{error}</p>}

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton} disabled={uploading}>
              {editingId ? "Save Changes" : "Add Slide"}
            </button>
            {editingId && (
              <button type="button" className={styles.cancelButton} onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        {loading ? (
          <p>Loading slides...</p>
        ) : slides.length === 0 ? (
          <p>No slides yet — the homepage will show default placeholder tips until you add some.</p>
        ) : (
          <div className={styles.list}>
            {slides.map((slide) => (
              <div key={slide.id} className={styles.row}>
                {slide.imageUrl && (
                  <img src={slide.imageUrl} alt="" className={styles.thumb} />
                )}
                <div className={styles.info}>
                  <p className={styles.tip}>{slide.tip}</p>
                  <p className={styles.meta}>Order: {slide.order}</p>
                  <span
                    className={`${styles.badge} ${
                      slide.isActive ? styles.badgeActive : styles.badgeInactive
                    }`}
                  >
                    {slide.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => handleToggleActive(slide.id)}>
                    {slide.isActive ? "Hide" : "Show"}
                  </button>
                  <button onClick={() => startEdit(slide)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDelete(slide.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSlideManager;

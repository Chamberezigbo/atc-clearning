import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchAllTestimonials,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
} from "../api/testimonials";
import styles from "./TestimonialManager.module.css";

const badgeClassByStatus = {
  pending: "badgePending",
  approved: "badgeApproved",
  rejected: "badgeRejected",
};

function TestimonialManager() {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadTestimonials() {
    setLoading(true);
    const data = await fetchAllTestimonials(token);
    setTestimonials(data);
    setLoading(false);
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function handleApprove(id) {
    await approveTestimonial(token, id);
    await loadTestimonials();
  }

  async function handleReject(id) {
    await rejectTestimonial(token, id);
    await loadTestimonials();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this testimonial?")) return;
    await deleteTestimonial(token, id);
    await loadTestimonials();
  }

  if (loading) return <p>Loading testimonials...</p>;
  if (testimonials.length === 0) return <p>No testimonials submitted yet.</p>;

  return (
    <div className={styles.list}>
      {testimonials.map((t) => (
        <div key={t.id} className={styles.row}>
          <div className={styles.info}>
            {t.authorPhotoUrl ? (
              <img src={t.authorPhotoUrl} alt="" className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {t.authorName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className={styles.name}>{t.authorName}</p>
              <p className={styles.message}>{t.message}</p>
              <span
                className={`${styles.badge} ${styles[badgeClassByStatus[t.status]]}`}
              >
                {t.status}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            {t.status !== "approved" && (
              <button onClick={() => handleApprove(t.id)}>Approve</button>
            )}
            {t.status !== "rejected" && (
              <button onClick={() => handleReject(t.id)}>Reject</button>
            )}
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(t.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestimonialManager;

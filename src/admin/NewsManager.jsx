import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {
  fetchAllNews,
  createNewsPost,
  updateNewsPost,
  deleteNewsPost,
  toggleNewsPublish,
} from "../api/news";
import styles from "./NewsManager.module.css";

function NewsManager() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null = "create" mode
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function loadPosts() {
    setLoading(true);
    try {
      const data = await fetchAllNews(token);
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function onSubmit(formData) {
    setError("");
    try {
      if (editingId) {
        await updateNewsPost(token, editingId, formData);
      } else {
        await createNewsPost(token, formData);
      }
      reset({ title: "", body: "", imageUrl: "" });
      setEditingId(null);
      await loadPosts();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(post) {
    setEditingId(post.id);
    reset({
      title: post.title,
      body: post.body,
      imageUrl: post.imageUrl || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    reset({ title: "", body: "", imageUrl: "" });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this post?")) return;
    await deleteNewsPost(token, id);
    await loadPosts();
  }

  async function handleTogglePublish(id) {
    await toggleNewsPublish(token, id);
    await loadPosts();
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.formCard}>
        <h3>{editingId ? "Edit Post" : "New Post"}</h3>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className={styles.fieldError}>Title is required</p>
          )}

          <textarea
            placeholder="Body"
            className={styles.textarea}
            {...register("body", { required: true })}
          />
          {errors.body && <p className={styles.fieldError}>Body is required</p>}

          <input
            type="text"
            placeholder="Image URL (optional)"
            className={styles.input}
            {...register("imageUrl")}
          />

          {error && <p className={styles.fieldError}>{error}</p>}

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {editingId ? "Save Changes" : "Create Draft"}
            </button>
            {editingId && (
              <button
                type="button"
                className={styles.cancelButton}
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className={styles.list}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postRow}>
                <div>
                  <p className={styles.postTitle}>{post.title}</p>
                  <p className={styles.postMeta}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <span
                    className={`${styles.badge} ${
                      post.isPublished
                        ? styles.badgePublished
                        : styles.badgeDraft
                    }`}
                  >
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <div className={styles.postActions}>
                  <button onClick={() => handleTogglePublish(post.id)}>
                    {post.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => startEdit(post)}>Edit</button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(post.id)}
                  >
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

export default NewsManager;

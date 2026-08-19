import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { changePasswordRequest } from "../api/auth";
import styles from "./ChangePasswordForm.module.css";

function ChangePasswordForm() {
  const { token } = useAuth();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch("newPassword");

  async function onSubmit(data) {
    setServerError("");
    setSuccess(false);
    try {
      await changePasswordRequest(token, data.currentPassword, data.newPassword);
      setSuccess(true);
      reset();
    } catch (err) {
      setServerError(err.message);
    }
  }

  return (
    <div className={styles.card}>
      <h3>Change Password</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          type="password"
          placeholder="Current password"
          className={styles.input}
          {...register("currentPassword", { required: true })}
        />
        {errors.currentPassword && (
          <p className={styles.fieldError}>Current password is required</p>
        )}

        <input
          type="password"
          placeholder="New password (min. 8 characters)"
          className={styles.input}
          {...register("newPassword", { required: true, minLength: 8 })}
        />
        {errors.newPassword && (
          <p className={styles.fieldError}>New password must be at least 8 characters</p>
        )}

        <input
          type="password"
          placeholder="Confirm new password"
          className={styles.input}
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === newPassword || "Passwords don't match",
          })}
        />
        {errors.confirmPassword && (
          <p className={styles.fieldError}>{errors.confirmPassword.message}</p>
        )}

        {serverError && <p className={styles.fieldError}>{serverError}</p>}
        {success && <p className={styles.successMessage}>Password updated!</p>}

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;

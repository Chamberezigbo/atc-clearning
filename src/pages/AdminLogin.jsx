import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginRequest, recoverPasswordRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import styles from "./AdminLogin.module.css";

function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showRecovery, setShowRecovery] = useState(false);
  const [recoverySecret, setRecoverySecret] = useState("");
  const [recoveryError, setRecoveryError] = useState("");
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const [recoverySubmitting, setRecoverySubmitting] = useState(false);

  async function onSubmit(data) {
    setServerError("");
    try {
      const { token } = await loginRequest(data.email, data.password);
      login(token);
      navigate("/admin");
    } catch (err) {
      setServerError(err.message);
    }
  }

  async function handleRecoverySubmit(e) {
    e.preventDefault();
    setRecoveryError("");
    setRecoverySuccess(false);
    setRecoverySubmitting(true);
    try {
      await recoverPasswordRequest(recoverySecret);
      setRecoverySuccess(true);
      setRecoverySecret("");
    } catch (err) {
      setRecoveryError(err.message);
    } finally {
      setRecoverySubmitting(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.heading}>Admin Login</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          {...register("email", { required: true })}
        />
        {errors.email && <p className={styles.fieldError}>Email is required</p>}

        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className={styles.fieldError}>Password is required</p>
        )}

        {serverError && <p className={styles.serverError}>{serverError}</p>}

        <button type="submit" className={styles.submitButton}>
          Log In
        </button>
      </form>

      <button
        type="button"
        className={styles.forgotLink}
        onClick={() => setShowRecovery((v) => !v)}
      >
        Forgot password?
      </button>

      {showRecovery && (
        <form className={styles.recoveryForm} onSubmit={handleRecoverySubmit}>
          <p className={styles.recoveryHint}>
            Enter the recovery secret to reset your password back to the
            server's configured seed password.
          </p>
          <input
            type="password"
            placeholder="Recovery secret"
            className={styles.input}
            value={recoverySecret}
            onChange={(e) => setRecoverySecret(e.target.value)}
          />

          {recoveryError && <p className={styles.fieldError}>{recoveryError}</p>}
          {recoverySuccess && (
            <p className={styles.successMessage}>
              Password reset. Log in with the seed password.
            </p>
          )}

          <button
            type="submit"
            className={styles.recoveryButton}
            disabled={recoverySubmitting || !recoverySecret}
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}

export default AdminLogin;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginRequest } from "../api/auth";
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
    </div>
  );
}

export default AdminLogin;

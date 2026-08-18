import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {
  fetchAllServices,
  createService,
  updateService,
  deleteService,
  toggleServiceActive,
} from "../api/services";
import { formatNaira } from "../utils/currency";
import styles from "./ServiceManager.module.css";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ServiceManager() {
  const { token } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      category: "HOME_CARE",
      pricingType: "PER_UNIT",
      unitPrice: "",
      unitLabel: "",
      tierLabel: "",
      description: "",
      order: 0,
    },
  });

  const category = watch("category");
  const pricingType = watch("pricingType");

  async function loadServices() {
    setLoading(true);
    try {
      const data = await fetchAllServices(token);
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  function handleNameBlur() {
    // Only auto-fill the slug while creating — never overwrite an
    // existing slug when editing, since that could break anything
    // referencing it elsewhere.
    if (!editingId && !getValues("slug")) {
      setValue("slug", slugify(getValues("name")));
    }
  }

  async function onSubmit(formData) {
    setError("");
    try {
      const payload = {
        ...formData,
        unitPrice: Number(formData.unitPrice),
        order: Number(formData.order),
        unitLabel: formData.pricingType === "PER_UNIT" ? formData.unitLabel : null,
        tierLabel: formData.category === "CAR_CARE" ? formData.tierLabel : null,
      };
      if (editingId) {
        await updateService(token, editingId, payload);
      } else {
        await createService(token, payload);
      }
      reset();
      setEditingId(null);
      await loadServices();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(service) {
    setEditingId(service.id);
    reset({
      name: service.name,
      slug: service.slug,
      category: service.category,
      pricingType: service.pricingType,
      unitPrice: service.unitPrice,
      unitLabel: service.unitLabel || "",
      tierLabel: service.tierLabel || "",
      description: service.description || "",
      order: service.order,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    reset({
      name: "",
      slug: "",
      category: "HOME_CARE",
      pricingType: "PER_UNIT",
      unitPrice: "",
      unitLabel: "",
      tierLabel: "",
      description: "",
      order: 0,
    });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this service?")) return;
    await deleteService(token, id);
    await loadServices();
  }

  async function handleToggleActive(id) {
    await toggleServiceActive(token, id);
    await loadServices();
  }

  const homeCareServices = services.filter((s) => s.category === "HOME_CARE");
  const carCareServices = services.filter((s) => s.category === "CAR_CARE");

  return (
    <div className={styles.wrap}>
      <div className={styles.formCard}>
        <h3>{editingId ? "Edit Service" : "New Service"}</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="text"
            placeholder="Name (e.g. Bedroom)"
            className={styles.input}
            {...register("name", { required: true, onBlur: handleNameBlur })}
          />
          {errors.name && <p className={styles.fieldError}>Name is required</p>}

          <input
            type="text"
            placeholder="Slug (e.g. bedroom)"
            className={styles.input}
            {...register("slug", { required: true })}
          />
          {errors.slug && <p className={styles.fieldError}>Slug is required</p>}

          <div className={styles.row}>
            <label className={styles.label}>
              Category
              <select className={styles.select} {...register("category", { required: true })}>
                <option value="HOME_CARE">Home Care</option>
                <option value="CAR_CARE">Car Care</option>
              </select>
            </label>

            <label className={styles.label}>
              Pricing
              <select className={styles.select} {...register("pricingType", { required: true })}>
                <option value="PER_UNIT">Per Unit (stepper)</option>
                <option value="FLAT">Flat (checkbox)</option>
              </select>
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.label}>
              Unit Price (₦)
              <input
                type="number"
                step="0.01"
                className={styles.input}
                {...register("unitPrice", { required: true, min: 0 })}
              />
            </label>

            <label className={styles.label}>
              Display Order
              <input
                type="number"
                className={styles.input}
                {...register("order", { required: true })}
              />
            </label>
          </div>
          {errors.unitPrice && <p className={styles.fieldError}>A valid price is required</p>}

          {pricingType === "PER_UNIT" && (
            <label className={styles.label}>
              Unit Label (e.g. window, bedroom, car)
              <input
                type="text"
                className={styles.input}
                {...register("unitLabel", { required: pricingType === "PER_UNIT" })}
              />
            </label>
          )}
          {errors.unitLabel && (
            <p className={styles.fieldError}>Unit label is required for per-unit pricing</p>
          )}

          {category === "CAR_CARE" && (
            <label className={styles.label}>
              Tier Label (e.g. "2 times /week")
              <input
                type="text"
                className={styles.input}
                {...register("tierLabel", { required: category === "CAR_CARE" })}
              />
            </label>
          )}
          {errors.tierLabel && (
            <p className={styles.fieldError}>Tier label is required for Car Care</p>
          )}

          <textarea
            placeholder="Description / tooltip text (optional)"
            className={styles.textarea}
            {...register("description")}
          />

          {error && <p className={styles.fieldError}>{error}</p>}

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {editingId ? "Save Changes" : "Add Service"}
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
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p>No services yet — add your first one on the left.</p>
        ) : (
          <>
            {homeCareServices.length > 0 && (
              <div className={styles.categoryGroup}>
                <p className={styles.categoryHeading}>Home Care</p>
                <ServiceList
                  items={homeCareServices}
                  onEdit={startEdit}
                  onDelete={handleDelete}
                  onToggle={handleToggleActive}
                />
              </div>
            )}
            {carCareServices.length > 0 && (
              <div className={styles.categoryGroup}>
                <p className={styles.categoryHeading}>Car Care</p>
                <ServiceList
                  items={carCareServices}
                  onEdit={startEdit}
                  onDelete={handleDelete}
                  onToggle={handleToggleActive}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ServiceList({ items, onEdit, onDelete, onToggle }) {
  return (
    <div className={styles.list}>
      {items.map((service) => (
        <div key={service.id} className={styles.row2}>
          <div>
            <p className={styles.name}>
              {service.name}
              {service.tierLabel ? ` — ${service.tierLabel}` : ""}
            </p>
            <p className={styles.meta}>
              {formatNaira(service.unitPrice)}
              {service.unitLabel ? ` /${service.unitLabel}` : ""} ·{" "}
              {service.pricingType === "PER_UNIT" ? "Per unit" : "Flat"} · Order {service.order}
            </p>
            <span
              className={`${styles.badge} ${
                service.isActive ? styles.badgeActive : styles.badgeInactive
              }`}
            >
              {service.isActive ? "Active" : "Hidden"}
            </span>
          </div>
          <div className={styles.actions}>
            <button onClick={() => onToggle(service.id)}>
              {service.isActive ? "Hide" : "Show"}
            </button>
            <button onClick={() => onEdit(service)}>Edit</button>
            <button className={styles.deleteButton} onClick={() => onDelete(service.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServiceManager;

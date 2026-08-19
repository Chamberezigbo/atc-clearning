import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {
  fetchAllInvoices,
  createInvoice,
  downloadInvoicePdf,
  sendInvoiceEmail,
} from "../api/invoices";
import { updateBookingStatus } from "../api/bookings";
import { formatNaira } from "../utils/currency";
import { buildWhatsAppShareUrl } from "../utils/whatsapp";
import styles from "./InvoiceManager.module.css";

const API_URL = import.meta.env.VITE_API_URL;

const emptyLineItem = { description: "", quantity: 1, unitPrice: "" };

function InvoiceManager() {
  const { token } = useAuth();
  const location = useLocation();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      clientName: "",
      clientEmail: "",
      lineItems: [emptyLineItem],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "lineItems" });
  const watchedLineItems = watch("lineItems");

  const liveTotal = watchedLineItems.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    return sum + qty * price;
  }, 0);

  async function loadInvoices() {
    setLoading(true);
    const data = await fetchAllInvoices(token);
    setInvoices(data);
    setLoading(false);
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  // Arrives here from BookingsManager's "Create Invoice" button with
  // location.state.prefill — pre-fill the form once on mount.
  const prefill = location.state?.prefill;
  const bookingId = location.state?.bookingId;
  useEffect(() => {
    if (prefill) {
      reset(prefill);
    }
  }, [prefill]);

  async function onSubmit(formData) {
    setError("");
    try {
      await createInvoice(token, formData);
      if (bookingId) {
        await updateBookingStatus(token, bookingId, "invoiced");
      }
      reset({ clientName: "", clientEmail: "", lineItems: [emptyLineItem] });
      await loadInvoices();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDownload(id) {
    try {
      await downloadInvoicePdf(token, id);
    } catch (err) {
      setActionMessage(err.message);
    }
  }

  async function handleSendEmail(id) {
    setActionMessage("");
    try {
      await sendInvoiceEmail(token, id);
      setActionMessage("Email sent!");
      await loadInvoices();
    } catch (err) {
      setActionMessage(err.message);
    }
  }

  function handleShareWhatsApp(invoice) {
    const shareUrl = `${API_URL}/api/invoices/${invoice.id}/pdf`;
    const message = `Hi ${invoice.clientName}, here's your ATClean invoice for ${formatNaira(
      invoice.totalAmount,
    )}:\n${shareUrl}`;
    window.open(buildWhatsAppShareUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.formCard}>
        <h3>New Invoice</h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="text"
            placeholder="Client name"
            className={styles.input}
            {...register("clientName", { required: true })}
          />
          {errors.clientName && <p className={styles.fieldError}>Client name is required</p>}

          <input
            type="email"
            placeholder="Client email"
            className={styles.input}
            {...register("clientEmail", { required: true })}
          />
          {errors.clientEmail && <p className={styles.fieldError}>Client email is required</p>}

          <p className={styles.lineItemsHeading}>Line Items</p>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.lineItemRow}>
              <input
                type="text"
                placeholder="Description"
                className={styles.input}
                {...register(`lineItems.${index}.description`, { required: true })}
              />
              <input
                type="number"
                placeholder="Qty"
                className={styles.input}
                {...register(`lineItems.${index}.quantity`, { required: true, min: 1 })}
              />
              <input
                type="number"
                step="0.01"
                placeholder="Unit price"
                className={styles.input}
                {...register(`lineItems.${index}.unitPrice`, { required: true, min: 0 })}
              />
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            className={styles.addButton}
            onClick={() => append(emptyLineItem)}
          >
            + Add line item
          </button>

          <p className={styles.totalPreview}>Total: {formatNaira(liveTotal)}</p>

          {error && <p className={styles.fieldError}>{error}</p>}

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            Create Invoice
          </button>
        </form>
      </div>

      <div>
        {actionMessage && <p className={styles.meta}>{actionMessage}</p>}
        {loading ? (
          <p>Loading invoices...</p>
        ) : invoices.length === 0 ? (
          <p>No invoices yet.</p>
        ) : (
          <div className={styles.list}>
            {invoices.map((invoice) => (
              <div key={invoice.id} className={styles.row}>
                <div>
                  <p className={styles.clientName}>
                    {invoice.clientName}
                    <span
                      className={`${styles.badge} ${
                        invoice.status === "sent" ? styles.badgeSent : styles.badgeGenerated
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </p>
                  <p className={styles.meta}>
                    {invoice.clientEmail} · {new Date(invoice.createdAt).toLocaleDateString()}
                  </p>
                  <p className={styles.total}>{formatNaira(invoice.totalAmount)}</p>
                </div>
                <div className={styles.rowActions}>
                  <button onClick={() => handleDownload(invoice.id)}>Download PDF</button>
                  <button onClick={() => handleSendEmail(invoice.id)}>Send Email</button>
                  <button onClick={() => handleShareWhatsApp(invoice)}>Send via WhatsApp</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InvoiceManager;

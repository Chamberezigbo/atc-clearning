import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchAllBookings, updateBookingStatus } from "../api/bookings";
import { formatNaira } from "../utils/currency";
import styles from "./BookingsManager.module.css";

function BookingsManager() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    setLoading(true);
    const data = await fetchAllBookings(token);
    setBookings(data);
    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleStatusChange(id, status) {
    await updateBookingStatus(token, id, status);
    await loadBookings();
  }

  function handleCreateInvoice(booking) {
    navigate("/admin/invoices", {
      state: {
        prefill: {
          clientName: booking.name,
          clientEmail: booking.email,
          lineItems: booking.lineItems.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
        bookingId: booking.id,
      },
    });
  }

  if (loading) return <p>Loading bookings...</p>;
  if (bookings.length === 0) return <p>No bookings yet.</p>;

  return (
    <div className={styles.list}>
      {bookings.map((booking) => (
        <div key={booking.id} className={styles.card}>
          <div className={styles.topRow}>
            <div>
              <p className={styles.name}>{booking.name}</p>
              <p className={styles.meta}>
                {booking.email} · {booking.phone} · {booking.location}
              </p>
              <p className={styles.meta}>
                {booking.category === "HOME_CARE" ? "Home Care" : "Car Care"} ·{" "}
                {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className={styles.total}>{formatNaira(booking.totalAmount)}</p>
          </div>

          <div className={styles.actions} style={{ marginTop: "0.75rem" }}>
            <select
              className={styles.statusSelect}
              value={booking.status}
              onChange={(e) => handleStatusChange(booking.id, e.target.value)}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="invoiced">Invoiced</option>
            </select>
            <button
              className={styles.invoiceButton}
              onClick={() => handleCreateInvoice(booking)}
            >
              Create Invoice
            </button>
          </div>

          <details className={styles.details}>
            <summary>{booking.lineItems.length} line item(s)</summary>
            <ul className={styles.lineItems}>
              {booking.lineItems.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.description} × {item.quantity}
                  </span>
                  <span>{formatNaira(Number(item.quantity) * Number(item.unitPrice))}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
}

export default BookingsManager;

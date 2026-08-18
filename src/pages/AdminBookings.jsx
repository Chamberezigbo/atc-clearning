import BookingsManager from "../admin/BookingsManager";

function AdminBookings() {
  return (
    <div>
      <h1>Bookings</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        Booking requests submitted through the site calculator.
      </p>
      <BookingsManager />
    </div>
  );
}

export default AdminBookings;

import TestimonialManager from "../admin/TestimonialManager";

function AdminTestimonials() {
  return (
    <div>
      <h1>Testimonials</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        Approve, reject, or remove submitted testimonials.
      </p>
      <TestimonialManager />
    </div>
  );
}

export default AdminTestimonials;

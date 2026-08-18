import HeroSlideManager from "../admin/HeroSlideManager";

function AdminHeroSlides() {
  return (
    <div>
      <h1>Hero Slides</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        Control the homepage hero carousel — tip text, image, order, and visibility.
      </p>
      <HeroSlideManager />
    </div>
  );
}

export default AdminHeroSlides;

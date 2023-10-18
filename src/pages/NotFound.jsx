import error from "@/assets/404.svg";

const NotFound = () => {
  return (
    <section class="error-section">
      <div class="error-container">
        <div class="error-message">
          <h1 class="error-title">404</h1>
          <p class="error-heading">Whoops! That page doesn’t exist.</p>
        </div>
        <img class="error-image" src={error} alt="404" />
      </div>
    </section>
  );
};

export default NotFound;

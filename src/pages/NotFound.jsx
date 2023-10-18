import error from "@/assets/404.svg";

const NotFound = () => {
  return (
    <section className="error-section">
      <div className="error-container">
        <div className="error-message">
          <h1 className="error-title">404</h1>
          <p className="error-heading">{`Whoops! That page doesn't exist.`}</p>
        </div>
        <img className="error-image" src={error} alt="404" />
      </div>
    </section>
  );
};

export default NotFound;

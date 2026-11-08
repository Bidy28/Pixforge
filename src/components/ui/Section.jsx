export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`scroll-mt-20 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-content px-6 sm:px-8">{children}</div>
    </section>
  );
}

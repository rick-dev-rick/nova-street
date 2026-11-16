export default function HomeSignature() {
  return (
    <section className="home-signature" data-nova-theme="dark" aria-labelledby="home-signature-title">
      <div className="home-signature-light" aria-hidden="true" />
      <div className="home-signature-type">
        <div className="home-signature-depth" aria-hidden="true">
          <span>NØVA</span><span>STREET</span>
        </div>
        <h2 className="home-signature-wordmark" id="home-signature-title">
          <span className="home-signature-mask"><span>NØVA</span></span>{' '}
          <span className="home-signature-mask"><span>STREET</span></span>
        </h2>
      </div>
    </section>
  )
}

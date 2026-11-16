import '../styles/kinetic-band.css'

export default function KineticBand() {
  return (
    <section className="kinetic-band" aria-labelledby="kinetic-title" data-nova-theme="dark">
      <div className="kinetic-band-inner">
        <h2 className="kinetic-band-title" id="kinetic-title" lang="en">
          <span>NO RULES.</span>{' '}
          <span>JUST STREET.</span>
        </h2>
        <p className="kinetic-band-outline">NØVA STREET</p>
        <p className="kinetic-band-accent" lang="en">MOVE DIFFERENT.</p>
      </div>
    </section>
  )
}

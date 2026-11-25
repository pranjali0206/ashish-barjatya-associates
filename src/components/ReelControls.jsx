// Previous / pause / next buttons for a useReel carousel.
export default function ReelControls({ reel, label, light }) {
  const { paused, setPaused, nudge } = reel
  return (
    <div className={`reel-ctrl${light ? ' light' : ''}`} role="group" aria-label={label}>
      <button type="button" onClick={() => nudge(-1)} aria-label="Previous photo">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
      </button>
      <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play the reel' : 'Pause the reel'}>
        {paused
          ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor" stroke="none" /></svg>
          : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>}
      </button>
      <button type="button" onClick={() => nudge(1)} aria-label="Next photo">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
      </button>
    </div>
  )
}

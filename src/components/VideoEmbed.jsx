import { useState } from 'react'

/* Click-to-load YouTube Shorts player (9:16). Shows the poster until tapped,
   then loads the iframe — so a page with several videos stays light. */
export default function VideoEmbed({ id, title }) {
  const [on, setOn] = useState(false)
  return (
    <figure className="vid">
      <div className="vid-frame">
        {on ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
          />
        ) : (
          <button type="button" className="vid-play" onClick={() => setOn(true)} aria-label={`Play: ${title}`}>
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="vid-btn" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5l12 7-12 7z" fill="currentColor" /></svg></span>
          </button>
        )}
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  )
}

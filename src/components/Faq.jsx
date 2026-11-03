import { FAQS } from '../data'

export default function Faq() {
  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">Questions</span>
          <h2>Things families ask us first.</h2>
        </div>
        <div className="faq">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a || <span className="todo">[TO FILL] answer</span>}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

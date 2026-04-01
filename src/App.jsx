import { useState, useEffect, useRef } from 'react';
import { questions } from './questions.js';
import { Chamomile, Peony, FloatingPetal } from './Flowers.jsx';
import confetti from 'canvas-confetti';

function AmbientPetals({ count = 8 }) {
  const petals = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i, left: `${Math.random() * 95}%`,
      delay: `${Math.random() * 8}s`, duration: `${5 + Math.random() * 5}s`,
      color: i % 3 === 0 ? '#e9c349' : '#ffb3b1', size: 10 + Math.random() * 14,
    }))
  ).current;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {petals.map(p => (
        <div key={p.id} className="petal" style={{ left: p.left, bottom: '-20px', animationDelay: p.delay, animationDuration: p.duration }}>
          <FloatingPetal color={p.color} size={p.size} />
        </div>
      ))}
    </div>
  );
}

function BackgroundOrbs({ chaos = false }) {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '8%', right: '5%', width: chaos ? 500 : 380, height: chaos ? 500 : 380, background: `radial-gradient(circle, ${chaos ? 'rgba(180,0,30,0.28)' : 'rgba(138,0,26,0.18)'} 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(40px)', transition: 'all 600ms ease', animation: chaos ? 'sway 2s ease-in-out infinite' : 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '-5%', width: chaos ? 420 : 320, height: chaos ? 420 : 320, background: `radial-gradient(circle, ${chaos ? 'rgba(233,195,73,0.15)' : 'rgba(233,195,73,0.08)'} 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(50px)', transition: 'all 600ms ease', animation: chaos ? 'sway-r 2.5s ease-in-out infinite' : 'none' }} />
      <div style={{ position: 'absolute', top: '45%', left: '30%', width: 500, height: 300, background: `radial-gradient(ellipse, ${chaos ? 'rgba(255,100,130,0.1)' : 'rgba(255,179,177,0.04)'} 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(60px)', transition: 'all 600ms ease' }} />
      {chaos && (
        <>
          <div style={{ position: 'absolute', top: '5%', right: '30%', width: 180, height: 180, background: 'radial-gradient(circle, rgba(138,0,26,0.2) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(30px)', animation: 'sway-r 3s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '20%', left: '25%', width: 220, height: 220, background: 'radial-gradient(circle, rgba(255,100,130,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(35px)', animation: 'sway 2.2s ease-in-out infinite' }} />
        </>
      )}
    </div>
  );
}

function Nav({ current, total, score }) {
  const pct = (current / (total - 2)) * 100;
  return (
    <nav>
      <div className="font-headline" style={{ fontSize: '1.2rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--primary)', letterSpacing: '-0.02em' }}>
        Mildly bullshit promo idea
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tertiary)', marginBottom: 4 }}>Progress</div>
          <div className="progress-track" style={{ width: 120 }}>
            <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%` }} />
          </div>
        </div>
        <div className="score-badge">{score} correct</div>
      </div>
    </nav>
  );
}

function IntroScreen({ onStart }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10%', right: '7%', animation: 'sway 5s ease-in-out infinite' }}><Chamomile size={110} style={{ opacity: 0.75 }} /></div>
      <div style={{ position: 'absolute', top: '14%', left: '6%', animation: 'sway-r 6s ease-in-out infinite' }}><Peony size={120} style={{ opacity: 0.65 }} /></div>
      <div style={{ position: 'absolute', bottom: '18%', right: '10%', animation: 'sway 7s ease-in-out infinite 1s' }}><Peony size={90} style={{ opacity: 0.5 }} /></div>
      <div style={{ position: 'absolute', bottom: '20%', left: '8%', animation: 'sway-r 5.5s ease-in-out infinite 0.5s' }}><Chamomile size={80} style={{ opacity: 0.55 }} /></div>
      <div style={{ maxWidth: 640, textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div className="anim-rise-0" style={{ fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--tertiary)', marginBottom: '1.5rem', fontWeight: 700 }}>
          A Curated April Fools' Experience
        </div>
        <h1 className="font-headline anim-rise-1" style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--on-surface)', marginBottom: '0.4rem' }}>
          The <em style={{ color: 'var(--primary)' }}>Mildly</em>
        </h1>
        <h1 className="font-headline anim-rise-1" style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--on-surface)', marginBottom: '2rem' }}>
          bullshit promo idea
        </h1>
        <p className="anim-rise-2" style={{ color: 'var(--on-surface-variant)', fontSize: '1.05rem', lineHeight: 1.75, fontWeight: 300, maxWidth: 460, margin: '0 auto 3rem' }}>
          A journey through history's most sophisticated pranks. Ten questions stand between you and the grand reveal. lemao
        </p>
        <button className="bloom-gradient btn-press anim-rise-3" onClick={onStart} style={{ color: 'white', border: 'none', borderRadius: '9999px', padding: '1.1rem 3rem', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', letterSpacing: '0.02em', boxShadow: '0 8px 30px rgba(138,0,26,0.4), 0 0 60px rgba(255,179,177,0.1)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Begin the journey →
        </button>
      </div>
    </div>
  );
}

function TransitionScreen({ onNext }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '2rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '15%', left: '15%', animation: 'sway 4s ease-in-out infinite' }}><Chamomile size={70} style={{ opacity: 0.45 }} /></div>
      <div style={{ position: 'absolute', top: '15%', right: '15%', animation: 'sway-r 5s ease-in-out infinite' }}><Peony size={75} style={{ opacity: 0.4 }} /></div>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div className="anim-rise-0" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--tertiary)', marginBottom: '1.5rem', fontWeight: 700 }}>Pre-Finale Moment</div>
        <h2 className="font-headline anim-rise-1" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--on-surface)', marginBottom: '1rem', lineHeight: 1.1 }}>FINAL QUESTION NEXT.</h2>
        <p className="anim-rise-2" style={{ color: 'var(--on-surface-variant)', fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '3rem' }}>Are you ready to get your scores?</p>
        <button className="bloom-gradient btn-press anim-rise-3" onClick={onNext} style={{ color: 'white', border: 'none', borderRadius: '9999px', padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 30px rgba(138,0,26,0.4)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Yes, I'm ready
        </button>
      </div>
    </div>
  );
}

function YesOverlay() {
  useEffect(() => {
    const fire = (ratio, opts) => confetti({ origin: { y: 0.6 }, ...opts, particleCount: Math.floor(200 * ratio) });
    setTimeout(() => {
      fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ffb3b1', '#e9c349', '#ffffff'] });
      fire(0.2, { spread: 60, colors: ['#ffb3b1', '#ff8fa0', '#ffeedd'] });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#ffb3b1', '#e9c349', '#ffffff'] });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }, 300);
    setTimeout(() => { fire(0.3, { spread: 70, colors: ['#ffb3b1', '#e9c349'] }); }, 1800);
    setTimeout(() => { fire(0.45, { spread: 130, startVelocity: 65, colors: ['#ffb3b1', '#e9c349', '#ffffff', '#ff8fa0'] }); }, 3200);
  }, []);

  return (
    <div className="yes-overlay">
      <div style={{ position: 'absolute', top: '6%', left: '8%', animation: 'sway 4s ease-in-out infinite' }}><Peony size={100} style={{ opacity: 0.7 }} /></div>
      <div style={{ position: 'absolute', top: '8%', right: '10%', animation: 'sway-r 5s ease-in-out infinite' }}><Chamomile size={95} style={{ opacity: 0.65 }} /></div>
      <div style={{ position: 'absolute', bottom: '10%', left: '12%', animation: 'sway-r 6s ease-in-out infinite 1s' }}><Chamomile size={75} style={{ opacity: 0.5 }} /></div>
      <div style={{ position: 'absolute', bottom: '8%', right: '8%', animation: 'sway 5s ease-in-out infinite 0.5s' }}><Peony size={85} style={{ opacity: 0.55 }} /></div>
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,179,177,0.3)', animation: 'sparkle 2s ease-out 0.5s both' }} />
      <div style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', border: '1px solid rgba(255,179,177,0.12)', animation: 'sparkle 2.5s ease-out 0.8s both' }} />
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '2rem', maxWidth: 640 }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem', display: 'inline-block', animation: 'yes-heart 0.8s var(--ease-spring) both, heartbeat 1.8s ease-in-out 1.2s infinite' }}>
          💗🎉💗
        </div>
        <h2 className="font-headline" style={{ fontSize: 'clamp(3.5rem, 12vw, 8.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--primary)', fontStyle: 'italic', animation: 'rise 0.8s var(--ease-spring) 200ms both', marginBottom: '0.4rem' }}>
          YOOO
        </h2>
        <h2 className="font-headline" style={{ fontSize: 'clamp(2.8rem, 9vw, 6.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--on-surface)', animation: 'rise 0.8s var(--ease-spring) 350ms both', marginBottom: '2.5rem' }}>
          LESGOOO 🚀
        </h2>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 400, maxWidth: 460, margin: '0 auto 2.5rem', animation: 'rise 0.7s var(--ease-out-expo) 550ms both', background: 'rgba(255,179,177,0.07)', border: '1px solid rgba(255,179,177,0.15)', borderRadius: '1rem', padding: '1.25rem 1.5rem' }}>
          plis send a ss of this to me, cuz idk what u selected, zanku 🙏
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', animation: 'rise 0.7s var(--ease-out-expo) 700ms both', flexWrap: 'wrap' }}>
          {['🌸', '💐', '🌼', '💕', '🎊', '💕', '🌼', '💐', '🌸'].map((e, i) => (
            <span key={i} style={{ fontSize: '1.6rem' }}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AprilFoolsOverlay({ onBack }) {
  return (
    <div className="fools-overlay">
      <div className="fools-text">GET APRIL<br />FOOL'D LMAO L</div>
      <p className="fools-sub">bro really thought</p>
      <button onClick={onBack} style={{ marginTop: '3rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', borderRadius: '9999px', padding: '0.7rem 2rem', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 200ms ease' }}
        onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,61,61,0.5)'; e.currentTarget.style.color = '#ff6b6b'; }}
        onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
      >
        ← exit
      </button>
    </div>
  );
}

function ProposalCard({ onYes, onNo, onChaosTrigger }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [bgChaos, setBgChaos] = useState(false);
  const containerRef = useRef(null);

  const RUNAWAY_LIMIT = 3;

  const noLabels = [
    "No, I don't accept",
    "nope, not happening 😄",
    "stop trying 😅",
    "ur not getting me 🤣",
    "...fine. click me then.",
  ];

  const runAway = () => {
    if (noAttempts >= RUNAWAY_LIMIT) return; // already surrendered — let onClick handle it
    const next = noAttempts + 1;
    setNoAttempts(next);
    if (!bgChaos) { setBgChaos(true); onChaosTrigger(true); }
    const bounds = containerRef.current ? containerRef.current.getBoundingClientRect() : { width: 600, height: 700 };
    const maxX = Math.min(bounds.width * 0.36, 190);
    const maxY = Math.min(bounds.height * 0.28, 120);
    setNoPos({ x: (Math.random() - 0.5) * 2 * maxX, y: (Math.random() - 0.5) * 2 * maxY });
  };

  const handleNoClick = () => {
    if (noAttempts >= RUNAWAY_LIMIT) { onNo(); return; }
    runAway();
  };

  const labelIdx = Math.min(noAttempts, noLabels.length - 1);
  const surrendered = noAttempts >= RUNAWAY_LIMIT;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10%', left: '4%', animation: bgChaos ? 'sway-r 1.5s ease-in-out infinite' : 'sway-r 5s ease-in-out infinite' }}><Peony size={130} style={{ opacity: bgChaos ? 0.9 : 0.7, transition: 'opacity 500ms' }} /></div>
      <div style={{ position: 'absolute', top: '8%', right: '4%', animation: bgChaos ? 'sway 1.8s ease-in-out infinite' : 'sway 6s ease-in-out infinite' }}><Chamomile size={120} style={{ opacity: bgChaos ? 0.85 : 0.65, transition: 'opacity 500ms' }} /></div>
      <div style={{ position: 'absolute', bottom: '12%', left: '8%', animation: bgChaos ? 'sway 2s ease-in-out infinite' : 'sway 4.5s ease-in-out infinite 1s' }}><Chamomile size={90} style={{ opacity: bgChaos ? 0.72 : 0.5, transition: 'opacity 500ms' }} /></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '6%', animation: bgChaos ? 'sway-r 1.6s ease-in-out infinite' : 'sway-r 5.5s ease-in-out infinite 0.5s' }}><Peony size={100} style={{ opacity: bgChaos ? 0.78 : 0.55, transition: 'opacity 500ms' }} /></div>

      <div ref={containerRef} className="glass shimmer-border anim-scale-in" style={{ maxWidth: 620, width: '100%', borderRadius: '2rem', padding: 'clamp(2.5rem, 6vw, 5rem)', textAlign: 'center', position: 'relative', zIndex: 10, boxShadow: bgChaos ? '0 1px 2px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3), 0 30px 60px rgba(28,16,16,0.5), 0 0 120px rgba(255,100,130,0.22)' : '0 1px 2px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3), 0 30px 60px rgba(28,16,16,0.5), 0 0 80px rgba(255,179,177,0.08)', transition: 'box-shadow 500ms ease' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '2rem', background: 'radial-gradient(ellipse at 50% 40%, rgba(138,0,26,0.2) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="anim-rise-0" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', display: 'inline-block', animation: 'yes-heart 0.8s var(--ease-spring) 300ms both, heartbeat 2s ease-in-out 1.5s infinite' }}>
            💛
          </div>
          <h2 className="font-headline anim-rise-1" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--on-surface)', marginBottom: '0.3rem' }}>Will you be my</h2>
          <h2 className="font-headline anim-rise-1" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--primary)', fontStyle: 'italic', marginBottom: '2rem' }}>girlfriend?</h2>
          <p className="anim-rise-2" style={{ color: 'var(--on-surface-variant)', fontSize: '1.05rem', lineHeight: 1.75, fontWeight: 300, maxWidth: 420, margin: '0 auto 3rem' }}>
            :3
          </p>

          <div className="anim-rise-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', position: 'relative', minHeight: 90 }}>
            {/* NO button — runs away */}
            <button
              onMouseEnter={surrendered ? undefined : runAway}
              onFocus={surrendered ? undefined : runAway}
              onClick={handleNoClick}
              style={{
                background: surrendered ? 'rgba(255,107,107,0.08)' : 'transparent',
                border: `1px solid ${surrendered ? 'rgba(255,107,107,0.55)' : noAttempts > 0 ? 'rgba(255,107,107,0.3)' : 'rgba(90,64,60,0.4)'}`,
                borderRadius: '9999px', padding: '0.85rem 1.75rem',
                color: surrendered ? '#ff8fa0' : noAttempts > 0 ? 'rgba(255,107,107,0.5)' : 'var(--on-surface-variant)',
                fontSize: '0.9rem', cursor: surrendered ? 'pointer' : 'default',
                fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500, letterSpacing: '0.01em',
                transform: surrendered ? 'translate(0,0)' : `translate(${noPos.x}px, ${noPos.y}px)`,
                transition: 'transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1), color 200ms ease, border-color 200ms ease, background 200ms ease',
                userSelect: 'none',
              }}
            >
              {noLabels[labelIdx]}
            </button>

            {/* YES button */}
            <button onClick={onYes} className="bloom-gradient btn-press" style={{ color: 'white', border: 'none', borderRadius: '9999px', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 900, cursor: 'pointer', letterSpacing: '0.02em', boxShadow: '0 8px 30px rgba(138,0,26,0.5), 0 0 40px rgba(255,179,177,0.15)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Yes! ✨
            </button>
          </div>

          {noAttempts >= 3 && (
            <p style={{ marginTop: '1.5rem', fontSize: '0.78rem', color: 'rgba(255,179,177,0.4)', fontStyle: 'italic', animation: 'fade-in 0.4s ease both' }}>
              (the no button isn't going to cooperate. just saying.)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function QuizCard({ q, qIndex, total, onAnswer, answered, selectedIdx, onNext }) {
  const letters = ['A', 'B', 'C', 'D'];
  const getOptionClass = (i) => {
    let cls = 'answer-option';
    if (!answered) return cls;
    if (i === q.correct) return cls + ' correct';
    if (i === selectedIdx && i !== q.correct) return cls + ' incorrect';
    return cls;
  };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '7rem 1.5rem 6rem' }}>
      <div style={{ position: 'absolute', top: '15%', right: '3%', opacity: 0.28, animation: 'sway 6s ease-in-out infinite', pointerEvents: 'none' }}><Chamomile size={80} /></div>
      <div style={{ position: 'absolute', bottom: '20%', left: '2%', opacity: 0.22, animation: 'sway-r 7s ease-in-out infinite 1s', pointerEvents: 'none' }}><Peony size={70} /></div>
      <div style={{ maxWidth: 760, width: '100%', position: 'relative', zIndex: 10 }}>
        <div className="anim-rise-0" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ height: 1, width: 40, background: 'var(--primary)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>Question {qIndex + 1} of {total - 2}</span>
        </div>
        <div className="glass shimmer-border anim-rise-1 crimson-shadow" style={{ borderRadius: '1.5rem', padding: 'clamp(1.5rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>
          <h2 className="font-headline" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', fontWeight: 700, lineHeight: 1.35, color: 'var(--on-surface)', marginBottom: '2rem', letterSpacing: '-0.01em' }}>{q.question}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {q.options.map((opt, i) => (
              <button key={i} className={getOptionClass(i)} onClick={() => !answered && onAnswer(i)} disabled={answered} style={{ cursor: answered ? 'default' : 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.05em', color: answered && i === q.correct ? '#50dca0' : answered && i === selectedIdx ? '#ff6b6b' : 'var(--tertiary)', minWidth: 20, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {answered && i === q.correct ? '✓' : answered && i === selectedIdx ? '✗' : letters[i]}
                  </span>
                  <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', fontWeight: 500 }}>{opt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        {answered && (
          <div className="anim-rise-0" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {q.fact && (
              <div style={{ background: 'rgba(233,195,73,0.06)', border: '1px solid rgba(233,195,73,0.15)', borderLeft: '2px solid var(--tertiary)', borderRadius: '1rem', padding: '1.25rem 1.5rem' }}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tertiary)', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>Did you know?</span>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic' }}>{q.fact}</p>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={onNext} className="bloom-gradient btn-press" style={{ color: 'white', border: 'none', borderRadius: '9999px', padding: '0.85rem 2.25rem', fontSize: '0.95rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 24px rgba(138,0,26,0.4)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {qIndex < total - 4 ? 'Next question →' : 'Continue →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('intro');
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [cardKey, setCardKey] = useState(0);
  const [bgChaos, setBgChaos] = useState(false);

  const quizQs = questions.filter(q => !q.isTransition && !q.isProposal);

  const handleAnswer = (i) => {
    setSelectedIdx(i);
    setAnswered(true);
    if (i === quizQs[qIndex].correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    const next = qIndex + 1;
    if (next >= quizQs.length) { setScreen('transition'); }
    else { setQIndex(next); setAnswered(false); setSelectedIdx(null); setCardKey(k => k + 1); }
  };

  const answeredCount = answered ? qIndex + 1 : qIndex;

  return (
    <>
      <BackgroundOrbs chaos={bgChaos} />
      <AmbientPetals count={10} />

      {screen !== 'intro' && screen !== 'yes' && screen !== 'no' && (
        <Nav current={answeredCount} total={questions.length} score={score} />
      )}

      {screen === 'intro' && <IntroScreen onStart={() => setScreen('quiz')} />}
      {screen === 'quiz' && (
        <QuizCard key={cardKey} q={quizQs[qIndex]} qIndex={qIndex} total={questions.length}
          onAnswer={handleAnswer} answered={answered} selectedIdx={selectedIdx} onNext={handleNext} />
      )}
      {screen === 'transition' && <TransitionScreen onNext={() => setScreen('proposal')} />}
      {screen === 'proposal' && (
        <ProposalCard
          onYes={() => { setBgChaos(false); setScreen('yes'); }}
          onNo={() => setScreen('no')}
          onChaosTrigger={setBgChaos}
        />
      )}
      {screen === 'yes' && <YesOverlay />}
      {screen === 'no' && <AprilFoolsOverlay onBack={() => setScreen('proposal')} />}
    </>
  );
}

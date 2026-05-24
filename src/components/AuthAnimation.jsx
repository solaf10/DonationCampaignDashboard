import { memo } from 'react';
import './AuthAnimation.css';

function AuthAnimation() {
  const particles = Array.from({ length: 25 });

  return (
    <div className='particles-container'>
      {particles.map((_, i) => (
        <span
          key={i}
          className='particle'
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${4 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random(),
            transform: `scale(${0.5 + Math.random()})`,
          }}
        />
      ))}
    </div>
  );
}
export default memo(AuthAnimation);

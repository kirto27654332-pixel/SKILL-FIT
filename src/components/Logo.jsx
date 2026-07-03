import { GYM_INFO } from '../data/content';
import './Logo.css';

export default function Logo({ size = 'md' }) {
  return (
    <a href="#accueil" className={`logo logo--${size}`} aria-label={GYM_INFO.name}>
      <img src="/images/info/logo.jpg" alt={GYM_INFO.name} className="logo__img" />
    </a>
  );
}

import { useState } from 'react';

export default function ImageWithFallback({ src, alt = '', ...rest }) {
  const [failed, setFailed] = useState(false);
  const url = failed || !src ? '/images/placeholder.jpg' : src.startsWith('http') ? src : `${import.meta.env.VITE_API_URL?.replace(/\/api$/, '')}${src}`;
  return <img src={url} alt={alt} onError={() => setFailed(true)} loading="lazy" {...rest} />;
}

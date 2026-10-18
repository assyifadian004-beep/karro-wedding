import DOMPurify from 'dompurify';

export function sanitize(value) {
  if (typeof value !== 'string') return value;
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}

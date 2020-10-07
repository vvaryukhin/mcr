export function blockScroll() {
  const { body, documentElement } = document;
  body.style.overflowY = 'hidden';
  documentElement.style.overflowY = 'hidden';
}

export function unlockScroll() {
  const { body, documentElement } = document;
  body.style.overflowY = '';
  documentElement.style.overflowY = '';
}

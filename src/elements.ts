const { body, documentElement: html } = document;

const modalRoot = document.createElement('div');
modalRoot.id = 'modal-root';

body.appendChild(modalRoot);

export { html, body, modalRoot };

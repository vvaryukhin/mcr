export default function nextFrame(cb: FrameRequestCallback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}

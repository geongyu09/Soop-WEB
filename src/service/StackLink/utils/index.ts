export const isInIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    console.error("[isInIframe] Error checking if in iframe:", e);
    return true;
  }
};

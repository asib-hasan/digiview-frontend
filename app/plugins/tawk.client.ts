declare global {
  interface Window {
    Tawk_API?: Record<string, any>;
    Tawk_LoadStart?: Date;
  }
}

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6a801674c4152c1d515baba7/1k025fe92';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }
  }
});

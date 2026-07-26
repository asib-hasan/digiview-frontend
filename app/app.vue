<template>
  <div>
    <UNotifications />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* ─── Base ─────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  color: #1e293b;
  background: #ffffff;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* ─── Scrollbar ─────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: #15637A; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #1D85A3; }

/* ─── Page Transition ───────────────────────────────────── */
.page-enter-active, .page-leave-active { transition: all 0.3s ease; }
.page-enter-from, .page-leave-to { opacity: 0; transform: translateY(10px); }

/* ─── Dropdown Transition ───────────────────────────────── */
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}

/* ─── Nav link styles ───────────────────────────────────── */
.nav-link {
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  transition: color 0.2s;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  text-decoration: none;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0.75rem;
  width: 0;
  height: 2px;
  background: #f97316;
  transition: width 0.3s ease;
}
.nav-link:hover { color: #fb923c; }
.nav-link:hover::after { width: calc(100% - 1.5rem); }

.nav-link-dark {
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  transition: color 0.2s;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  text-decoration: none;
}
.nav-link-dark::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0.75rem;
  width: 0;
  height: 2px;
  background: #2563eb;
  transition: width 0.3s ease;
}
.nav-link-dark:hover { color: #2563eb; }
.nav-link-dark:hover::after { width: calc(100% - 1.5rem); }

/* ─── Hero grid pattern ─────────────────────────────────── */
.hero-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ─── Keyframes ─────────────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-20px); }
}

/* ─── Animation utility classes ─────────────────────────── */
.animate-fade-up    { animation: fadeUp 0.7s ease-out forwards; }
.animate-fade-in    { animation: fadeIn 0.6s ease-out forwards; }
.animate-float      { animation: float 6s ease-in-out infinite; }

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
</style>

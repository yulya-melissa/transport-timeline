<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>

@font-face {
  font-family: 'Russo One';
  src: url('./assets/fonts/RussoOne-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('./assets/fonts/Inter-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('./assets/fonts/Inter-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}


:root {
  --bg: #FBF7F0;
  --card-bg: #FFFFFF;
  --text: #2C2416;
  --text-secondary: #6B5E4A;
  --accent: #B5443C;
  --accent-hover: #9A3831;
  --gold: #C4A35A;
  --gold-light: #E0D5B5;
  --border: #D4CFC4;
  --shadow-sm: 0 1px 4px rgba(44, 36, 22, 0.06);
  --shadow: 0 2px 16px rgba(44, 36, 22, 0.10);
  --shadow-lg: 0 4px 24px rgba(44, 36, 22, 0.14);
  --radius-sm: 6px;
  --radius: 10px;
  --radius-lg: 16px;
  --transition: 0.3s ease;
}


*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
  background-color: var(--bg);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: 'Russo One', sans-serif;
  font-weight: 400;
  line-height: 1.3;
}

h1 { font-size: 2.2rem; }
h2 { font-size: 1.6rem; }
h3 { font-size: 1.2rem; }

a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--transition);
}

a:hover {
  color: var(--accent-hover);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

table {
  width: 100%;
  border-collapse: collapse;
}

table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

table tr:last-child td {
  border-bottom: none;
}

table td:first-child {
  font-weight: 600;
  color: var(--text-secondary);
  width: 40%;
}

table td:last-child {
  color: var(--text);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gold);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
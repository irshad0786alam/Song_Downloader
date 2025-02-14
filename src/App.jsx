@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #0a0a0a;
  color: white;
  cursor: none;
}

.cursor {
  width: 20px;
  height: 20px;
  border: 2px solid #4ade80;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 999;
  transition: all 0.1s ease;
  transition-property: width, height, border;
}

.cursor-dot {
  width: 4px;
  height: 4px;
  background: #4ade80;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 999;
}

.glass-morphism {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.animate-title {
  animation: titleGlow 2s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(74, 222, 128, 0.5),
                 0 0 40px rgba(74, 222, 128, 0.3);
  }
  50% {
    text-shadow: 0 0 10px rgba(74, 222, 128, 0.3),
                 0 0 20px rgba(74, 222, 128, 0.2);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    opacity: 0.8;
    filter: brightness(1.2);
  }
}

.bg-gradient-animate {
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.05;
  pointer-events: none;
}

.github-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
  transition: all 0.3s ease;
}

.github-btn:hover {
  transform: scale(1.1) rotate(8deg);
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
}

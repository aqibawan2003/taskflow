import { useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import TodoApp from './components/TodoApp.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';

const systemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export default function App() {
  const [theme, setTheme] = useLocalStorage('taskflow.theme', systemTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <>
      <Navbar theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main>
        <Hero />
        <TodoApp />
        <Features />
      </main>
      <Footer />
    </>
  );
}

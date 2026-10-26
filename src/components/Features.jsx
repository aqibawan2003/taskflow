import { Database, Keyboard, ListFilter, Moon, Pencil, Zap } from 'lucide-react';
import Card from './ui/Card.jsx';

const features = [
  {
    icon: Database,
    title: 'Saved in your browser',
    text: 'Tasks are stored in localStorage. Close the tab, come back tomorrow, and they are still there.',
  },
  {
    icon: Moon,
    title: 'Light and dark mode',
    text: 'Follows your system setting on the first visit. Your choice is remembered after that.',
  },
  {
    icon: ListFilter,
    title: 'Filters',
    text: 'Switch between all, active, and completed tasks, and clear finished ones in one click.',
  },
  {
    icon: Keyboard,
    title: 'Keyboard friendly',
    text: 'Enter adds a task. In edit mode, Enter saves and Escape cancels. Every control has a visible focus ring.',
  },
  {
    icon: Pencil,
    title: 'Edit in place',
    text: 'Fix a typo without deleting and retyping the task.',
  },
  {
    icon: Zap,
    title: 'Small and fast',
    text: 'No backend, no sign-in, no tracking. The whole app loads as one static page.',
  },
];

export default function Features() {
  return (
    <>
      <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="max-w-xl text-3xl font-bold">What you get</h2>
        <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-300">
          A short list of things TaskFlow does, and nothing it doesn&rsquo;t.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="text-3xl font-bold">About TaskFlow</h2>
        <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
          TaskFlow is a React app built with Vite and Tailwind CSS. It has no server: your list lives in your
          browser&rsquo;s localStorage, which means it stays on your device and clearing site data will erase it.
        </p>
      </section>
    </>
  );
}

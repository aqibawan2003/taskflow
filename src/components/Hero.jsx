import { Check } from 'lucide-react';
import Button from './ui/Button.jsx';
import Card from './ui/Card.jsx';

const sample = [
  { text: 'Send project update to the team', done: true },
  { text: 'Book dentist appointment', done: true },
  { text: 'Review pull request #42', done: false },
  { text: 'Plan next week\u2019s groceries', done: false },
];

export default function Hero() {
  const doneCount = sample.filter((t) => t.done).length;

  return (
    <section id="home" className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Organize your day, one task at a time
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          TaskFlow is a plain to-do list. Add a task, check it off, move on. Everything stays in your browser, so
          there is no account to create and nothing to sync.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button as="a" href="#todo" variant="accent" size="lg">
            Start adding tasks
          </Button>
          <Button as="a" href="#features" variant="outline" size="lg">
            Learn more
          </Button>
        </div>
      </div>

      <Card className="w-full max-w-md justify-self-center p-5 lg:justify-self-end" aria-hidden="true">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Today</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {doneCount} of {sample.length} done
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-full rounded-full bg-accent-600" style={{ width: `${(doneCount / sample.length) * 100}%` }} />
        </div>
        <ul className="mt-4 space-y-2">
          {sample.map((t) => (
            <li
              key={t.text}
              className="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-3 dark:border-slate-800"
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                  t.done ? 'border-accent-600 bg-accent-600 text-white' : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                {t.done && <Check size={14} strokeWidth={3} />}
              </span>
              <span
                className={`text-sm ${
                  t.done ? 'text-slate-500 line-through dark:text-slate-400' : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                {t.text}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}

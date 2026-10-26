import { CheckCheck, Github, Linkedin, Twitter } from 'lucide-react';

const quick = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Contact', href: '#contact' },
];

const social = [
  { label: 'GitHub', icon: Github },
  { label: 'Twitter', icon: Twitter },
  { label: 'LinkedIn', icon: Linkedin },
];

export default function Footer() {
  return (
    <footer id="contact" className="mt-12 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              <CheckCheck size={18} aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold text-slate-900 dark:text-white">TaskFlow</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-slate-600 dark:text-slate-300">
            A to-do list that stays out of your way.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-sm font-semibold">Quick links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {quick.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            <a href="mailto:hello@taskflow.example" className="hover:text-slate-900 dark:hover:text-white">
              hello@taskflow.example
            </a>
          </p>
          <ul className="mt-4 flex gap-2">
            {social.map(({ label, icon: Icon }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
        &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
      </div>
    </footer>
  );
}

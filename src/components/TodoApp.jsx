import { useMemo, useRef, useState } from 'react';
import { ClipboardList, Plus } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import TodoItem from './TodoItem.jsx';
import Button from './ui/Button.jsx';
import Card from './ui/Card.jsx';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
];

const newId = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage('taskflow.todos', []);
  const [filter, setFilter] = useState('all');
  const [text, setText] = useState('');
  const [removing, setRemoving] = useState([]);
  const inputRef = useRef(null);

  const remaining = useMemo(() => todos.filter((t) => !t.done).length, [todos]);
  const completed = todos.length - remaining;
  const visible = useMemo(
    () =>
      todos.filter((t) => (filter === 'active' ? !t.done : filter === 'completed' ? t.done : true)),
    [todos, filter]
  );

  const add = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTodos((prev) => [{ id: newId(), text: value, done: false }, ...prev]);
    setText('');
    inputRef.current?.focus();
  };

  const toggle = (id) => setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const edit = (id, value) => setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: value } : t)));

  const animateOut = (ids) => {
    setRemoving((r) => [...r, ...ids]);
    setTimeout(() => {
      setTodos((prev) => prev.filter((t) => !ids.includes(t.id)));
      setRemoving((r) => r.filter((id) => !ids.includes(id)));
    }, 200);
  };
  const remove = (id) => animateOut([id]);
  const clearCompleted = () => animateOut(todos.filter((t) => t.done).map((t) => t.id));

  const emptyMessage = {
    all: ['Nothing on your list yet', 'Type a task above and press Enter to add it.'],
    active: ['No active tasks', 'Everything on your list is done.'],
    completed: ['No completed tasks', 'Tasks you check off will show up here.'],
  }[filter];

  return (
    <section id="todo" className="mx-auto max-w-2xl px-4 py-12 sm:px-6 md:py-16">
      <h2 className="text-center text-3xl font-bold">Your tasks</h2>
      <p className="mt-2 text-center text-slate-600 dark:text-slate-300">Saved in this browser. Refresh and they&rsquo;re still here.</p>

      <Card className="mt-8 p-4 sm:p-6">
        <form onSubmit={add} className="flex gap-2">
          <label htmlFor="new-task" className="sr-only">
            New task
          </label>
          <input
            id="new-task"
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={140}
            placeholder="What needs doing?"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
          />
          <Button type="submit" disabled={!text.trim()}>
            <Plus size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Add task</span>
            <span className="sr-only sm:hidden">Add task</span>
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === f.id
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center dark:border-slate-700">
            <ClipboardList className="mx-auto text-slate-500 dark:text-slate-400" size={32} aria-hidden="true" />
            <p className="mt-3 font-medium text-slate-900 dark:text-white">{emptyMessage[0]}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{emptyMessage[1]}</p>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {visible.map((t) => (
              <TodoItem
                key={t.id}
                todo={t}
                removing={removing.includes(t.id)}
                onToggle={toggle}
                onEdit={edit}
                onDelete={remove}
              />
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-sm dark:border-slate-800">
          <span className="text-slate-600 dark:text-slate-300" aria-live="polite">
            {remaining} {remaining === 1 ? 'task' : 'tasks'} left
          </span>
          <Button variant="ghost" size="sm" onClick={clearCompleted} disabled={completed === 0}>
            Clear completed
          </Button>
        </div>
      </Card>
    </section>
  );
}

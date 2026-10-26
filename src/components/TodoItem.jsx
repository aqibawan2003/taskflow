import { useEffect, useRef, useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';

export default function TodoItem({ todo, removing, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const save = () => {
    const text = draft.trim();
    if (text && text !== todo.text) onEdit(todo.id, text);
    if (!text) setDraft(todo.text);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const iconBtn =
    'grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white';

  return (
    <li
      className={`flex animate-itemIn items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition-all duration-200 dark:border-slate-800 dark:bg-slate-900 ${
        removing ? 'translate-x-4 opacity-0' : 'opacity-100'
      }`}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.done ? 'not done' : 'done'}`}
        className="h-5 w-5 shrink-0 cursor-pointer rounded-md border-slate-300 text-accent-700 focus:ring-accent-600 dark:border-slate-600 dark:bg-slate-800"
      />

      {editing ? (
        <>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
              if (e.key === 'Escape') cancel();
            }}
            aria-label="Edit task"
            maxLength={140}
            className="min-w-0 flex-1 rounded-lg border border-brand-500 bg-white px-2 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/40 dark:bg-slate-800 dark:text-white"
          />
          <button type="button" onClick={save} className={iconBtn} aria-label="Save changes">
            <Check size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={cancel} className={iconBtn} aria-label="Cancel editing">
            <X size={18} aria-hidden="true" />
          </button>
        </>
      ) : (
        <>
          <span
            className={`min-w-0 flex-1 break-words text-sm sm:text-base ${
              todo.done ? 'text-slate-500 line-through dark:text-slate-400' : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {todo.text}
          </span>
          <button type="button" onClick={() => setEditing(true)} className={iconBtn} aria-label={`Edit "${todo.text}"`}>
            <Pencil size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => onDelete(todo.id)} className={iconBtn} aria-label={`Delete "${todo.text}"`}>
            <Trash2 size={18} aria-hidden="true" />
          </button>
        </>
      )}
    </li>
  );
}

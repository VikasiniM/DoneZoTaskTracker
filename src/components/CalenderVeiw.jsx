// components/CalendarView.jsx
import { format, parseISO } from 'date-fns';

export default function CalendarView({ tasks }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-semibold mb-2 dark:text-white">📅 Calendar View</h2>
      <ul>
        {tasks
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .map((task) => (
            <li key={task.id} className="mb-1 text-sm text-gray-700 dark:text-gray-300">
              {format(parseISO(task.dueDate), 'PPPpp')} - <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

import ContentWrapper from '@/components/shared/ContentWrapper';
import React, { useState } from 'react'

export default function PendingAction({ initialTasks }) {
  const demoTasks = [
    {
      id: 't1',
      type: 'Fertigation',
      title: 'Fertigation - Field A (Corn)',
      details: 'Apply NPK 20:20:20 through drip system - 200 L/ha',
      scheduledFor: '2025-10-09',
      priority: 'High',
      field: 'Field A',
      cropStage: 'Vegetative',
      completed: false,
    },
    {
      id: 't2',
      type: 'Spray',
      title: 'Spray - Field B (Tomato)',
      details: 'Apply fungicide for early blight (follow label rate)',
      scheduledFor: '2025-10-08',
      priority: 'Medium',
      field: 'Field B',
      cropStage: 'Flowering',
      completed: false,
    },
    {
      id: 't3',
      type: 'Pruning',
      title: 'Pruning - Orchard 3 (Mango)',
      details: 'Thin inner branches and remove crossing limbs',
      scheduledFor: '2025-10-15',
      priority: 'Low',
      field: 'Orchard 3',
      cropStage: 'Dormant',
      completed: false,
    },
  ];

  const [tasks, setTasks] = useState(initialTasks && initialTasks.length ? initialTasks : demoTasks);

  function toggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  return (
    <>
      <h2 className="mt-10 text-xl font-semibold  text-[var(--color-black)]">Pending Actions</h2>
    <div className="rounded-md mt-5 bg-[var(--color-white)]">
      {tasks.length === 0 ? (
        <div className="text-center text-sm text-[var(--color-gray)] py-6">No pending actions.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex flex-col justify-center items-center py-8 rounded-sm  ${
                task.completed
                  ? ' bg-[var(--color-primary-white)] border-[var(--color-black)] text-[var(--color-black)]'
                  : 'bg-[var(--color-white)] border-[var(--color-black)]'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 p-3 ">
                  <span className="text-xl font-semibold text-[var(--color-black)]">{task.title}</span>
                  <span className="text-sm p-2 rounded-md  bg-[var(--color-secondary)] text-[var(--color-white)]">
                    {task.type}
                  </span>
                </div>
                <p className=" px-5 text-sm text-[var(--color-black)]">{task.details}</p>
                <div className="px-5 text-xs text-[var(--color-black)] mt-4 flex flex-wrap gap-2">
                  <span>📅 {new Date(task.scheduledFor).toLocaleDateString()}</span>
                  <span>🌱 {task.cropStage}</span>
                  <span>📍 {task.field}</span>
                  <span>⚡ {task.priority}</span>
                </div>
              </div>
              <div className=" flex justify-center pt-8 text-sm">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="px-2 py-1 border rounded text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-white)]"
                >
                  {task.completed ? 'Undo' : 'Mark Complete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
    
  );
}
import React, { useState } from 'react';
import { Calendar, CheckSquare, Square, Flag, AlertCircle, Clock, ArrowRight } from 'lucide-react';
import { RoadmapPhase, INITIAL_ROADMAP } from '../data/spreadsheetData';

export const TimelineSheet: React.FC = () => {
  const [phases, setPhases] = useState<RoadmapPhase[]>(INITIAL_ROADMAP);

  const toggleTask = (phaseId: string, taskId: string) => {
    setPhases((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          tasks: phase.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      })
    );
  };

  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = phases.reduce(
    (acc, p) => acc + p.tasks.filter((t) => t.completed).length,
    0
  );
  const progressPct = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
            <span>Sheet 6 of 6</span>
            <span aria-hidden="true">·</span>
            <span>Strategic Execution Gantt</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Master Timeline &amp; Action Roadmap (2026 - Dec 2027/2028)
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            5 Phased quarters tracking critical university deadlines, scholarship cycles, and UKVI immigration gates.
          </p>
        </div>

        {/* Milestone Progress */}
        <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-xl flex items-center gap-4 shrink-0">
          <div>
            <div className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider">
              Roadmap Velocity:
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold font-mono text-blue-950 tabular-nums">
                {progressPct}%
              </span>
              <span className="text-xs text-blue-800 font-mono">
                ({completedTasks}/{totalTasks} Cleared)
              </span>
            </div>
          </div>
          <div className="w-20 bg-blue-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-900 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Phased Roadmap Timeline */}
      <div className="space-y-6">
        {phases.map((phase, idx) => {
          const phaseCompleted = phase.tasks.every((t) => t.completed);
          const phaseClearedCount = phase.tasks.filter((t) => t.completed).length;

          return (
            <div
              key={phase.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              <div className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 text-xs font-mono font-bold bg-blue-600 text-white rounded">
                    {phase.phaseNumber}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm tracking-wide text-white">
                      {phase.title}
                    </h3>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Period: <span className="text-amber-300 font-medium">{phase.period}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 font-mono">
                  {phaseClearedCount} / {phase.tasks.length} Milestones
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {phase.description}
                </p>

                <div className="space-y-2.5">
                  {phase.tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(phase.id, task.id)}
                      className={`flex items-start justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        task.completed
                          ? 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          className="mt-0.5 text-slate-400 hover:text-slate-600 focus:outline-hidden"
                          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {task.completed ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                        <div>
                          <span
                            className={`text-xs font-medium leading-snug block ${
                              task.completed ? 'line-through text-slate-500' : 'text-slate-900'
                            }`}
                          >
                            {task.task}
                          </span>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                            <span>Owner: {task.owner}</span>
                            {task.isMilestone && (
                              <span className="text-amber-700 font-semibold flex items-center gap-0.5">
                                <Flag className="w-3 h-3" /> Critical Gate
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                          task.completed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {task.completed ? 'Cleared' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addWorkout, deleteWorkout, addExercise } from '@/store/slices/workoutsSlice';
import { addWeightEntry, deleteWeightEntry } from '@/store/slices/weightSlice';
import { addSleepEntry, deleteSleepEntry } from '@/store/slices/sleepSlice';
import type { Workout, WorkoutFormValues, WeightFormValues, SleepFormValues, Exercise } from '@/types';

import WorkoutCard from '@/components/fitness/WorkoutCard';
import WorkoutForm from '@/components/fitness/WorkoutForm';
import ExerciseForm from '@/components/fitness/ExerciseForm';
import WeightForm from '@/components/fitness/WeightForm';
import SleepForm from '@/components/fitness/SleepForm';
import WaterTracker from '@/components/fitness/WaterTracker';

import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import Card from '@/components/ui/Card';
import { clsx } from '@/utils/helpers';
import { formatDisplayDate } from '@/utils/dateUtils';

type Tab = 'workouts' | 'weight' | 'sleep' | 'water';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'workouts', label: 'Workouts', icon: '💪' },
  { id: 'water',    label: 'Water',    icon: '💧' },
  { id: 'sleep',    label: 'Sleep',    icon: '😴' },
  { id: 'weight',   label: 'Weight',   icon: '⚖️' },
];

const FitnessPage = () => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState<Tab>('workouts');

  const workouts = useAppSelector((s) => s.workouts.items);
  const weightEntries = useAppSelector((s) => s.weight.entries);
  const sleepEntries = useAppSelector((s) => s.sleep.entries);

  const [workoutFormOpen, setWorkoutFormOpen] = useState(false);
  const [weightFormOpen, setWeightFormOpen] = useState(false);
  const [sleepFormOpen, setSleepFormOpen] = useState(false);
  const [exerciseTarget, setExerciseTarget] = useState<Workout | null>(null);
  const [deleteWorkoutId, setDeleteWorkoutId] = useState<string | null>(null);
  const [deleteWeightId, setDeleteWeightId] = useState<string | null>(null);
  const [deleteSleepId, setDeleteSleepId] = useState<string | null>(null);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAddWorkout = (values: WorkoutFormValues) => {
    dispatch(addWorkout(values));
    toast.success('Workout logged!');
    setWorkoutFormOpen(false);
  };

  const handleAddExercise = (values: Omit<Exercise, 'id'>) => {
    if (exerciseTarget) {
      dispatch(addExercise({ workoutId: exerciseTarget.id, exercise: values }));
      toast.success('Exercise added!');
      setExerciseTarget(null);
    }
  };

  const handleAddWeight = (values: WeightFormValues) => {
    dispatch(addWeightEntry(values));
    toast.success('Weight recorded!');
    setWeightFormOpen(false);
  };

  const handleAddSleep = (values: SleepFormValues) => {
    dispatch(addSleepEntry(values));
    toast.success('Sleep logged!');
    setSleepFormOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-5">
      {/* Tab bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              'shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
              tab === t.id
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-surface-800 text-slate-600 dark:text-slate-400 border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700'
            )}
          >
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* ── Workouts Tab ──────────────────────────────────────────────── */}
          {tab === 'workouts' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => setWorkoutFormOpen(true)}>+ Log Workout</Button>
              </div>
              {workouts.length === 0 ? (
                <Card>
                  <EmptyState
                    icon="💪"
                    title="No workouts logged"
                    description="Start tracking your workouts to monitor your fitness journey."
                    actionLabel="Log Workout"
                    onAction={() => setWorkoutFormOpen(true)}
                  />
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workouts.map((w, idx) => (
                    <WorkoutCard
                      key={w.id}
                      workout={w}
                      index={idx}
                      onDelete={setDeleteWorkoutId}
                      onAddExercise={setExerciseTarget}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Water Tab ─────────────────────────────────────────────────── */}
          {tab === 'water' && (
            <div className="max-w-md">
              <WaterTracker />
            </div>
          )}

          {/* ── Sleep Tab ─────────────────────────────────────────────────── */}
          {tab === 'sleep' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => setSleepFormOpen(true)}>+ Log Sleep</Button>
              </div>
              {sleepEntries.length === 0 ? (
                <Card>
                  <EmptyState icon="😴" title="No sleep logged" description="Track your sleep hours and quality." actionLabel="Log Sleep" onAction={() => setSleepFormOpen(true)} />
                </Card>
              ) : (
                <div className="space-y-2">
                  {[...sleepEntries].reverse().map((s) => (
                    <Card key={s.id} className="flex items-center justify-between !p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">😴</span>
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {s.hours}h · Quality {s.quality}/5
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {formatDisplayDate(s.date)} · {s.bedtime}–{s.wakeTime}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => setDeleteSleepId(s.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Weight Tab ────────────────────────────────────────────────── */}
          {tab === 'weight' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => setWeightFormOpen(true)}>+ Log Weight</Button>
              </div>
              {weightEntries.length === 0 ? (
                <Card>
                  <EmptyState icon="⚖️" title="No weight entries" description="Record your weight to track progress over time." actionLabel="Log Weight" onAction={() => setWeightFormOpen(true)} />
                </Card>
              ) : (
                <div className="space-y-2">
                  {[...weightEntries].reverse().map((w) => (
                    <Card key={w.id} className="flex items-center justify-between !p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">⚖️</span>
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{w.weight} kg</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{formatDisplayDate(w.date)}</p>
                        </div>
                      </div>
                      <button onClick={() => setDeleteWeightId(w.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <Modal open={workoutFormOpen} onClose={() => setWorkoutFormOpen(false)} title="Log Workout">
        <WorkoutForm onSubmit={handleAddWorkout} onCancel={() => setWorkoutFormOpen(false)} />
      </Modal>

      <Modal open={!!exerciseTarget} onClose={() => setExerciseTarget(null)} title={`Add Exercise to "${exerciseTarget?.name ?? ''}"`}>
        <ExerciseForm onSubmit={handleAddExercise} onCancel={() => setExerciseTarget(null)} />
      </Modal>

      <Modal open={weightFormOpen} onClose={() => setWeightFormOpen(false)} title="Log Weight">
        <WeightForm onSubmit={handleAddWeight} onCancel={() => setWeightFormOpen(false)} />
      </Modal>

      <Modal open={sleepFormOpen} onClose={() => setSleepFormOpen(false)} title="Log Sleep">
        <SleepForm onSubmit={handleAddSleep} onCancel={() => setSleepFormOpen(false)} />
      </Modal>

      <ConfirmDialog
        open={!!deleteWorkoutId}
        onClose={() => setDeleteWorkoutId(null)}
        onConfirm={() => { if (deleteWorkoutId) { dispatch(deleteWorkout(deleteWorkoutId)); toast.success('Workout deleted'); } }}
        title="Delete Workout"
        message="This will permanently remove this workout and its exercises."
        confirmLabel="Delete"
      />

      <ConfirmDialog
        open={!!deleteWeightId}
        onClose={() => setDeleteWeightId(null)}
        onConfirm={() => { if (deleteWeightId) { dispatch(deleteWeightEntry(deleteWeightId)); toast.success('Entry deleted'); } }}
        title="Delete Weight Entry"
        message="This will permanently remove this weight entry."
        confirmLabel="Delete"
      />

      <ConfirmDialog
        open={!!deleteSleepId}
        onClose={() => setDeleteSleepId(null)}
        onConfirm={() => { if (deleteSleepId) { dispatch(deleteSleepEntry(deleteSleepId)); toast.success('Entry deleted'); } }}
        title="Delete Sleep Entry"
        message="This will permanently remove this sleep entry."
        confirmLabel="Delete"
      />
    </motion.div>
  );
};

export default FitnessPage;

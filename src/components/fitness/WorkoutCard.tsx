import { motion } from 'framer-motion';
import type { Workout } from '@/types';
import { WORKOUT_TYPES } from '@/constants';
import { formatDisplayDate } from '@/utils/dateUtils';
import Badge from '@/components/ui/Badge';

interface WorkoutCardProps {
  workout: Workout;
  onDelete: (id: string) => void;
  onAddExercise: (workout: Workout) => void;
  index?: number;
}

const WorkoutCard = ({ workout, onDelete, onAddExercise, index = 0 }: WorkoutCardProps) => {
  const typeInfo = WORKOUT_TYPES.find((t) => t.value === workout.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      layout
      className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-lg shrink-0">
            {typeInfo?.emoji}
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">{workout.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{formatDisplayDate(workout.date)}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(workout.id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          aria-label="Delete workout"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <Badge label={`${workout.duration} min`} variant="info" />
        {workout.caloriesBurned !== undefined && !Number.isNaN(workout.caloriesBurned) && (
          <Badge label={`${workout.caloriesBurned} kcal`} variant="warning" />
        )}
        <Badge label={typeInfo?.label ?? workout.type} variant="default" />
      </div>

      {workout.exercises.length > 0 && (
        <div className="mt-3 space-y-1.5 border-t border-surface-100 dark:border-surface-700 pt-3">
          {workout.exercises.map((ex) => (
            <div key={ex.id} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0" />
              <span className="font-medium text-slate-700 dark:text-slate-300">{ex.name}</span>
              {ex.sets && ex.reps && <span>· {ex.sets}×{ex.reps}</span>}
              {ex.weight && <span>· {ex.weight}kg</span>}
              {ex.duration && <span>· {ex.duration}min</span>}
              {ex.distance && <span>· {ex.distance}km</span>}
            </div>
          ))}
        </div>
      )}

      {workout.notes && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">"{workout.notes}"</p>
      )}

      <button
        onClick={() => onAddExercise(workout)}
        className="mt-3 text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
      >
        + Add Exercise
      </button>
    </motion.div>
  );
};

export default WorkoutCard;

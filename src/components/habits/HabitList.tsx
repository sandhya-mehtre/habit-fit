import { AnimatePresence } from 'framer-motion';
import type { Habit } from '@/types';
import HabitCard from './HabitCard';
import EmptyState from '@/components/ui/EmptyState';

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

const HabitList = ({ habits, onToggle, onEdit, onDelete, onCreateNew }: HabitListProps) => {
  if (habits.length === 0) {
    return (
      <EmptyState
        icon="🎯"
        title="No habits yet"
        description="Start building better routines by creating your first habit to track."
        actionLabel="Create Habit"
        onAction={onCreateNew}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence mode="popLayout">
        {habits.map((habit, idx) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            index={idx}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HabitList;

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addHabit, updateHabit, deleteHabit, toggleCompletion } from '@/store/slices/habitsSlice';
import type { Habit, HabitFormValues, HabitCategory } from '@/types';

import HabitList from '@/components/habits/HabitList';
import HabitFilterBar from '@/components/habits/HabitFilterBar';
import HabitForm from '@/components/habits/HabitForm';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import Button from '@/components/ui/Button';

const HabitsPage = () => {
  const dispatch = useAppDispatch();
  const habits = useAppSelector((s) => s.habits.items);

  const [filter, setFilter] = useState<HabitCategory | 'all'>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: habits.length };
    habits.forEach((h) => { c[h.category] = (c[h.category] ?? 0) + 1; });
    return c;
  }, [habits]);

  const filteredHabits = useMemo(
    () => (filter === 'all' ? habits : habits.filter((h) => h.category === filter)),
    [habits, filter]
  );

  const openCreateForm = () => { setEditingHabit(null); setFormOpen(true); };
  const openEditForm = (habit: Habit) => { setEditingHabit(habit); setFormOpen(true); };
  const closeForm = () => { setFormOpen(false); setEditingHabit(null); };

  const handleSubmit = (values: HabitFormValues) => {
    if (editingHabit) {
      dispatch(updateHabit({ id: editingHabit.id, values }));
      toast.success('Habit updated!');
    } else {
      dispatch(addHabit(values));
      toast.success('Habit created!');
    }
    closeForm();
  };

  const handleToggle = (id: string) => dispatch(toggleCompletion({ id }));

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      dispatch(deleteHabit(deleteTarget));
      toast.success('Habit deleted');
      setDeleteTarget(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {habits.length} habit{habits.length !== 1 ? 's' : ''} tracked
        </p>
        <Button onClick={openCreateForm} icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }>
          New Habit
        </Button>
      </div>

      {habits.length > 0 && (
        <HabitFilterBar selected={filter} onSelect={setFilter} counts={counts} />
      )}

      <HabitList
        habits={filteredHabits}
        onToggle={handleToggle}
        onEdit={openEditForm}
        onDelete={setDeleteTarget}
        onCreateNew={openCreateForm}
      />

      <Modal open={formOpen} onClose={closeForm} title={editingHabit ? 'Edit Habit' : 'Create Habit'}>
        <HabitForm
          defaultValues={editingHabit ?? undefined}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Habit"
        message="Are you sure you want to delete this habit? All progress and streak data will be permanently lost."
        confirmLabel="Delete"
      />
    </motion.div>
  );
};

export default HabitsPage;

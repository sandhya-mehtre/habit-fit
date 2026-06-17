import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/store/hooks';
import { addHabit } from '@/store/slices/habitsSlice';
import { addWorkout } from '@/store/slices/workoutsSlice';
import { addWeightEntry } from '@/store/slices/weightSlice';
import { addSleepEntry } from '@/store/slices/sleepSlice';
import type { HabitFormValues, WorkoutFormValues, WeightFormValues, SleepFormValues } from '@/types';

import OverviewCards from '@/components/dashboard/OverviewCards';
import TodayProgress from '@/components/dashboard/TodayProgress';
import StreaksWidget from '@/components/dashboard/StreaksWidget';
import WeeklySummary from '@/components/dashboard/WeeklySummary';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import HealthSummary from '@/components/fitness/HealthSummary';

import Modal from '@/components/ui/Modal';
import HabitForm from '@/components/habits/HabitForm';
import WorkoutForm from '@/components/fitness/WorkoutForm';
import WeightForm from '@/components/fitness/WeightForm';
import SleepForm from '@/components/fitness/SleepForm';

import toast from 'react-hot-toast';

type ModalType = 'habit' | 'workout' | 'weight' | 'sleep' | null;

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  const handleAddHabit = (values: HabitFormValues) => {
    dispatch(addHabit(values));
    toast.success('Habit created!');
    closeModal();
  };

  const handleAddWorkout = (values: WorkoutFormValues) => {
    dispatch(addWorkout(values));
    toast.success('Workout logged!');
    closeModal();
  };

  const handleAddWeight = (values: WeightFormValues) => {
    dispatch(addWeightEntry(values));
    toast.success('Weight recorded!');
    closeModal();
  };

  const handleAddSleep = (values: SleepFormValues) => {
    dispatch(addSleepEntry(values));
    toast.success('Sleep logged!');
    closeModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <OverviewCards />

      <QuickActions
        onAddHabit={() => setActiveModal('habit')}
        onAddWorkout={() => setActiveModal('workout')}
        onAddWeight={() => setActiveModal('weight')}
        onAddSleep={() => setActiveModal('sleep')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TodayProgress />
          <HealthSummary />
        </div>
        <div className="space-y-6">
          <StreaksWidget />
          <WeeklySummary />
          <RecentActivity />
        </div>
      </div>

      {/* Modals */}
      <Modal open={activeModal === 'habit'} onClose={closeModal} title="Create Habit">
        <HabitForm onSubmit={handleAddHabit} onCancel={closeModal} />
      </Modal>

      <Modal open={activeModal === 'workout'} onClose={closeModal} title="Log Workout">
        <WorkoutForm onSubmit={handleAddWorkout} onCancel={closeModal} />
      </Modal>

      <Modal open={activeModal === 'weight'} onClose={closeModal} title="Log Weight">
        <WeightForm onSubmit={handleAddWeight} onCancel={closeModal} />
      </Modal>

      <Modal open={activeModal === 'sleep'} onClose={closeModal} title="Log Sleep">
        <SleepForm onSubmit={handleAddSleep} onCancel={closeModal} />
      </Modal>
    </motion.div>
  );
};

export default DashboardPage;

import { getHabitIcon } from '@/constants/icons';
import { clsx } from '@/utils/helpers';

interface HabitIconProps {
  iconKey: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const HabitIcon = ({ iconKey, size = 18, className, style }: HabitIconProps) => {
  const Icon = getHabitIcon(iconKey);
  return <Icon size={size} className={clsx('shrink-0', className)} style={style} strokeWidth={2} />;
};

export default HabitIcon;

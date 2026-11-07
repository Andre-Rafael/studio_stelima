import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const HomeIcon = () => (
  <svg {...base}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
);
export const CalendarIcon = () => (
  <svg {...base}><rect x="3" y="4.5" width="18" height="16.5" rx="2.5" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4" /></svg>
);
export const UsersIcon = () => (
  <svg {...base}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.4 3.3-5.5 6.5-5.5s5.9 2.1 6.5 5.5" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c1.9.8 3.1 2.6 3.5 5.2" /></svg>
);
export const BadgeIcon = () => (
  <svg {...base}><rect x="4" y="3" width="16" height="18" rx="2.5" /><circle cx="12" cy="10" r="3" /><path d="M8 17.5c.6-1.8 2.1-2.8 4-2.8s3.4 1 4 2.8" /></svg>
);
export const SparkleIcon = () => (
  <svg {...base}><path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" /><path d="M19 15.5c.2 1.4 1 2.2 2.5 2.5-1.5.3-2.3 1.1-2.5 2.5-.2-1.4-1-2.2-2.5-2.5 1.5-.3 2.3-1.1 2.5-2.5Z" /></svg>
);
export const PlusIcon = () => (
  <svg {...base}><path d="M12 5v14M5 12h14" /></svg>
);
export const EditIcon = () => (
  <svg {...base} width={17} height={17}><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></svg>
);
export const TrashIcon = () => (
  <svg {...base} width={17} height={17}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
);
export const CheckIcon = () => (
  <svg {...base} width={17} height={17}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const XIcon = () => (
  <svg {...base} width={17} height={17}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const SearchIcon = () => (
  <svg {...base} width={18} height={18}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
);
export const ClockIcon = () => (
  <svg {...base} width={16} height={16}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);

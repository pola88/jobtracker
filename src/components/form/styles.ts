const styles = {
  form: 'grid grid-cols-1 gap-4 md:grid-cols-2',
  field: 'col-span-1',
  fieldFullWidth: 'md:col-span-2 col-span-1',
  footer: 'col-span-1 flex justify-end md:col-span-2',
  groupWrapper: 'col-span-1 md:col-span-2',
  groupGrid: 'grid grid-cols-1 gap-4',
  groupLabel: 'text-lg font-medium mb-4',
};

export const groupColumnsClass: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export default styles;

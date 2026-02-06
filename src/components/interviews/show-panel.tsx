interface ShowPanelProps {
  title: string;
  children: React.ReactNode;
}

export const ShowPanel = ({ title, children }: ShowPanelProps) => (
  <div className='flex-1 pl-4 flex flex-col gap-4'>
    <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
    {children}
  </div>
);

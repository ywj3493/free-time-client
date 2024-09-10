interface ChipProps {
  title: string;
}

export function Chip({ title }: ChipProps) {
  return (
    <div className="bg-blue-400 text-white text-sm rounded-full px-4 py-1">
      {title}
    </div>
  );
}

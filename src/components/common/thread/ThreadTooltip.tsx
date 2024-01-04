const ThreadTooltip = ({ content, className }: { content: string; className?: string }) => {
  return (
    <div className={`absolute z-50 flex items-center justify-center ${className}`}>
      <div className="rounded-md bg-black p-2 text-sm text-white shadow-lg">{content}</div>
      <div className="absolute -bottom-1 z-10 h-3 w-3 rotate-45 bg-black" />
    </div>
  );
};

export default ThreadTooltip;

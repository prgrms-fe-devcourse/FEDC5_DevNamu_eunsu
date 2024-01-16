const ThreadTooltip = ({ content, className }: { content: string; className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="bg-layer-1 text-content-1 rounded-md p-2 text-sm shadow-lg">{content}</div>
      <div className="bg-layer-1 absolute -bottom-1 z-10 h-3 w-3 rotate-45" />
    </div>
  );
};

export default ThreadTooltip;

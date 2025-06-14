const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 rounded-2xl shadow-2xl border bg-white/95 dark:bg-gray-800/95 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white backdrop-blur-xl">
        <p className="font-medium mb-2">{`Time: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="font-semibold">
            {entry.name}: {entry.name.includes('Storage')
              ? `${entry.value.toFixed(2)} GB`
              : `${(entry.value * 100).toFixed(1)}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};


export default CustomTooltip;
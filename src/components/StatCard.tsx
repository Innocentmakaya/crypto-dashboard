interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  positive?: boolean | null;
}

const StatCard = ({ label, value, subValue, positive }: StatCardProps) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-semibold text-lg">{value}</span>
      {subValue && (
        <span
          className={`text-sm font-medium ${
            positive === null || positive === undefined
              ? 'text-gray-400'
              : positive
              ? 'text-green-400'
              : 'text-red-400'
          }`}
        >
          {subValue}
        </span>
      )}
    </div>
  );
};

export default StatCard;
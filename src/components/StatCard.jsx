import React, { memo } from "react";

const StatCard = memo(({ title, value, icon: Icon }) => (
  <div className="bg-white shadow-sm rounded-2xl p-4 flex items-center justify-between">
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
    {Icon && <Icon className="text-blue-500 w-8 h-8" />}
  </div>
));

StatCard.displayName = "StatCard";

export default StatCard;

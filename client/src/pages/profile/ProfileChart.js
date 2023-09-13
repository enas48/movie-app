import React from "react";
import { Cell, Legend, ResponsiveContainer, PieChart, Pie } from "recharts";

function ProfileChart({ bookmarkedIds, favouriteIds, watchedIds }) {
  console.log(bookmarkedIds.length);
  console.log(favouriteIds.length);
  console.log(watchedIds.length);
  const piedata = [
    { name: "Wishlist", value: bookmarkedIds.length },
    { name: " Favourites", value: favouriteIds.length },
    { name: " Watched", value: watchedIds.length },
  ];
  const COLORS = ["#eab414", "#dc3545", "#0ed40e"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <PieChart width={300} height={250}>
        <Pie
          data={piedata}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#fc92af"
          dataKey="value"
        >
          {piedata.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
export default ProfileChart;

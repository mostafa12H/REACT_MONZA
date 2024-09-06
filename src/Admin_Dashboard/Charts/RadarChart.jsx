import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    subject: "Engagement",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Loyalty",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Satisfaction",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Spend",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Frequency",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "Recency",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const CustomRadarChart = ({ title }) => (
  <div className="bg-gradient-to-r  from-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 	 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 mt-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
      {title}
    </h2>
    <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            name="Segment A"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Segment B"
            dataKey="B"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{
              color: "#4b5563",
              fontSize: "14px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
            style={{
               marginTop: "40px",
                marginBottom: "20px",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default CustomRadarChart;

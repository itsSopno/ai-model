import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, CartesianGrid 
} from 'recharts';

const AnalyticsCharts = () => {
  const [userData, setUserData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
   
    axios.get('https://server-3-smoky.vercel.app/data')
      .then(res => setUserData(res.data))
      .catch(err => console.error("User API Error:", err));

    
    axios.get('https://server-3-smoky.vercel.app/buyerdata')
      .then(res => {
        const processedData = processSalesData(res.data);
        setSalesData(processedData);
      })
      .catch(err => console.error("Buyer API Error:", err));
  }, []);

  
  const processSalesData = (data) => {
    const counts = data.reduce((acc, curr) => {
      acc[curr.modelName] = (acc[curr.modelName] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    })).sort((a, b) => b.value - a.value).slice(0, 5); // টপ ৫ সেলস
  };

  const COLORS = ['#8116e0', '#d0ff00', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 space-y-10  text-white">
      <h2 className="text-3xl font-bold text-center mb-10">Platform Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CHART 1: User Statistics (Bar Chart) */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl mb-4 text-[#d0ff00]">Total Users Registered</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: 'Total Users', count: userData.length }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#111', border: 'none' }} />
                <Bar dataKey="count" fill="#8116e0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-center text-gray-400">Total: {userData.length} Users</p>
        </div>

        {/* CHART 2: Most Sold Models (Pie Chart) */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl mb-4 text-[#8116e0]">Top Selling Models</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsCharts;
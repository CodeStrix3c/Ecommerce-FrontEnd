import React from "react";
import {
  Book,
  CheckCircle,
  MessageSquare,
  UserCheck,
  Share2,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const metrics = [
  {
    title: "Articles Read",
    value: 42,
    icon: <Book className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />,
    description: "Total number of knowledge hub articles read by users this season.",
  },
  {
    title: "Seasonal Compliance",
    value: "75%",
    icon: <CheckCircle className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />,
    description: "Percentage of advisory recommendations followed during the current season.",
  },
  {
    title: "Forum Participation",
    value: 18,
    icon: <MessageSquare className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />,
    description: "Number of posts and questions shared by the community in forums.",
  },
  {
    title: "Expert Consultations",
    value: 12,
    icon: <UserCheck className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />,
    description: "Consultations taken with experts to get personalized advice.",
  },
  {
    title: "Knowledge Shared",
    value: 7,
    icon: <Share2 className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />,
    description: "Instances where users contributed tips, solutions, or shared knowledge.",
  },
  {
    title: "Complaints Resolved",
    value: "8/10",
    icon: <AlertCircle className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-2" />,
    description: "Number of complaints successfully resolved out of total registered complaints.",
  },
];


const graphData = {
  articlesRead: [{ metric: "Articles Read", value: 42 }],
  forumParticipation: [{ metric: "Forum Participation", value: 18 }],
  expertConsultations: [{ metric: "Expert Consultations", value: 12 }],
  knowledgeShared: [{ metric: "Knowledge Shared", value: 7 }],
  seasonalCompliance: [
    { season: "Winter", value: 70 },
    { season: "Spring", value: 75 },
    { season: "Summer", value: 80 },
    { season: "Autumn", value: 65 },
  ],
  complaintsResolved: [
    { name: "Resolved", value: 8, color: "#34D399" },
    { name: "Pending", value: 2, color: "#F87171" },
  ],
};

const KnowledgePanel = () => {
  return (
    <div className="p-4 sm:p-6 space-y-8 min-h-screen">
     
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Knowledge & Advisory</h2>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-[var(--color-white)] p-4 rounded-lg shadow hover:shadow-lg transition text-center"
          >
            {metric.icon}
            <p className="text-base font-medium mb-1">{metric.title}</p>
            <p className="text-2xl font-bold mb-2">{metric.value}</p>
            <p className="text-sm text-[var(--color-black)]">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6">
       
        {[graphData.articlesRead, graphData.forumParticipation, graphData.expertConsultations, graphData.knowledgeShared].map(
          (data, idx) => (
            <div key={idx} className="bg-[var(--color-white)] p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">{data[0].metric}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )
        )}

       
        <div className="bg-[var(--color-white)] p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Seasonal Compliance (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={graphData.seasonalCompliance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="season" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        
        <div className="bg-[var(--color-white)] p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Complaints Resolved vs Pending</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={graphData.complaintsResolved}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {graphData.complaintsResolved.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default KnowledgePanel;

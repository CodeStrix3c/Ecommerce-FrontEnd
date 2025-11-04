import React from 'react'

function FarmingTechniques() {
  const techniques = [
    {
      id: 1,
      title: "Regenerative farming",
      summary:
        "Focuses on improving farmland and productivity by increasing biodiversity, enriching the soil and regenerating the land.",
      details:
        "As the climate crisis accelerates, regenerative farming offers a sustainable approach that improves soil health, sequesters carbon and reduces input costs. Healthier soil supports beneficial bacteria and fungi which increase fertility and reduce reliance on artificial fertilisers. Benefits include reduced emissions, lower costs and improved crop and feed quality.",
    },
    {
      id: 2,
      title: "Data-powered decision-making",
      summary:
        "Use farm data to gain insights, evaluate profitability and make informed operational choices.",
      details:
        "Modern farm management apps let you map your land, manage medicine distribution, weigh animals and trade livestock. Capturing and analysing this data gives you control and helps meet sustainability goals as farming becomes more complex.",
    },
    {
      id: 3,
      title: "Precision farming",
      summary:
        "Apply the right input at the right time and place to boost productivity and reduce waste.",
      details:
        "Precision farming pairs technology with livestock and crop science to increase yields and lower environmental impact. Many farms have adopted precision methods to improve productivity and animal welfare while cutting emissions. The market for precision farming in Europe is projected to grow significantly, reflecting its importance.",
    },
    {
      id: 4,
      title: "Vertical farming",
      summary:
        "Grow in controlled, layered environments to maximise output per square metre and conserve resources.",
      details:
        "Vertical farms use soil-free systems and precise control of light, water and climate to grow year-round with lower water use and fewer chemicals. This approach saves space and can reduce carbon emissions, while enabling consistent production.",
    },
    {
      id: 5,
      title: "Micro farming",
      summary:
        "High-yield small plots using tech like aquaponics, LEDs and automated irrigation—ideal for urban or diversified operations.",
      details:
        "Micro farms pack advanced tech into small footprints. They pair smart crop choices (fast-turnover or repeatedly sowable crops) with automation to produce high yields on minimal land. Great for urban settings and diversification, but not always the best fit for large established farms.",
    },
    {
      id: 6,
      title: "Autonomous tractors",
      summary:
        "Self-driving tractors automate labour-intensive tasks, often electric and more eco-friendly.",
      details:
        "Autonomous tractors and robotic equipment reduce routine labour and let you redeploy staff to higher-value work. With electrification, they can also lower greenhouse gas emissions while maintaining or increasing productivity.",
    },
    {
      id: 7,
      title: "Invest in technology",
      summary:
        "Technology underpins sustainability, productivity and welfare across modern farms.",
      details:
        "Investing in the right technology—whether for monitoring, automation, or data analysis—helps you diversify, cut costs, save time and improve animal welfare. Tech is the backbone that makes the other techniques scalable and actionable.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        The Future of Farming: Techniques to Watch
      </h1>

      <p className="text-slate-600 mb-8">
        Farming is evolving every day with new innovations. Here are some key
        sustainable techniques shaping the future of agriculture.
      </p>

      <div className="space-y-6">
        {techniques.map((tech) => (
          <div
            key={tech.id}
            className="border border-slate-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-green-700">
              {tech.title}
            </h2>
            <p className="text-slate-600 mt-1">{tech.summary}</p>
            <p className="text-slate-700 mt-3">{tech.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmingTechniques;

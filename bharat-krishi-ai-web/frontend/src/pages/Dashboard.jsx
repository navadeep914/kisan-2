import React from 'react'
import ModuleCard from '../components/ModuleCard'

const modules = [
  { icon:'🌱', title:'Crop Recommendation', desc:'Recommend best crops based on soil & weather', path:'/crop',    color:'border-green-500' },
  { icon:'🦠', title:'Plant Disease',        desc:'Detect plant diseases from leaf images',       path:'/disease', color:'border-red-400' },
  { icon:'🪱', title:'Soil Analysis',        desc:'Evaluate soil fertility and nutrients',         path:'/soil',    color:'border-yellow-500' },
  { icon:'📈', title:'Crop Yield',           desc:'Predict expected crop yield',                  path:'/yield',   color:'border-blue-400' },
  { icon:'💹', title:'Market Price',         desc:'Forecast commodity prices at mandis',          path:'/market',  color:'border-purple-400' },
  { icon:'🌦️', title:'Weather Forecast',     desc:'Analyze weather for farming decisions',        path:'/weather', color:'border-sky-400' },
  { icon:'🔁', title:'Crop Rotation',        desc:'Suggest optimal crop rotation sequences',      path:'/rotation',color:'border-teal-400' },
  { icon:'🏛️', title:'Government Schemes',   desc:'Find eligible schemes and subsidies',          path:'/schemes', color:'border-orange-400' },
  { icon:'🤖', title:'AI Chatbot',           desc:'Multilingual agricultural assistant',          path:'/chatbot', color:'border-pink-400' },
]

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">🌾 Bharat Krishi AI</h1>
        <p className="text-gray-500 mt-2 text-lg">Intelligent Agriculture Decision Support System</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map(m => <ModuleCard key={m.path} {...m} />)}
      </div>
    </div>
  )
}

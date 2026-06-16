import React from 'react'
import { Link } from 'react-router-dom'

export default function ModuleCard({ icon, title, desc, path, color }) {
  return (
    <Link to={path}>
      <div className={`card hover:shadow-xl transition cursor-pointer border-l-4 ${color}`}>
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>
    </Link>
  )
}

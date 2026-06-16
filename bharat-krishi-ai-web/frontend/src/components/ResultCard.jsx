import React from 'react'

export default function ResultCard({ title, children, color = 'border-primary' }) {
  return (
    <div className={`card border-l-4 ${color} mt-6`}>
      <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>
      {children}
    </div>
  )
}

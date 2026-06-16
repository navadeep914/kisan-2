import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/',         label: '🏠 Dashboard' },
  { path: '/crop',     label: '🌱 Crop' },
  { path: '/disease',  label: '🦠 Disease' },
  { path: '/soil',     label: '🪱 Soil' },
  { path: '/yield',    label: '📈 Yield' },
  { path: '/market',   label: '💹 Market' },
  { path: '/weather',  label: '🌦️ Weather' },
  { path: '/rotation', label: '🔁 Rotation' },
  { path: '/schemes',  label: '🏛️ Schemes' },
  { path: '/chatbot',  label: '🤖 Chatbot' },
]

export default function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide">
          🌾 Bharat Krishi AI
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white text-2xl">☰</button>
        <ul className={`md:flex gap-4 text-sm font-medium ${open ? 'block' : 'hidden'} md:block`}>
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`px-3 py-1 rounded-lg hover:bg-green-700 transition ${
                  location.pathname === path ? 'bg-green-700' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

import React from 'react'

export default function InputField({ label, name, value, onChange, type = 'number', placeholder = '' }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}

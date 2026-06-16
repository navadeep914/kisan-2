import React from 'react'

export default function LoadingSpinner({ message = 'Analyzing...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  )
}

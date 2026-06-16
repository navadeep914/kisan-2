import React, { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'

export default function SoilAnalysis() {
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">🪱 Soil Analysis System</h2>
      <div className="card">
        <p className="text-gray-500 text-sm">Fill in the required fields and click Predict.</p>
        {/* TODO: Add input fields specific to this module */}
        <button
          onClick={() => setLoading(true)}
          className="btn-primary mt-4 w-full"
        >
          🔍 Predict
        </button>
      </div>
      {loading && <LoadingSpinner message="Processing..." />}
      {result && (
        <div className="card mt-6 border-l-4 border-primary">
          <pre className="text-sm text-gray-700">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

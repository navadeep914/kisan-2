import React, { useState } from 'react'
import axios from 'axios'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const initialForm = { nitrogen:'', phosphorus:'', potassium:'', temperature:'', humidity:'', ph:'', rainfall:'' }

export default function CropRecommend() {
  const [form, setForm]     = useState(initialForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/api/crop/predict', form)
      setResult(res.data)
    } catch {
      toast.error('Prediction failed. Check API connection.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">🌱 Crop Recommendation System</h2>
      <div className="card grid grid-cols-2 gap-4">
        {Object.keys(initialForm).map(k => (
          <InputField key={k} label={k.charAt(0).toUpperCase()+k.slice(1)} name={k} value={form[k]} onChange={handleChange} />
        ))}
        <div className="col-span-2">
          <button onClick={handleSubmit} className="btn-primary w-full mt-2">🔍 Get Recommendation</button>
        </div>
      </div>
      {loading && <LoadingSpinner message="Analyzing soil conditions..." />}
      {result && (
        <ResultCard title="✅ Recommendation Result" color="border-green-500">
          <p className="text-2xl font-bold text-primary">{result.recommended_crop?.toUpperCase()}</p>
          <p className="text-gray-500 mt-1">Confidence: <span className="font-semibold">{result.confidence}%</span></p>
          <div className="mt-4">
            <p className="font-semibold text-gray-600">🔄 Alternatives:</p>
            {result.alternatives?.map((a, i) => (
              <p key={i} className="text-sm text-gray-500">→ {a.crop} ({a.confidence}%)</p>
            ))}
          </div>
        </ResultCard>
      )}
    </div>
  )
}

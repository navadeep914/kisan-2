import { useState } from 'react'

export default function usePredict(apiFn) {
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const predict = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFn(data)
      setResult(res.data)
    } catch (err) {
      setError(err.message || 'Prediction failed')
    } finally {
      setLoading(false)
    }
  }

  return { result, loading, error, predict }
}

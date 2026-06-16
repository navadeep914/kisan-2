export const formatCurrency = (val) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val)

export const formatPct = (val) => `${val.toFixed(2)}%`

export const getSeasonFromMonth = (month) => {
  if ([3,4,5].includes(month))   return 'Spring'
  if ([6,7,8].includes(month))   return 'Summer'
  if ([9,10,11].includes(month)) return 'Autumn'
  return 'Winter'
}

export const FERTILITY_COLORS = {
  High:     'text-green-600',
  Moderate: 'text-yellow-500',
  Low:      'text-red-500',
}

import { useMemo } from 'react'

function CalculatedValue({ count }) {
  const calculated = useMemo(() => {
    const n = Number(count) || 0
    let total = n
    for (let i = 0; i < 1000; i++) {
      total += i % 10
    }
    return total
  }, [count])

  return (
    <div>
      <h3>Calculated value: {calculated}</h3>
      <p>From input (count): {String(count)}</p>
    </div>
  )
}

export default CalculatedValue

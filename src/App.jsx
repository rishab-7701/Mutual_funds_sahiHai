import { useState } from 'react'
import './App.css'
import FundsTable from './FundsTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ width: '100%' }}>
      <FundsTable/>
    </div>
  )
}

export default App

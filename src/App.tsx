import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DataList from './DataList/DataList'

/*
- fetch data -> hook -> localStorage / page / link
- infitnite scrolling -> footer on screen - intersection observer + (Loading)
*/

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <DataList />
      </div>
    </>
  )
}

export default App

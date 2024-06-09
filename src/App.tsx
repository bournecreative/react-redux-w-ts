// import { Counter } from './components/Counter'
import { BarChart } from './components/BarChart'
import { useState } from "react"

export interface CountryData {
  country: string,
  value: number
}

const data: CountryData[]  = [{
  country: "USA",
  value: 2025
  }, {
  country: "China",
  value: 1882
  }, {
  country: "Japan",
  value: 1809
  }, {
  country: "Germany",
  value: 1322
  }, {
  country: "UK",
  value: 1122
  }, {
  country: "France",
  value: 1114
  }, {
  country: "India",
  value: 984
  }, {
  country: "Spain",
  value: 711
  }, {
  country: "Netherlands",
  value: 665
  }, {
  country: "South Korea",
  value: 443
  }, {
  country: "Canada",
  value: 441
}];

function App() {
  const [chartData] = useState(data)
  
  return (
    <>
      <div>
        <h1>Lets Go</h1>
        {/* <Counter /> */}
        <BarChart chartData={chartData}/>
      </div>
    </>
  )
}

export default App

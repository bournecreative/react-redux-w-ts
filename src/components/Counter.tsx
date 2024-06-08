import React from "react"
import { useState } from "react"

export const Counter = () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            <div>Count:{count}</div>
            <div>
                <button onClick={() => setCount((c:number) => c+1)}>Increment</button>
                <button onClick={() => setCount((c:number) => c-1)}>Decrement</button>
            </div>
        </div>
    )

    

}
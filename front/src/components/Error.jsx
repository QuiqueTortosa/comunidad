import React, { useState } from 'react'

export default function Error({error}) {
    const [visible, setIsVisible] = useState(true);
    setTimeout(() => {
        setIsVisible(true);
    },5000)
  return (
    <div>AAAAAAAAAAAAA{error} 
          {visible && <p>Will show in 5 seconds</p>}
    </div>
  )
}

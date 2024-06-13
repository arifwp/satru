import { useCallback, useEffect, useState } from "react"

export const useFindElementWidth = (myRef: any) => {
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    
    const handleResize = useCallback(() => {
        setWidth(myRef.current.offsetWidth)
        setHeight(myRef.current.offsetHeight)
    }, [myRef])
  
    useEffect(() => {
      window.addEventListener('load', handleResize)
      window.addEventListener('resize', handleResize)
  
      return () => {
        window.removeEventListener('load', handleResize)
        window.removeEventListener('resize', handleResize)
      }
    }, [myRef, handleResize])
  
    return { width, height }
  }


// HOW TO USE
// const MyComponent = () => {
//     const componentRef = useRef()
//     const { width, height } = useResize(componentRef)
  
//     return (
//       <div ref={componentRef }>
//         <p>width: {width}px</p>
//         <p>height: {height}px</p>
//       <div/>
//     )
//   }
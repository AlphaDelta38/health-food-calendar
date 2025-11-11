import { useEffect, useRef } from "react";


const useSidebarOffset = (setState: (state: number) => void): React.RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    if(!ref.current) return

    const observer = new ResizeObserver((entries)=>{
      const entry = entries[0]
      if(entry){
        setState(Number(entry.target.clientWidth));
      }
    })

    observer.observe(ref.current)

    return ()=>{
      observer.disconnect()
    }
  }, [ref.current])

  return ref;
}



export default useSidebarOffset;
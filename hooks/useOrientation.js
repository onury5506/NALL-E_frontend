import { useEffect, useState } from "react";

export default function useOrientation(){
    const [orientation, setOrientation] = useState("portrait")

    function onSizeChange(){
        let orientationBuffer = "landscape"

        if(window.innerHeight > window.innerWidth){
            orientationBuffer = "portrait"
        }

        if(orientationBuffer != orientation){
            setOrientation(orientationBuffer)
        }
    }

    useEffect(()=>{
        onSizeChange()
    },[])

    useEffect(()=>{
        window.addEventListener("resize",onSizeChange)

        return ()=>{
            window.removeEventListener("resize",onSizeChange)
        }
    })

    return orientation;
}
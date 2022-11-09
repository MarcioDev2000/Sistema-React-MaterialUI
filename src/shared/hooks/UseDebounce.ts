import { useCallback, useRef } from "react"


export const useDebounce = (delay = 300, notDelayIsFirsTime = true)=>{

    const debouncing = useRef<NodeJS.Timeout>();
    const isFirsTime = useRef(notDelayIsFirsTime);
    const debounce = useCallback(( func:() => void)=>{
     
        if(isFirsTime.current){
             isFirsTime.current = false;
        } 
       
        else{
            if (debouncing.current){
                clearTimeout(debouncing.current);
            }
            debouncing.current= setTimeout(()=>func(), delay);
        }
    }, [delay])
return {debounce}
};
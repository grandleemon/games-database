import {useEffect, useRef} from "react";

export let useClickOutside = (handler: any) => {
    let domNode = useRef()
    useEffect(() => {
        let maybeHandler = (e: any) => {
            if(domNode.current && !domNode.current?.contains(e.target)) {
                handler()
            }
        }
        document.addEventListener('mousedown', maybeHandler)

        return() => {
            document.removeEventListener("mousedown", maybeHandler)
        }
    })

    return domNode
}
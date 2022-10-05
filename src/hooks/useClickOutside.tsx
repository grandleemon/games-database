import { MutableRefObject, useEffect, useRef} from "react";

export let useClickOutside = (handler: () => void) => {
    let domNode = useRef<any>()
    useEffect(() => {
        let maybeHandler = (e: Event) => {
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
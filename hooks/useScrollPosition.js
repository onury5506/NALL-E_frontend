import { useEffect, useState } from "react";

export default function useScrollPosition() {
    const [scrollPos, setScrollPos] = useState(0)

    function onScroll() {
        const height = document.body.scrollHeight
        const scrollPos = (window.scrollY + window.innerHeight / 2) / height * 100

        setScrollPos(scrollPos)
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
    }, [])

    return scrollPos;
}
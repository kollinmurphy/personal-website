/* @jsxImportSource solid-js */

import { createEffect, createSignal, JSXElement } from "solid-js"

interface AnimatedHeaderProps {
  class: string;
}

const AnimatedHeader = (props: AnimatedHeaderProps) => {
  const [visible, setVisible] = createSignal(false)

  let ref: HTMLDivElement | undefined
  createEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver((entries) => {
      const [h1] = entries
      if (h1.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    })
    observer.observe(ref)
  })

  return (
    <div ref={ref}>
      <h1 class={`text-7xl text-gradient my-6 pb-1 transition-all duration-1000 bg-clip-text text-transparent ${props.class}`} classList={{
        "opacity-0": !visible(),
        "blur-[8px]": !visible(),
      }}>
        Kollin Murphy
      </h1>
    </div>
  )
}

export default AnimatedHeader

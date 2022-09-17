/* @jsxImportSource solid-js */

import { createEffect, createSignal, JSXElement, onMount } from "solid-js"

interface AnimatedTextProps {
  children: JSXElement;
  class: string;
}

const AnimatedText = (props: AnimatedTextProps) => {
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
    <div class='transition-all duration-500' ref={ref}>
      <h3 class={`my-3 transition-all duration-500 ${props.class}`} classList={{
        "translate-x-[100vw]": !visible(),
        "blur-[2px]": !visible(),
      }}>
        {props.children}
      </h3>
    </div>
  )
}

export default AnimatedText

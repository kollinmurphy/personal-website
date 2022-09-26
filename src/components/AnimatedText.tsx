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
    <div class='transition-all duration-500 w-full overflow-x-hidden' ref={ref}>
      <h3 class={`text-black my-1 lg:my-3 transition-transform transition-blur transition-blur duration-500 ${props.class}`} classList={{
        "translate-x-[100vw]": !visible(),
        "blur-[2px]": !visible(),
      }}>
        {props.children}
      </h3>
    </div>
  )
}

export default AnimatedText

/* @jsxImportSource solid-js */

import type { JSXElement } from "solid-js"

interface MessageBubbleProps {
  children: JSXElement;
  class?: string;
  visible: boolean;
}

const MessageBubble = (props: MessageBubbleProps) => {

  const visible = () => props.visible

  return (
    <div class='mb-4 relative motion-safe:transition-all duration-500 flex flex-col'>
      <h3 class={`message-bubble bg-[#0B93F6] text-white rounded-[36px] border-gray-50 py-3 px-6 transition-all duration-500 text-2xl self-end ${props.class || ''}`} classList={{
        "translate-x-[100vw]": !visible(),
        "blur-[2px]": !visible(),
      }}>
        {props.children}
      </h3>
    </div>
  )
}

export default MessageBubble

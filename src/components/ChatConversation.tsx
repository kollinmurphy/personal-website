/* @jsxImportSource solid-js */

import { createSignal } from "solid-js"
import MessageBubble from "./MessageBubble"

const ChatConversation = () => {
  const [index, setIndex] = createSignal(-1)

  const data: Array<{ time: number; content: any }> = [
    { time: 1000, content: 'Hello there 👋' },
    { time: 1000, content: 'I\'m Kollin.' },
    { time: 2000, content: 'My passion is for creating AMAZING products to help you and your business to grow.' },
    { time: 2000, content: 'I don\'t deal in mediocre. With your help, we can blow any project out of the water!' },
    { time: 2000, content: 'My experience is primarily in web and cross-platform mobile development.' },
    { time: 2500, content: 'If we\'re starting a new project together, we\'ll build it from the ground up to be insanely beautiful, easy to use, and of course blazingly fast 🔥' },
    { time: 2000, content: 'If we\'re working on an existing project, we\'ll increase its value with every iteration.' },
    { time: 2000, content: <>What do you say we get to work? <a href="mailto:kollin.murphy@gmail.com" class='underline hover:text-[#D8EDFE]'>Contact me</a> and let's get started!</> },
  ]

  const handleNextStep = () => {
    setIndex(i => i + 1)
    const i = index()
    if (i < data.length - 1) {
      const randomTime = Math.floor(Math.random() * 1000 - 500)
      setTimeout(handleNextStep, data[i].time + randomTime)
    }
  }

  handleNextStep()

  return (
    <div>
      {data.map((d, i) => (
        <MessageBubble visible={index() >= i}>
          {d.content}
        </MessageBubble>
      ))}
    </div>
  )

}

export default ChatConversation

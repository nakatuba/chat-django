import type { NextPage } from 'next'

type Message = {
  id: number
  text: string
}

const Home: NextPage<{ messages: Message[] }> = ({ messages }) => {
  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      text: { value: string }
    }
    await fetch('http://localhost:8000/api/messages/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: target.text.value }),
    })
    window.location.reload()
  }
  return (
    <div>
      {messages.map((message) => <div key={message.id}>{message.text}</div>)}
      <form onSubmit={sendMessage}>
        <input type="text" name="text" />
        <button type="submit">送信</button>
      </form>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const messages = await fetch('http://backend:8000/api/messages/').then(res => res.json())

  return {
    props: {
      messages
    }
  }
}

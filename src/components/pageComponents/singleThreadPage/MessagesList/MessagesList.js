import React, { useEffect } from "react"
import { useParams } from "@gatsbyjs/reach-router"
import { Container } from "react-bootstrap"
import { map, uniqueId } from "lodash"
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"

import useFirebaseContext from "../../../../context/useFirebaseContext"

import "./MessagesList.scss"

import ArticleSingle from "./ArticleSingle"
import NewMessageForm from "../NewMessageForm/NewMessageForm"

const MessagesList = () => {
  const { db } = useFirebaseContext()
  const [messages, setMessages] = React.useState([])

  const params = useParams()

  useEffect(() => {
    const q = query(
      collection(db, `threads/${params.threadId}/messages`),
      orderBy("dateCreated", "asc")
    )
    const unsubscribe = onSnapshot(
      q,
      async querySnapshot => {
        // eslint-disable-next-line no-console
        console.info("ThreadMessages: loading.. ", querySnapshot.docs.length)
        const messagesData = []
        const singlePromise = async dataDoc => {
          try {
            const author = await getDoc(dataDoc.data()?.author)
            messagesData.push({
              ...dataDoc.data(),
              id: dataDoc.id,
              author: { ...author.data(), id: author.id },
              authorWc: dataDoc.data()?.author,
            })
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e)
          }
        }
        const dataPromises = []
        querySnapshot.forEach(dataDoc => {
          dataPromises.push(singlePromise(dataDoc))
        })
        await Promise.all(dataPromises)
        setMessages([...messagesData])
      },
      error => {
        // eslint-disable-next-line no-console
        console.warn(error)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Container>
      <div className="messages-list">
        {map(messages, message => (
          <ArticleSingle message={message} key={uniqueId("message-")} />
        ))}
        <div className="post-message">
          <NewMessageForm />
        </div>
      </div>
    </Container>
  )
}

export default MessagesList

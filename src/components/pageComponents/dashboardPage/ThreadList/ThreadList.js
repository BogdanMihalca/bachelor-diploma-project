import { navigate } from "@gatsbyjs/reach-router"
import {
  collection,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"
import { uniqueId, map } from "lodash"
import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import useFirebaseContext from "../../../../context/useFirebaseContext"
import MbcButton from "../../../common/MbcButton/MbcButton"
import "./ThreadList.scss"

const ThreadList = () => {
  const [threads, setThreads] = React.useState([])
  const { db } = useFirebaseContext()

  useEffect(() => {
    const q = query(collection(db, "threads"), orderBy("dateCreated", "desc"))
    const unsubscribe = onSnapshot(
      q,
      async querySnapshot => {
        // eslint-disable-next-line no-console
        console.info("ThreadList: loading.. ", querySnapshot.docs.length)
        const threadsData = []
        const singlePromise = async doc => {
          try {
            const author = (await getDoc(doc.data()?.author)).data()
            const lastMessageQuery = query(
              collection(db, `${doc.ref.path}/messages`),
              orderBy("dateCreated", "desc"),
              limit(1)
            )
            const lastMessageDocs = (await getDocs(lastMessageQuery)).docs
            const lastMessage =
              lastMessageDocs.length > 0 ? lastMessageDocs[0].data() : {}
            const lastMessageAuthor = lastMessage
              ? (await getDoc(lastMessage?.author)).data()
              : { name: "" }
            threadsData.push({
              ...doc.data(),
              id: doc.id,
              author,
              lastMessage: { ...lastMessage, author: lastMessageAuthor },
            })
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e)
          }
        }
        const dataPromises = []
        querySnapshot.forEach(doc => {
          dataPromises.push(singlePromise(doc))
        })
        await Promise.all(dataPromises)
        setThreads([...threadsData])
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
    <Container className="thread-list">
      <h3 className="list-title">Ultimele Threaduri:</h3>
      <div>
        {map(threads, thread => (
          <article
            className="thread-article blue-shadow-card"
            data-aos="fade-up-right"
            data-aos-duration="1000"
            key={uniqueId("thread_")}
          >
            <div>
              <h3>{thread.title}</h3>
              <p className="message-author">
                <span>Ultimul mesaj de la:</span>{" "}
                {thread.lastMessage?.author?.name}
              </p>
              <p className="message">{thread.lastMessage?.message}</p>
            </div>
            <div className="right-article-part d-flex">
              <h5>
                <span> Data crearii:</span> &#128197;
                {thread.dateCreated?.toDate().toDateString()} &#128337;
                {thread.dateCreated?.toDate().getHours()}:
                {thread.dateCreated?.toDate().getMinutes()}
              </h5>
              <h5>
                <span>Creat de:</span> {thread.author?.name}
              </h5>
              <h5>
                <span>Numar mesaje:</span> {thread.messageCount}
              </h5>
            </div>
            <div className="d-flex justify-content-end">
              <MbcButton
                className="open-thread"
                onClick={() => navigate(`/app/thread/${thread.id}`)}
              >
                Deschide
              </MbcButton>
            </div>
          </article>
        ))}
      </div>
    </Container>
  )
}

export default ThreadList

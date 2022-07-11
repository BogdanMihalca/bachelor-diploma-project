import { useParams } from "@gatsbyjs/reach-router"
import { onSnapshot, doc, getDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { Container, Spinner } from "react-bootstrap"
import useFirebaseContext from "../../../../context/useFirebaseContext"

import BackButton from "../../../common/BackButton/BackButton"
import "./ThreadSummary.scss"

const ThreadSummary = () => {
  const { db } = useFirebaseContext()
  const [threadDetails, setThreadDetails] = useState()

  const params = useParams()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, `threads/${params.threadId}`),
      async dt => {
        const author = (await getDoc(dt.data()?.author)).data()
        setThreadDetails({ ...dt.data(), id: dt.id, author })
      }
    )
    return () => unsubscribe()
  }, [])

  return (
    <Container>
      <div className="thread-summary">
        <div className="back-btn">
          <BackButton backToUrl="/app">Inapoi</BackButton>
        </div>

        <div className="summary-card">
          {threadDetails ? (
            <>
              <h2>Titlu thread:{threadDetails.title}</h2>
              <h5>
                Creat de:
                <span id="threadAuthor">{threadDetails.author.name}</span>
              </h5>
              <h5>
                Data:
                <span id="date">
                  {" "}
                  &#128197; {threadDetails.dateCreated
                    ?.toDate()
                    .toDateString()}{" "}
                  &#128337; {threadDetails.dateCreated?.toDate().getHours()}:
                  {threadDetails.dateCreated?.toDate().getMinutes()}
                </span>
              </h5>
              <h5>
                Numar mesaje:
                <span id="messageCount">{threadDetails.messageCount}</span>
              </h5>
            </>
          ) : (
            <div className="text-center">
              <Spinner animation="border" variant="danger" />
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default ThreadSummary

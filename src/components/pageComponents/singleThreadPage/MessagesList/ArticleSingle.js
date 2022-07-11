/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useParams } from "@gatsbyjs/reach-router"
import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore"
import { Button, Modal } from "react-bootstrap"

import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../../utils/notificationsUtils"
import EditMessageForm from "./EditMessageForm"
import useFirebaseContext from "../../../../context/useFirebaseContext"
import profilePlaceholder from "../../../../assets/images/png/profile_placeholder.png"

const ArticleSingle = ({ message }) => {
  const { user, db } = useFirebaseContext()
  const [isEdit, setIsEdit] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const params = useParams()

  const handleSubmitEdit = async values => {
    try {
      await updateDoc(
        doc(db, `threads/${params.threadId}/messages/${message.id}`),
        {
          message: values.message,
        }
      ).then(() => {
        showSuccessNotification("Mesajul a fost editat cu succes!")
      })
    } catch (error) {
      showErrorNotification("Mesajul nu a putut fi salvat")
    }
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  const handleDeleteMessage = async () => {
    try {
      await deleteDoc(
        doc(db, `threads/${params.threadId}/messages/${message.id}`)
      ).then(async () => {
        await updateDoc(doc(db, `threads/${params.threadId}`), {
          messageCount: increment(-1),
        })
        showSuccessNotification("Mesajul a fost sters cu succes!")
      })
    } catch (error) {
      showErrorNotification("Mesajul nu a putut fi sters")
    }
  }

  return (
    <article
      className="message-article blue-shadow-card"
      data-aos="zoom-in-right"
    >
      <div className="auth-msg-options">
        {user.uid === message.author.id && (
          <>
            <button
              type="button"
              className="dlt-msg-btn"
              onClick={() => handleDelete()}
            >
              <i className="bi bi-trash3-fill" />
            </button>
            <button
              type="button"
              className="upt-msg-btn"
              onClick={() => handleEdit()}
            >
              <i className="bi bi-pencil-fill" />
            </button>
          </>
        )}
      </div>
      <div className="msg-user-area">
        <img
          className="profile-img"
          src={message.author.profilePicture || profilePlaceholder}
          alt="profile"
          referrerPolicy="no-referrer"
        />
        <h3 className="user-name-msg">{message.author.name}</h3>
      </div>
      <div className="message-box">
        {isEdit ? (
          <EditMessageForm
            onSubmit={handleSubmitEdit}
            onCancel={() => setIsEdit(false)}
            message={message?.message}
          />
        ) : (
          <p>{message.message}</p>
        )}
        <div className="details-msg">
          <i className="bi bi-pencil-square" />{" "}
          {message.dateCreated?.toDate().toDateString()}
          {" - "}
          {message.dateCreated?.toDate().getHours()}:
          {message.dateCreated?.toDate().getMinutes()}
        </div>
      </div>
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sterge Mesaj</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Esti sigur ca doresti sa stergi acest mesaj? Atentie, actiunea este
            ireversibila!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Anuleaza
          </Button>
          <Button variant="danger" onClick={handleDeleteMessage}>
            Sterge
          </Button>
        </Modal.Footer>
      </Modal>
    </article>
  )
}

export default ArticleSingle

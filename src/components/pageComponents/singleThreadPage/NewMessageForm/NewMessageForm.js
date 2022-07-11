import React from "react"
import { Form, FormikProvider, useFormik, Field } from "formik"
import { Container } from "react-bootstrap"
import { useParams } from "@gatsbyjs/reach-router"
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import * as Yup from "yup"

import MbcButton from "../../../common/MbcButton/MbcButton"
import MbcInput from "../../../common/MbcInput/MbcInput"
import { VARIANT_TEXTAREA } from "../../../../constants"
import useFirebaseContext from "../../../../context/useFirebaseContext"
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../../utils/notificationsUtils"
import "./NewMessageForm.scss"

const NewMessageForm = () => {
  const { db, user } = useFirebaseContext()

  const params = useParams()

  const postMessageForm = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Mesajul nu poate fi gol"),
    }),
    onSubmit: async values => {
      try {
        const messageData = {
          author: doc(db, "users", user.uid),
          dateCreated: serverTimestamp(),
          message: values.message,
        }
        addDoc(
          collection(db, `threads/${params.threadId}/messages/`),
          messageData
        )
          .then(async () => {
            await updateDoc(doc(db, `threads/${params.threadId}`), {
              messageCount: increment(1),
            })
            showSuccessNotification("Mesajul a fost salvat cu succes")
          })
          .catch(() => {
            showErrorNotification("Mesajul nu a putut fi salvat")
          })
      } catch (error) {
        showErrorNotification("Mesajul nu a putut fi salvat")
      }
    },
  })

  return (
    <Container className="new-message-form">
      <FormikProvider value={postMessageForm}>
        <Form onSubmit={postMessageForm.handleSubmit}>
          <Field
            component={MbcInput}
            variant={VARIANT_TEXTAREA}
            className="edit-message-input"
            name="message"
          />
          <div className="d-flex justify-content-end mt-2">
            <MbcButton className="submit-button" type="submit">
              Posteaza
            </MbcButton>
          </div>
        </Form>
      </FormikProvider>
    </Container>
  )
}

export default NewMessageForm

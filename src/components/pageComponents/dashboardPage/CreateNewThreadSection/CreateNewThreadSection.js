import React from "react"
import * as Yup from "yup"
import { Container, Button, Fade } from "react-bootstrap"
import { Form, useFormik, Field, FormikProvider } from "formik"
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore"

import { VARIANT_TEXT, VARIANT_TEXTAREA } from "../../../../constants"
import MbcButton from "../../../common/MbcButton/MbcButton"
import MbcInput from "../../../common/MbcInput/MbcInput"
import "./CreateNewThreadSection.scss"
import useFirebaseContext from "../../../../context/useFirebaseContext"

import {
  showErrorNotification,
  showSuccessNotification,
} from "../../../../utils/notificationsUtils"

const CreateNewThreadSection = () => {
  const [isCreateNewThreadFormOpen, setIsCreateNewThreadFormOpen] =
    React.useState(false)

  const { db, user } = useFirebaseContext()

  // TODO: submit this email to an endpoint
  const newThreadForm = useFormik({
    initialValues: {
      threadTitle: "",
      message: "",
    },
    validationSchema: Yup.object({
      threadTitle: Yup.string().required("Va rugam introduceti titlul"),
      message: Yup.string().required("Va rugam introduceti un mesaj"),
    }),
    onSubmit: async values => {
      const threadDataToCreate = {
        author: doc(db, "users", user.uid),
        dateCreated: serverTimestamp(),
        title: values.threadTitle,
        messageCount: 1,
      }
      const messageData = {
        author: doc(db, "users", user.uid),
        dateCreated: serverTimestamp(),
        message: values.message,
      }
      // adding the thread data
      await addDoc(collection(db, "threads"), threadDataToCreate)
        .then(async thread => {
          await addDoc(collection(db, thread.path, "messages"), messageData)
            .then(() => {
              showSuccessNotification("Thread creat cu succes")
            })
            .catch(() => {
              showErrorNotification(
                "O eroare a avut loc si threadul nu a putut fi creat"
              )
            })
        })
        .catch(() => {
          showErrorNotification(
            "O eroare a avut loc si threadul nu a putut fi creat"
          )
        })
      newThreadForm.resetForm()
      setIsCreateNewThreadFormOpen(false)
    },
  })

  return (
    <Container className="create-new-thread-section">
      <div className="d-flex justify-content-end mt-5">
        {!isCreateNewThreadFormOpen && (
          <MbcButton onClick={() => setIsCreateNewThreadFormOpen(true)}>
            Thread nou +
          </MbcButton>
        )}
      </div>
      {isCreateNewThreadFormOpen && (
        <Fade in transitionAppear>
          <FormikProvider value={newThreadForm}>
            <Form onSubmit={newThreadForm.handleSubmit}>
              <Field
                component={MbcInput}
                variant={VARIANT_TEXT}
                className="new-thread-input"
                label="Titlu thread:"
                name="threadTitle"
              />
              <Field
                component={MbcInput}
                variant={VARIANT_TEXTAREA}
                className="new-thread-input"
                label="Mesaj:"
                name="message"
              />
              <div className="d-flex justify-content-end mt-2">
                <Button
                  onClick={() => setIsCreateNewThreadFormOpen(false)}
                  variant="danger"
                  className="close-button"
                >
                  Anuleaza
                </Button>
                <MbcButton className="submit-button" type="submit">
                  Creeaza thread
                </MbcButton>
              </div>
            </Form>
          </FormikProvider>
        </Fade>
      )}
    </Container>
  )
}

export default CreateNewThreadSection

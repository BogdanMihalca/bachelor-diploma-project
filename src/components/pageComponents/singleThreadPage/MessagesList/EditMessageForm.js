/* eslint-disable react/prop-types */
import React from "react"
import { Button } from "react-bootstrap"
import * as Yup from "yup"
import { useFormik, FormikProvider, Form, Field } from "formik"

import MbcButton from "../../../common/MbcButton/MbcButton"
import MbcInput from "../../../common/MbcInput/MbcInput"
import { VARIANT_TEXTAREA } from "../../../../constants"

const EditMessageForm = ({ message, onSubmit, onCancel }) => {
  const editMessageForm = useFormik({
    initialValues: {
      message: message || "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Mesajul nu poate fi gol"),
    }),
    onSubmit,
  })

  return (
    <FormikProvider value={editMessageForm}>
      <Form onSubmit={editMessageForm.handleSubmit}>
        <Field
          component={MbcInput}
          variant={VARIANT_TEXTAREA}
          className="edit-message-input"
          name="message"
        />
        <div className="d-flex justify-content-end mt-2">
          <Button onClick={onCancel} variant="danger" className="close-button">
            Anuleaza
          </Button>
          <MbcButton className="submit-button" type="submit">
            Modifica
          </MbcButton>
        </div>
      </Form>
    </FormikProvider>
  )
}

export default EditMessageForm

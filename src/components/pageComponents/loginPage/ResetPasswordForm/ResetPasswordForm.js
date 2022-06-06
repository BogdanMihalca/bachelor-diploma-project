import React from "react"
import * as Yup from "yup"
import { Field, FormikProvider, useFormik, Form } from "formik"

import { VARIANT_EMAIL } from "../../../../constants"
import MbcButton from "../../../common/MbcButton/MbcButton"
import MbcInput from "../../../common/MbcInput/MbcInput"
import useFirebaseContext from "../../../../context/useFirebaseContext"

const ResetPasswordForm = () => {
  const { sendResetPasswordEmail } = useFirebaseContext()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresa de email invalida")
        .required("Introduceti adresa de email"),
    }),
    onSubmit: async values => {
      sendResetPasswordEmail(values.email).then(result => console.log(result))
    },
  })

  return (
    <div className="login-form">
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Field
            component={MbcInput}
            variant={VARIANT_EMAIL}
            className="login-panel-input"
            label="Email"
            name="email"
          />
          <MbcButton type="submit">Reseteaza parola</MbcButton>
        </Form>
      </FormikProvider>
    </div>
  )
}

export default ResetPasswordForm

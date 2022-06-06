import React from "react"
import PropTypes from "prop-types"
import * as Yup from "yup"
import { Row } from "react-bootstrap"
import { Field, FormikProvider, useFormik, Form } from "formik"

import { VARIANT_PASSWORD, VARIANT_EMAIL } from "../../../../constants"
import MbcButton from "../../../common/MbcButton/MbcButton"
import MbcInput from "../../../common/MbcInput/MbcInput"
import GoogleLogo from "../../../../assets/images/png/google_logo.png"
import FacebookLogo from "../../../../assets/images/png/facebook_logo.png"
import useFirebaseContext from "../../../../context/useFirebaseContext"

const LoginForm = ({ setKey }) => {
  const { logInWithEmailAndPassword, signInWithGoogle, signInWithFacebook } =
    useFirebaseContext()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresa de email invalida")
        .required("Introduceti adresa de email"),
      password: Yup.string()
        .required("Introduceti parola")
        .min(8, "Parola trebuie sa contina minim 8 caractere"),
    }),
    onSubmit: values => {
      logInWithEmailAndPassword(values.email, values.password)
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
          <Field
            component={MbcInput}
            variant={VARIANT_PASSWORD}
            className="login-panel-input"
            label="Parola"
            name="password"
          />
          <MbcButton type="submit">LOGIN</MbcButton>
        </Form>
      </FormikProvider>
      <Row>
        <div className="text-form-bottom">
          <div className="d-flex align-items-center justify-content-center mb-1">
            <p className="m-0">Nu ai un cont? Atunci </p>
            <MbcButton
              variant="button-text"
              className="register-btn-link"
              onClick={() => setKey("inregistrare")}
            >
              Inregistreaza-te
            </MbcButton>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-5">
            <p className="m-0">Ti-ai uitat parola? </p>
            <MbcButton
              variant="button-text"
              className="register-btn-link"
              onClick={() => setKey("password-reset")}
            >
              Reseteaza-o
            </MbcButton>
          </div>

          <p>SAU</p>
        </div>
        <div className="social-buttons">
          <MbcButton
            variant="button-text"
            className="fb-login"
            onClick={() => signInWithFacebook()}
          >
            <img src={FacebookLogo} alt="facebook logo" />
            Conecteaza-te cu Facebook
          </MbcButton>
          <MbcButton
            variant="button-text"
            className="google-login"
            onClick={() => signInWithGoogle()}
          >
            <img src={GoogleLogo} alt="google logo" /> Conecteaza-te cu Google
          </MbcButton>
        </div>
      </Row>
    </div>
  )
}

LoginForm.propTypes = {
  setKey: PropTypes.func.isRequired,
}

export default LoginForm

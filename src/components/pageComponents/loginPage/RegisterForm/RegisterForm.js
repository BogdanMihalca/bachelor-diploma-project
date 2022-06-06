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

const RegisterForm = ({ setKey }) => {
  const { signUpWithEmailAndPassword, signInWithGoogle, signInWithFacebook } =
    useFirebaseContext()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adresa de email invalida")
        .required("Introduceti adresa de email"),
      password: Yup.string()
        .required("Introduceti parola")
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Trebuie sa contina 8 caractere, o litera mare, o litera mica, un numar si un caracter special"
        ),
      password2: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Parolele nu corespund"
      ),
    }),
    onSubmit: values => {
      signUpWithEmailAndPassword(values.email, values.password)
        .then(res => console.log(res))
        .catch(err => console.log(err))
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
          <Field
            component={MbcInput}
            variant={VARIANT_PASSWORD}
            className="login-panel-input"
            label="Reintroduceti parola"
            name="password2"
          />
          <MbcButton type="submit">Register</MbcButton>
        </Form>
      </FormikProvider>
      <Row>
        <div className="text-form-bottom">
          <div className="d-flex align-items-center justify-content-center mb-5">
            <p className="m-0">Ai deja un cont? Atunci </p>
            <MbcButton
              variant="button-text"
              className="register-btn-link"
              onClick={() => setKey("login")}
            >
              Conecteaza-te
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
            Inregistreaza-te cu Facebook
          </MbcButton>
          <MbcButton
            variant="button-text"
            className="google-login"
            onClick={() => signInWithGoogle()}
          >
            <img src={GoogleLogo} alt="google logo" /> Inregistreaza-te cu
            Google
          </MbcButton>
        </div>
      </Row>
    </div>
  )
}

RegisterForm.propTypes = {
  setKey: PropTypes.func.isRequired,
}

export default RegisterForm

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import LoginLayout from "../layouts/Login";
import * as Yup from "yup";
import axios from "../axios";
import { App } from "./App";
import { render } from 'react-dom';

const rootElement = document.getElementById("root");
// render(<App />, rootElement);
const schema = Yup.object().shape({
  first_name: Yup.string().min(2).required(),
  last_name: Yup.string().min(2).required(),
  sex: Yup.string().oneOf(["Male", "Female"]).required(),
  address: Yup.string().required(),
  valid_id_type: Yup.string().required("Required"),
  valid_id_pic: Yup.string().required("Required"),
  birthday: Yup.date().required(),
  age: Yup.number().min(18).required(),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(3).required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "must be same as password")
    .required(),
});

const Signup = (): JSX.Element => {
  const navigate = useNavigate();

  const [error, setError] = useState<any>("");
  const [success, setSuccess] = useState<string>("");

  return (
    <div>
      <LoginLayout error={error} success={success}>
        <div className="form-container">
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              sex: "",
              birthday: new Date(),
              age: 0,
              address: "",
              valid_id_type: "",
              valid_id_pic: "",
              password: "",
              confirm: ""
            }}
            validationSchema={schema}
            onSubmit={({ first_name, last_name, sex, birthday, age, email, address, valid_id_type, valid_id_pic, password }) => {
              axios
                .post("/auth/signup", {
                  first_name,
                  last_name,
                  sex,
                  birthday,
                  age,
                  address,
                  valid_id_type,
                  valid_id_pic,
                  email,
                  password,
                })
                .then((res) => {
                  setError("");
                  setSuccess("Signup Successful!");
                })
                .catch((err) => {
                  let error: string = err.message;
                  if (err?.response?.data)
                    error = JSON.stringify(err.response.data);
                  setError(error.slice(0, 50));
                });
            }}
          >
            {({ errors, touched, getFieldProps, handleSubmit }) => (

              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <input
                    id="first_name"
                    type="text"
                    placeholder="First Name"
                    {...getFieldProps("first_name")}
                  />
                  <div className="form-error-text">
                    {touched.first_name && errors.first_name ? errors.first_name : null}
                  </div>
                </div>

                <div className="input-container">
                  <input
                    id="last_name"
                    type="text"
                    placeholder="Last Name"
                    {...getFieldProps("last_name")}
                  />
                  <div className="form-error-text">
                    {touched.last_name && errors.last_name ? errors.last_name : null}
                  </div>
                </div>

                <div className="input-container">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...getFieldProps("email")}
                  />
                  <div className="form-error-text">
                    {touched.email && errors.email ? errors.email : null}
                  </div>
                </div>

                <div className="input-container">
                  <select
                    id="sex"
                    {...getFieldProps("sex")}
                  >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div className="form-error-text">
                    {touched.sex && errors.sex ? errors.sex : null}
                  </div>
                </div>
                <div className="input-container">
                  <input
                    id="birthday"
                    type="date"
                    placeholder="Birthday"
                    {...getFieldProps("birthday")}
                  />
                  <div className="form-error-text">
                    {touched.birthday && errors.birthday ? errors.birthday : null}
                  </div>
                </div>
                <div className="input-container">
                  <input
                    id="age"
                    type="number"
                    placeholder="Age"
                    {...getFieldProps("age")}
                  />
                  <div className="form-error-text">
                    {touched.age && errors.age ? errors.age : null}
                  </div>
                </div>
                <div className="input-container">
                  <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    {...getFieldProps("address")}
                  />
                  <div className="form-error-text">
                    {touched.address && errors.address ? errors.address : null}
                  </div>
                </div>

                <div className="input-container">
                  <input
                    id="valid_id_type"
                    type="valid_id_type"
                    placeholder="Valid ID Type"
                    {...getFieldProps("valid_id_type")}
                  />
                  <div className="form-error-text">
                    {touched.valid_id_type && errors.valid_id_type ? errors.valid_id_type : null}
                  </div>
                </div>
                <div className="input-container">
                  <input
                    id="valid_id_pic"
                    type="valid_id_pic"
                    placeholder="Valid ID Number"
                    {...getFieldProps("valid_id_pic")}
                  />
                  <div className="form-error-text">
                    {touched.valid_id_pic && errors.valid_id_pic ? errors.valid_id_type : null}
                  </div>
                </div>
                

                <div className="input-container">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...getFieldProps("password")}
                  />
                  <div className="form-error-text">
                    {touched.password && errors.password
                      ? errors.password
                      : null}
                  </div>
                </div>

                <div className="input-container">
                  <input
                    id="confirm"
                    type="password"
                    placeholder="Confirm Password"
                    {...getFieldProps("confirm")}
                  />
                  <div className="form-error-text">
                    {touched.confirm && errors.confirm ? errors.confirm : null}
                  </div>
                </div>

                <button className="button-primary" type="submit">
                  Create a New Account
                </button>
              </form>
            )}
          </Formik>

          <hr />
          <div className="form-info-text">Already have an account?</div>

          <button
            onClick={() => navigate("/login")}
            className="button-secondary"
            type="button"
          >
            Login
          </button>
        </div>
      </LoginLayout>
    </div>
  );
};

export default Signup;

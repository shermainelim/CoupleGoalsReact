import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFirstPerson,
  useIsLoggedInFirstPerson,
} from "../../redux/appSlice";
import styles from "./firstPersonLogin.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";

import { Navigate } from "react-router-dom";

const FirstPersonLogin = () => {
  const cx = classNames.bind(styles);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [spaceName, setChangeSpaceName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstPersonEmail, setChangeFirstPersonEmail] = useState("");
  const [firstPersonPassword, setChangeFirstPersonPassword] = useState("");

  const isLoggedInFirstPerson = useIsLoggedInFirstPerson();

  if (isLoggedInFirstPerson) {
    return <Navigate to="/dashboard" />;
  }

  const spaceNameHandler = (event) => {
    setChangeSpaceName(event.target.value);
  };

  const firstPersonEmailHandler = (event) => {
    setChangeFirstPersonEmail(event.target.value);
  };

  const firstPersonPasswordHandler = (event) => {
    setChangeFirstPersonPassword(event.target.value);
  };

  return (
    <div className={cx("register-container")}>
      <div className="register-title"> Login as 1st Person</div>

      <input
        style={{
          borderRadius: "10px",
          padding: "10px",
          paddingRight: "100px",
          marginBottom: "20px",
        }}
        type="text"
        name="name"
        placeholder="Couple Space Name"
        value={spaceName}
        onChange={spaceNameHandler}
      />

      {spaceName.length === 0 && formSubmitted ? (
        <div
          style={{
            marginRight: "180px",
            marginBottom: "5px",
            marginTop: "-15px",
            color: "darkred",
          }}
        >
          *required
        </div>
      ) : null}

      <input
        style={{
          borderRadius: "10px",
          padding: "10px",
          paddingRight: "100px",
          marginBottom: "20px",
        }}
        type="text"
        name="name"
        placeholder="1st Person's Email"
        value={firstPersonEmail}
        onChange={firstPersonEmailHandler}
      />

      {firstPersonEmail.length === 0 && formSubmitted ? (
        <div
          style={{
            marginRight: "180px",
            marginBottom: "5px",
            marginTop: "-15px",
            color: "darkred",
          }}
        >
          *required
        </div>
      ) : null}

      <input
        style={{
          borderRadius: "10px",
          padding: "10px",
          paddingRight: "100px",
          marginBottom: "20px",
        }}
        type="password"
        name="name"
        placeholder="1st Person's Password"
        value={firstPersonPassword}
        onChange={firstPersonPasswordHandler}
      />

      {firstPersonPassword.length === 0 && formSubmitted ? (
        <div
          style={{
            marginRight: "180px",
            marginBottom: "5px",
            marginTop: "-15px",
            color: "darkred",
          }}
        >
          *required
        </div>
      ) : null}

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Login"
        clicked={async () => {
          setFormSubmitted(true);

          if (
            spaceName.length !== 0 &&
            firstPersonEmail.length !== 0 &&
            firstPersonPassword.length !== 0
          ) {
            dispatch(
              loginFirstPerson({
                spaceName,
                firstPersonEmail,
                firstPersonPassword,
              })
            );
            setChangeSpaceName("");
            setChangeFirstPersonEmail("");
            setChangeFirstPersonPassword("");
          }
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Back"
        clicked={() => {
          navigate("/loginOptions");
        }}
      ></CustomButton>
    </div>
  );
};

export default FirstPersonLogin;

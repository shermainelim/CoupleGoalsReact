import * as React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./scss/Welcome.scss";

import CustomButton from "../shared/CustomButton";
import Couple from "../assets/couple.png"

const Welcome = () => {
  const navigate = useNavigate();
  const cx = classNames.bind(styles);


  return (
    <div className={cx("container")}>
      <img
          data-testid="img-logo-resident"
          className={cx("imageIcon")}
          src={Couple}
          alt="Logo"
        />
        <div className={cx("title")}>Couple Goals</div>

        <CustomButton
          className="resident-btn"
          testId="resident"
          content="Create a Couple Space"
          clicked={() => {
            navigate("/register");
          }}

          // resident={true}
        ></CustomButton>

<CustomButton
          className="resident-btn"
          testId="resident"
          content="Login to Couple Space"
          clicked={() => {
            navigate("/register");
          }}

          // resident={true}
        ></CustomButton>
    </div>
  );
};

export default Welcome;

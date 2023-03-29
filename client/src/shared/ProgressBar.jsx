import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProgressBar.scss";

const ProgressBar = ({done}) => {
    const cx = classNames.bind(styles);
	const [style, setStyle] = useState({});
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		
		setStyle(newStyle);
	}, 200);
	
	return (
		<div className={cx("progress")}>
			<div className={cx("progress-done")} style={style}>
				{done}%
			</div>
            <div className={cx("progress-start-end")}>
            <div className={cx("progress-start")}>$500</div>
            <div className={cx("progress-end")}>$10,000</div>
            </div>
        </div>
	)
}

export default ProgressBar;
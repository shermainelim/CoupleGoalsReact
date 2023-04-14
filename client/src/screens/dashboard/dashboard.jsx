import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Dashboard.scss";
import { Card } from "../../shared/Card";
import CustomButton from "../../shared/CustomButton";
import UpdateForm from "../todo/UpdateForm";
import AddTaskForm from "../todo/AddTaskForm";
import ToDo from "../todo/ToDo";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import {
  goalPost,
  fetchGoal,
  logOutFirstPerson,
  useFirstPerson,
  useGoalFetch,
  useFinanceFetch,
  goalDelete,
  goalDone,
  fetchFinance,
  financeDelete,
} from "../../redux/appSlice";
import { Navigate } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Couple from "../../assets/couple6.png";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as cgUtils from "../../utils/cgUtil";

const Dashboard = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

  // Temp State
  /////////////
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  const dispatch = useDispatch();

  const firstPersonData = useFirstPerson();

  const spaceName = firstPersonData[0];
  const firstPersonNameUser = firstPersonData[1];
  const firstPersonBirthdayUser = firstPersonData[2];
  const secondPersonName = firstPersonData[3];
  const secondPersonBirthday = firstPersonData[4];
  const anniversaryDateFirstPersonUser = firstPersonData[5];

  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([]);
  const [toDoFinance, setToDoFinance] = useState([]);
  const [finalArr, setFinalArr] = useState([]);
  const [newArr, setNewArr] = useState([]);

  useEffect(() => {
    //fetch
    dispatch(fetchGoal({ spaceName }));
    dispatch(fetchFinance({ spaceName }));
  }, []);

  let fetchGoalData = useGoalFetch();
  let fetchFinanceData = useFinanceFetch();


useEffect(()=>{
  if(typeof fetchGoalData !== "undefined"){
    processNow();
    sortedArr();
    setToDo(finalArr);
    setNewArr([]);
    setFinalArr([]);
  }
  
  
},[fetchGoalData])

useEffect(()=>{
  if(typeof fetchFinanceData !== "undefined"){
 
    let fetchFinanceDataProcessed = fetchFinanceData[0];
    setToDoFinance(fetchFinanceDataProcessed);

  }
  
  
},[fetchFinanceData])


  function refresh() {
    dispatch(fetchGoal({ spaceName }));
    dispatch(fetchFinance({ spaceName }));
  }

  function processNow() {
    if (fetchGoalData === undefined) {
      return;
    } else {
      let onlyGoalsTable = fetchGoalData[1];

      const objCopy = [onlyGoalsTable];
      objCopy[0]?.map(function (element) {
        let newData = { ...element };

        if (element?.status === 0) {
          newData.status = false;
          newArr.push({ newData });
        } else if (element?.status === 1) {
          newData.status = true;
          newArr.push({ newData });
        }
        return newData;
      });
    }
  }


  function sortedArr() {
    if (newArr.length === 0) {
      return;
    }
    newArr.map(function (element) {
      finalArr.push({
        spaceName: element.newData.spaceName,
        id: element.newData.id,
        title: element.newData.title,
        status: element.newData.status,
      });
    });
  }

  const onClickDelete=()=>{
   
    console.log("deleted");
  }

  const onSubmit = () => {confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div style={{marginLeft:"200px", fontSize:"20px",fontFamily:"monospace"}}>
          <h1>Are you sure?</h1>
          <p>You want to delete this couple space? <br/>
          <br/>It will delete both accounts in the  <br/> <br/>
          couple space.</p>
         
          <CustomButton

className="alert-btn"
testId="resident"
content="No"
clicked={onClose}
></CustomButton>

<CustomButton

className="alert-btn"
testId="resident"
content="Yes, Delete it!"
clicked={onClickDelete}
></CustomButton>
          
          
 
        </div>
      );
    }
  });
}

  //first person login

  var shortMonthNameFirstPersonUserBday = moment(
    firstPersonBirthdayUser
  ).format("DD MMM YYYY");
  var shortMonthNameSecondPersonBday =
    moment(secondPersonBirthday).format("DD MMM YYYY");
  var shortMonthAnniversaryFirstPersonUser = moment(
    anniversaryDateFirstPersonUser
  ).format("DD MMM YYYY");

  const logoutHandler = async () => {
    dispatch(logOutFirstPerson());
    setLogout(true);
  };

  if (logout) {
    return <Navigate to="/" />;
  }

 

  // mm.dd.yyyy
  let daysTgt = cgUtils.getNumberOfDays(anniversaryDateFirstPersonUser);


  const yearsTgt = cgUtils.getFormatedStringFromDays(daysTgt);



  // Add task
  ///////////
  const addTask = () => {
    if (newTask) {
      let num = cgUtils.randomIntFromInterval(1, 10000000);
      setToDo([...toDo, { id: num, title: newTask, status: false }]);

      setNewTask("");

      let id = num;
      let title = newTask;
      let status = false;

      dispatch(goalPost({ spaceName, id, title, status }));
    }
  };

  // Delete task
  //////////////
  const deleteTask = (tid) => {
    // refactored
    setToDo(toDo.filter((task) => task.id !== tid));

    let id = tid;

    dispatch(goalDelete({ spaceName, id }));
  };

  // Mark task as done or completed
  const markDone = (idt) => {
    let id = idt;
    let status = true;

    setToDo(
      toDo.map((task) =>
        task.id === idt ? { ...task, status: !task.status } : task
      )
    );

    dispatch(goalDone({ status, spaceName, id }));
  };

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Change task for update
  const changeHolder = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  // Update task
  const updateTask = () => {
    let removeOldRecord = [...toDo].filter((task) => task.id !== updateData.id);
    setToDo([...removeOldRecord, updateData]);

    setUpdateData("");
  };

  const trashCanHandler = (tid) => {
    setToDoFinance(toDoFinance.filter((task) => task.id !== tid));
    let id = tid;
    dispatch(financeDelete({ spaceName, id }));
  };

  const renderMainCoupleCard = () => {
    return (
      <div className="main-big-card-container">
        <div>
          <div className={cx("space-name-new")}>
            Couple Space of {spaceName}
          </div>
        </div>
        <div className="main-small-card-container-goals">
          <div className={cx("space-welcome")}>
            Welcome {firstPersonNameUser}
          </div>

          <div className={cx("space-welcome")}>
            Your Birthday: {shortMonthNameFirstPersonUserBday}
          </div>

          <div className={cx("space-welcome")}>
            Your Partner's Name: {secondPersonName}
          </div>
          <div className={cx("space-welcome")}>
            Your Partner's Birthday: {shortMonthNameSecondPersonBday}
          </div>

          <div className={cx("space-welcome")}>
            When did you get together? {shortMonthAnniversaryFirstPersonUser}
          </div>

          <div className={cx("space-welcome")}>
            Been together for {daysTgt} days, which is <br />
            {yearsTgt}
          </div>
        </div>
      </div>
    );
  };

  const renderFinanceCard = () => {
    return (
      <div className="big-card-container">
        <div className="big-card-icon">
          <div className="big-card-title">Finance Tracker</div>
          <div
            onClick={() => {
              navigate("/financeForm");
            }}
          >
            <FontAwesomeIcon size="3x" icon={faCirclePlus} />
          </div>
        </div>

        <Card todoFinance={toDoFinance} deleteFinance={trashCanHandler} />
      </div>
    );
  };

  const renderGoalCard = () => {
    return (
      <div className="big-card-container-goals">
        <div className="big-card-title">Goal Tracker</div>

        <div className="small-card-container-goals">
          {updateData && updateData ? (
            <UpdateForm
              updateData={updateData}
              changeHolder={changeHolder}
              updateTask={updateTask}
              cancelUpdate={cancelUpdate}
            />
          ) : (
            <AddTaskForm
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
            />
          )}

          {toDo && toDo.length ? "" : "No Tasks..."}

          <ToDo
            toDo={toDo}
            markDone={markDone}
            setUpdateData={setUpdateData}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={cx("space-container")}>
      <div className={cx("space-refresh")}>
        <img
          data-testid="img-logo-resident"
          className={cx("imageIcon")}
          src={Couple}
          alt="Logo"
          style={{ width: "350px", height: "350px" }}
        />
        <span title="refresh" onClick={refresh}>
          <FontAwesomeIcon size={"3x"} icon={faRefresh} />
        </span>
      </div>

      {renderMainCoupleCard()}

      {renderFinanceCard()}

      {renderGoalCard()}

      <CustomButton

        className="resident-btn"
        testId="resident"
        content="Logout"
        clicked={logoutHandler}
      ></CustomButton>

<CustomButton

className="resident-btn"
testId="resident"
content="Delete Couple Space"
clicked={onSubmit}
></CustomButton>
    </div>
  );
};

export default Dashboard;

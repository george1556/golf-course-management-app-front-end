import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTeeTime } from "../store/teetimes/actions";
import { Link } from "react-router-dom";

const TeeTime = props => {
  const customers = useSelector(state => state.customers.all);
  const dispatch = useDispatch();
  let currentCustomers = [];

  let date = new Date(props.teetime[0].time);

  let TDate = new Intl.DateTimeFormat("en-us", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date);

  let TTime = new Intl.DateTimeFormat("en-us", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);

  customers.filter(customer => {
    for (let i = 0; i < props.customers.length; i++) {
      if (customer.id === props.customers[i])
        currentCustomers.push(
          <div className="row">
            <div className="col">{customer.name}</div>
          </div>
        );
    }
  });

  const deleteButtonClick = e => {
    dispatch(deleteTeeTime(e.target.id));
    setTimeout(window.location.reload(), 2000);
  };

  const editButtonClick = e => {
    console.log(e.target.id);
  };

  return (
    <div className="card" style={{ marginTop: "10px" }}>
      <div className="card-body">
        <h5 className="card-title">
          <div className="row">
            <div className="col" style={{ textAlign: "left" }}>
              Players
            </div>
            {/* <div className="col">{props.teetime[0].time}</div> */}
            <div className="col" style={{ textAlign: "right" }}>
              {TDate} {TTime}
            </div>
          </div>
        </h5>
        <div className="row">
          <div className="col" style={{ textAlign: "left" }}>
            {currentCustomers}
          </div>
        </div>
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col">
            <Link
              to={{
                pathname: "/edit",
                state: {
                  teeTimeId: props.teetime[0].id,
                  customers: props.customers,
                  date: TDate,
                  time: TTime
                }
              }}
            >
              <button
                type="button"
                id={props.teetime[0].id}
                onClick={editButtonClick}
                className="btn btn-warning btn-block btn-sm"
              >
                Edit Tee Time
              </button>
            </Link>
          </div>

          <div className="col">
            <button
              type="button"
              id={props.teetime[0].id}
              className="btn btn-danger btn-block btn-sm"
              onClick={deleteButtonClick}
            >
              Delete Tee Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeeTime;

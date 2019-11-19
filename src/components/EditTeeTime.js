import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateTeeTime } from "../store/teetimes/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { registerLocale, setDefaultLocale } from "react-datepicker";
registerLocale("es", es);

const EditTeeTime = props => {
  //const [inputBox, setInputBox] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const customers = useSelector(state => state.customers.all);
  const dispatch = useDispatch();
  let currentCustomers = props.location.state.customers;
  let teeTimeId = props.location.state.teeTimeId;

  let currentCustomersList = [];
  let filteredCustomers = [];

  customers.filter(customer => {
    for (let i = 0; i < currentCustomers.length; i++) {
      if (customer.id === currentCustomers[i])
        currentCustomersList.push(
          <div className="row">
            <div className="col">{customer.name}</div>
          </div>
        );
    }
  });

  let listOfCustomers = [];

  customers.map(customer => {
    listOfCustomers.push(<option id={customer.id}>{customer.name}</option>);
  });

  // const handleChange2 = e => {
  //   console.log("startDate: ", startDate);
  // };

  const handleChange = e => {
    //Creates a new array to hold the selected customers from the drop down.
    let selectedCustomers = [];

    //Gets all the selected options from the dropdown
    let selected = document.getElementsByClassName("selected");

    //Puts all the selected options in an array
    for (let i = 0; i < selected.length; i++) {
      selectedCustomers.push(selected[i].textContent);
    }

    //Filters so only unique customers are kept, and removes duplicates from array
    filteredCustomers = selectedCustomers.filter((player, index) => {
      return selectedCustomers.indexOf(player) === index;
    });
    console.log("SELECTED CUSTOMERS: ", filteredCustomers);
  };

  //Converts the time passed from props, to a format the datepicker can read to use as the default start date.
  let importDate = props.location.state.date + " " + props.location.state.time;
  let importDateConverted = new Date(importDate);

  const handleSubmit = e => {
    e.preventDefault();
    //Grabs the new time from the time area of the form
    let newTime = new Date(startDate + "UTC").toISOString();

    let playersArray = [];
    customers.filter(customer => {
      if (filteredCustomers.includes(customer.name) === true) {
        playersArray.push(parseInt(customer.id));
      }
    });
    console.log("NEWTIME: ", newTime);
    console.log("PLAYERS ARRAY: ", playersArray);

    dispatch(
      updateTeeTime(
        {
          time: newTime,
          players: playersArray
        },
        teeTimeId
      )
    );
  };

  // console.log("Router props.location.state: ", props.location.state);

  return (
    <div className="card" style={{ marginTop: "10px" }}>
      <div
        className="card-header"
        style={{ textAlign: "center", marginBottom: 0 }}
      >
        <h6 style={{ marginBottom: 0, fontWeight: "bold" }}>
          Edit Tee Time Details
        </h6>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ textAlign: "left" }}>
            <h6>Tee Time</h6>
            {/* <input
              type="text"
              className="form-control"
              id="editTime"
              placeholder="2019-12-09T01:57:19+07:00"
            /> */}
            <div style={{ width: "100%", display: "block" }}>
              <DatePicker
                selected={importDateConverted}
                onSelect={date => setStartDate(date)}
                onChange={date => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                style={{ width: "100%", boxSizing: "content-box" }}
              />
            </div>
            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col">
                <h6>Original Players:</h6>
              </div>
            </div>

            <div className="row">
              <div className="col" style={{ textAlign: "left" }}>
                {currentCustomersList}
              </div>
            </div>
            {/* <div className="row">
              <div className="col">Select New Players:</div>
            </div> */}
            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col">
                <h6>Select up to 4 players including yourself:</h6>
              </div>
            </div>
            <select
              data-live-search="true"
              className="selectpicker"
              multiple
              title="Select up to 4 Players..."
              data-width="100%"
              data-max-options="4"
              onChange={handleChange}
              id="players"
            >
              {listOfCustomers}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ textAlign: "left" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditTeeTime;

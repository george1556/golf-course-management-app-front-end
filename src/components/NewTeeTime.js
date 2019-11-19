import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Customer from "./Customer";
import TeeTime from "./TeeTime";
import { addNewTeeTime } from "../store/teetimes/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { registerLocale, setDefaultLocale } from "react-datepicker";
registerLocale("es", es);

const NewTeeTime = () => {
  const [startDate, setStartDate] = useState(new Date());
  const customers = useSelector(state => state.customers.all);
  const customersTeeTimes = useSelector(state => state.customersTeeTimes.all);
  const teeTimes = useSelector(state => state.teeTimes.all);

  const dispatch = useDispatch();
  let filteredCustomers = [];

  let teeTimesObj = {};
  for (let i = 0; i < customersTeeTimes.length; i++) {
    if (teeTimesObj.hasOwnProperty(customersTeeTimes[i].tee_time_id)) {
      teeTimesObj[customersTeeTimes[i].tee_time_id].push(
        customersTeeTimes[i].customer_id
      );
    } else {
      teeTimesObj[customersTeeTimes[i].tee_time_id] = [
        customersTeeTimes[i].customer_id
      ];
    }
  }

  let teeTimesList = [];

  for (const k in teeTimesObj) {
    let currentTeeTime = teeTimes.filter(time => time.id == k);
    teeTimesList.push(
      <TeeTime key={k} teetime={currentTeeTime} customers={teeTimesObj[k]} />
    );
  }

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

  let listOfCustomers = customers.map(customer => (
    <Customer key={customer.id} customer={customer} />
  ));

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

    dispatch(
      addNewTeeTime({
        time: newTime,
        players: playersArray
      })
    );

    console.log("PLAYERS ARRAY: ", playersArray, " NEW TIME: ", newTime);
  };

  return (
    <div>
      <div className="card" style={{ marginTop: "10px" }}>
        <div className="card-header" style={{ marginBottom: "0" }}>
          <h5 className="card-title" style={{ marginBottom: "0" }}>
            Enter A New Tee Time
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ textAlign: "left" }}>
              <label>Tee Time</label>
              {/* <input
                type="text"
                className="form-control"
                id="newTime"
                placeholder="2019-12-09T01:57:19+07:00"
              /> */}
              <div style={{ width: "100%", display: "block" }}>
                <DatePicker
                  selected={startDate}
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
            </div>
            <div className="form-group" style={{ textAlign: "left" }}>
              <label>Select up to 4 players including yourself:</label>
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
      <div className="card" style={{ marginTop: "10px" }}>
        <div className="card-header">
          <h5 className="card-title" style={{ marginBottom: "0" }}>
            Current Tee Times
          </h5>
        </div>
      </div>
      <div>{teeTimesList}</div>
    </div>
  );
};
export default NewTeeTime;

import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { fetchAllTeeTimes } from "./store/teetimes/actions";
import { fetchAllCustomers } from "./store/customers/actions";
import { fetchAllCustomersTeeTimes } from "./store/customersteetimes/actions";
import NewTeeTimeForm from "./components/NewTeeTime";
import EditTeeTime from "./components/EditTeeTime";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTeeTimes());
    dispatch(fetchAllCustomers());
    dispatch(fetchAllCustomersTeeTimes());
  });
  return (
    <Router>
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col">
              <Switch>
                <Route exact path="/" component={NewTeeTimeForm} />
                <Route path="/edit" component={EditTeeTime} />
              </Switch>
              {/* <NewTeeTimeForm /> */}
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

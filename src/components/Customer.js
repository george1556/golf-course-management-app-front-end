import React from "react";
const Customer = props => {
  return <option id={props.customer.id}>{props.customer.name}</option>;
};
export default Customer;

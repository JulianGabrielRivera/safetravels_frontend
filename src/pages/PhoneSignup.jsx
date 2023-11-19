import React from "react";
import { useState } from "react";

export const PhoneSignup = () => {
  const [phoneNumber, setphoneNumber] = useState("");

  const phoneHandle = (e) => {
    setphoneNumber(e.target.value);
  };
  console.log(phoneNumber);
  return (
    <div>
      <h1>opt in for coupon</h1>
      <label>Enter Phone Number</label>
      <input
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={phoneHandle}
      />
      <button>Send</button>
    </div>
  );
};

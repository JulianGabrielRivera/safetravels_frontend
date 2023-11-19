// import React from "react";
// import { useState } from "react";

// export const PhoneSignup = () => {
//   const [phoneNumber, setphoneNumber] = useState("");
//   const [name, setName] = useState("");

//   const phoneHandle = (e) => {
//     setphoneNumber(e.target.value);
//   };
//   const nameHandle = (e) => {
//     setphoneNumber(e.target.value);
//   };
//   console.log(phoneNumber);
//   return (
//     <div>
//       <h1>Opt in for safetravels coupon</h1>
//       <div class="mb-3">
//         <label for="formGroupExampleInput" class="form-label">
//           Name
//         </label>
//         <input
//           type="text"
//           class="form-control"
//           name="name"
//           value={name}
//           onChange={nameHandle}
//           id="formGroupExampleInput"
//           placeholder="Name"
//         />
//       </div>
//       <div class="mb-3">
//         <label for="formGroupExampleInput2" class="form-label">
//           Phone Number
//         </label>
//         <input
//           type="text"
//           class="form-control"
//           name="phoneNumber"
//           value={phoneNumber}
//           onChange={phoneHandle}
//           id="formGroupExampleInput2"
//           placeholder="Phone Number"
//         />
//       </div>

//       <div>
//         <label>
//           I agree to receive marketing and promotional SMS from 888-888-8888.
//           msg & data rates may apply. Reply STOP to opt out, HELP for help.{" "}
//         </label>
//         <input type="checkbox" />
//       </div>
//       <button>Submit</button>
//     </div>
//   );
// };

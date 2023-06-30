import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { useLocation } from 'react-router-dom';


const CreditCardForm = ({  totalAmount }) =>{
  const location = useLocation();
  const shippingInfo = location.state?.userShippingAddress;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(shippingInfo);
  };

  return (
    <div className="container">
   
      <form onSubmit={handleSubmit(onSubmit)} >
      <span className="totAmoun" >{totalAmount}</span>
        <div className="inputBox">
          <span>card number</span>
          <input
            type="text"
            maxLength="16"
            className="card-number-input"
            {...register("cardNumber", { required: true, pattern: /^[0-9]{16}$/ })}
          />
          {errors.cardNumber && <p>Card number is required and should be 16 digits.</p>}
        </div>
        <div className="inputBox">
          <span>card holder</span>
          <input
            type="text"
            className="card-holder-input"
            {...register("cardHolder", { required: true })}
          />
          {errors.cardHolder && <p>Card holder name is required.</p>}
        </div>
        <div className="flexbox">
          <div className="inputBox">
            <span>expiration mm</span>
            <select
              name=""
              id=""
              className="month-input"
              {...register("expiryMonth", { required: true })}
            >
              <option value="" disabled defaultValue>
                month
              </option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            {errors.expiryMonth && <p>Please select the expiration month.</p>}
          </div>
          <div className="inputBox">
            <span>expiration yy</span>
            <select
              name=""
              id=""
              className="year-input"
              {...register("expiryYear", { required: true })}
            >
              <option value="" disabled defaultValue>
                year
              </option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
            {errors.expiryYear && <p>Please select the expiration year.</p>}
          </div>
          <div className="inputBox">
            <span>cvv</span>
            <input
              type="text"
              maxLength="3"
              className="cvv-input"
              {...register("cvv", { required: true, pattern: /^[0-9]{3}$/ })}
            />
            {errors.cvv && <p>CVV is required and should be 3 digits.</p>}
          </div>
        </div>
        <input type="submit" value="submit" className="submit-btn" />
      </form>
    </div>
  );
}
export default CreditCardForm;
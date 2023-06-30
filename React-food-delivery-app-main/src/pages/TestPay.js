import React, { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import { Rings } from 'react-loader-spinner'
import "./App.css";
import CreditCardForm from "./CreditCardForm";
function TestPay() {

    const location = useLocation();
    const shippingInfo = location.state?.userShippingAddress;
    const totalAmount = shippingInfo?.totalAmount;
    const [currentTab, setCurrentTab] = useState('1');
    const [creditCardFormData, setCreditCardFormData] = useState(null);
    const [orderid, setOderid] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const tabs = [
        {
            id: '1',
            tabTitle: 'Cash On Delivery',
        },
        {
            id: '2',
            tabTitle: 'Credit Card',
        },
    ];

    const handleTabClick = (id) => {
        setCurrentTab(id);
        setLoading(true);
    };

    const handleCreditCardFormSubmit = (data) => {
        // Handle the submitted form data
        setCreditCardFormData(data);
    };

    const prepareOrder = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shippingInfo)
        };

        fetch('http://localhost:8081/api/v1/placeOrder', requestOptions)
            .then(response => response.json())
            .then(data => {

                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    setLoading(false);
                }, 3000);
                setOderid(data.orderId);
                // Print the response data
                // Rest of your code
            })
            .catch(error => {
                console.error('Error placing the order:', error);
                setLoading(false);
            });
    }

    useEffect(() => {
        setLoading(true);
    }, []);

    const renderForm = () => {
        if (currentTab === '1') {
            return (
                <div className="container">
                    <button onClick={prepareOrder} className="submit-btn" >Confirm Order</button>

                </div>

            );

        } else if (currentTab === '2') {

            return (

                <CreditCardForm
                    onSubmit={handleCreditCardFormSubmit}
                    totalAmount={totalAmount}
                    shippingInfo={shippingInfo}

                />
            );
        }
    };

    return (
        <div className='container'>
            <div className="Title">Select Payment Method</div>
            <div className='tabs'>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`tab ${currentTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.tabTitle}
                    </div>
                ))}
            </div>
            <div className='content'>
                {renderForm()}

            </div>

            {!loading && (
                <div>
                    <button className="getinvoicebtn">
                        <Link to={`/invoice/${orderid}`}>Get Invoice</Link>
                    </button>
                </div>
            )}

            <div>
                <div className="align">
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <Rings
                                    height="200"
                                    width="200"
                                    color="#4fa94d"
                                    radius="6"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel="rings-loading"
                                />
                            </div>
                            <div>Order Create Succesfully</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TestPay;
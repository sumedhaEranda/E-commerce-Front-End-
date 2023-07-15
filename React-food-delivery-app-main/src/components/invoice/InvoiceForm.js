import React, { useState, useEffect } from 'react';
import InvoiceModal from './InvoiceModal';
import "./invoice.css";
import { useParams } from 'react-router-dom';
const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {id } = useParams();
  const [invoiceNumber] = useState(id);
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const maxItemsToRender = 1;
  const orderid = id;
  useEffect(() => {
    fetch(`http://54.234.132.181:8081/api/v1/getOrder/${orderid}`)
      .then((response) => response.json())
      .then((data) => setItems(data));

  }, []);

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };


  return (
    <div className="min-h-screen bg-gray-100">
    <div className="mx-auto max-w-7xl">
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              required
              className="max-w-[130px]"
              type="number"
              name="invoiceNumber"
              value={id}
            />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">INVOICE</h1>





        <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
          {/* <label
            htmlFor="cashierName"
            className="text-sm font-bold sm:text-base"
          >
            Cashier:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Cashier name"
            type="text"
            name="cashierName"
            id="cashierName"
            value={cashierName}
            onChange={(event) => setCashierName(event.target.value)}
          /> */}
          {/* <label
            htmlFor="customerName"
            className="col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Customer:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Customer name"
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          /> */}
        </div>
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>ITEM</th>
              <th>QTY</th>
              <th className="text-center">PRICE</th>

            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.pid}>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td className="text-center">{item.price}</td>

              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>
              {items.slice(0, maxItemsToRender).map((item) => (
                <td key={item.id}>{item.totalamount}</td>
              ))}
            </span>
          </div>
        </div>
      </div>
      <div className="basis-1/4 bg-transparent">
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review Invoice
          </button>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              // cashierName,
              // customerName,

            }}
            items={items}

          />

        </div>
      </div>
    </form>
    </div>
    </div>
  );
};

export default InvoiceForm;

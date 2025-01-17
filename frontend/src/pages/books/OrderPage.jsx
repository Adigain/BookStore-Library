import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useFetchOrderByEmailQuery } from "../../redux/features/cart/ordersApi";

const OrderPage = () => {
  const { currentUser, userData } = useAuth();

  const mail = userData?.email || "";

  const {
    data = { allOrdersByEmail: [] },
    isLoading,
    isError,
  } = useFetchOrderByEmailQuery(mail, { skip: !currentUser });

  if (!currentUser) return <p>No orders found.</p>;
  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error</div>;

  const allOrdersEmail = data.allOrdersByEmail;
  if (allOrdersEmail.length === 0) return <p>No orders found.</p>;

  return (
    <div className="container mx-auto p-6 bg-violet-300 bg-opacity-50">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      {allOrdersEmail.map((singleOrder) => (
        <div key={singleOrder._id} className= "rounded shadow-lg p-4 bg-violet-200">
          <div className="border-b mb-4 pb-4 border-violet-600"></div>
          <h2 className="font-bold">Order ID: {singleOrder._id}</h2>
          <p className="text-gray-600">Name: {singleOrder.name}</p>
          <p className="text-gray-600">Email: {singleOrder.email}</p>
          <p className="text-gray-600">Phone: {singleOrder.phone}</p>
          <p className="text-gray-600">Total Price: ${singleOrder.totalPrice}</p>
          <h3 className="font-semibold mt-2">Address:</h3>
          <p> {singleOrder.address.street}, {singleOrder.address.city}, {singleOrder.address.state}, {singleOrder.address.country}, {singleOrder.address.zipcode}</p>
          <h3 className="font-semibold mt-2">Products Id:</h3>
          {singleOrder.productIds.map((pdt) => (
            <ul key={pdt}>
            <li>{pdt}</li>
          </ul>
          ))}

          
        </div>
      ))}
    </div>
  );
};

export default OrderPage;

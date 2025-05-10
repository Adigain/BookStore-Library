import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useFetchOrderByEmailQuery } from "../../redux/features/cart/ordersApi";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import BookCard from "../books/bookcard";
import { useFetchAllBooksQuery } from "../../redux/features/cart/booksApi";

const OrderPage = () => {
  const { data: bookdata = { allBooks: [] } } = useFetchAllBooksQuery();
  const books = bookdata.allBooks;
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
        <div
          key={singleOrder._id}
          className="rounded shadow-lg p-4 bg-violet-200"
        >
          <div className="border-b mb-4 pb-4 border-violet-600"></div>
          <h2 className="font-bold">Order ID: {singleOrder._id}</h2>
          <p className="text-gray-600">Name: {singleOrder.name}</p>
          <p className="text-gray-600">Email: {singleOrder.email}</p>
          <p className="text-gray-600">Phone: {singleOrder.phone}</p>
          <p className="text-gray-600">
            Total Price: ${singleOrder.totalPrice}
          </p>
          <h3 className="font-semibold mt-2">Address:</h3>
          <p>
            {" "}
            {singleOrder.address.street}, {singleOrder.address.city},{" "}
            {singleOrder.address.state}, {singleOrder.address.country},{" "}
            {singleOrder.address.zipcode}
          </p>
          <h3 className="font-semibold mt-2">Products:</h3>

          <div>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              cssMode={true}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              rewind={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1180: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination, Navigation, Mousewheel, Keyboard]}
              className="mySwiper"
            >
              {books.length > 0 &&
                books
                  .filter((book) => singleOrder.productIds.includes(book._id))
                  .map((book, index) => (
                    <SwiperSlide key={index} className="rounded-lg">
                      <BookCard key={index} book={book} />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;

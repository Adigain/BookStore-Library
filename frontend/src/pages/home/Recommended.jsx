import React, { useEffect, useState } from "react";
import BookCard from "../books/bookcard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/cart/booksApi";

const Recommended = () => {
  /*const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);*/

  const { data = { allBooks: [] } } = useFetchAllBooksQuery();
  const books = data.allBooks;

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended For You</h2>
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
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 100,
            },
          }}
          modules={[Pagination, Navigation, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {books.length > 0 &&
            books.slice(8, 18).map((book, index) => (
              <SwiperSlide key={index} className="rounded-lg">
                  <BookCard key={index} book={book} />
                
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Recommended;

import React, { useEffect, useState } from "react";
import BookCard from "../books/bookcard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/cart/booksApi";


const categories = [
  "Choose a genre",
  "Fiction",
  "Horror",
  "Adventure",
  "Business",
];

const TopSellers = () => {


  /*const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);*/


  /*useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/books.json');
            
            // Check if the response is valid
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const jsonData = await response.json(); // Correct way to parse JSON
            setBooks(jsonData);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        }
    };

    fetchData();
}, []);*/

  /*const {data: books = []} = useFetchAllBooksQuery()
  console.log(books)*/

  const { data = { allBooks: [] } } = useFetchAllBooksQuery(); 
  const books = data.allBooks;
  


  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );
  

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
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
          {filteredBooks.length > 0 &&
            filteredBooks.map((book, index) => (
              <SwiperSlide key={index} className='rounded-lg'>
                <BookCard key={index} book={book}/>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopSellers;

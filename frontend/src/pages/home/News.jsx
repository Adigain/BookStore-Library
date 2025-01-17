import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";

import { getImgUrl } from "../../utils/getImgUrl";

 
    


const News = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch("/news.json")
          .then((res) => res.json())
          .then((data) => setNews(data));
      }, []);

  return (
    <div className='py-16'>
      <h2 className="text-3xl font-semibold mb-6">News</h2>
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
              slidesPerView: 2,
              spaceBetween: 100,
            },
          }}
          modules={[Pagination, Navigation, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {news.length > 0 &&
            news.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-12 p-2 border border-gray-700 bg-violet-300">
                    <div>
                        <Link to="/">
                        <h3 className="text-lg font-medium hover:text-blue-500 mb-4">
                            {item.title}
                        </h3>
                        </Link>
                        <div className="w-12 h-[4px] bg-primary mb-5">
                        </div>
                    
                        <p className="text-sm text-gray-600">
                            {item.description}
                        </p>
                    </div>
                    <div className="flex shrink-0">
                        <img src={`${getImgUrl("news", item.image)}`} alt = "img" className="w-full object-cover"/>
                    </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}

export default News

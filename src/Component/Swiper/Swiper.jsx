import React, { useContext } from "react";
import { AuthContext } from "../../Authcontext";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const There = () => {
  const { modelData } = useContext(AuthContext);

  if (!modelData || modelData.length === 0) {
    return (
      <p className="text-white text-center mt-10 text-lg">
        No models found.
      </p>
    );
  }

  return (
    <section className="w-full bg-[#11190C] py-10">
      <h1 className="text-center text-3xl font-bold text-green-400 mb-8">
        ALL AI MODELS
      </h1>

      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="px-6"
        >
          {modelData.map((item) => (
            <SwiperSlide key={item._id || item.id}>
              <Link
                to={`/MODEL/${item._id}`}
                className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-green-400/30"
              >
                <img
                  src={item.image || "/default-model.png"}
                  alt={item.name}
                  className="w-40 h-40 object-contain rounded-lg mb-4"
                />
                <h3 className="text-green-400 font-semibold text-lg">
                  {item.name}
                </h3>
                <p className="text-gray-300 text-sm mt-2">{item.useCase}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default There;

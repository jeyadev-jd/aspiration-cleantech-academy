"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { partners } from "@/lib/partnersData";

const PartnersGrid = ({ title = "Placement In 30+ Brands" }: { title?: string }) => {
    return (
        <div className="brand-section fix section-padding">
            <div className="container">
                <div className="brand-wrapper">
                    <h6 className="text-center slideUp" data-delay=".3">{title}</h6>
                    <Swiper
                        breakpoints={{
                            1199: { slidesPerView: 5 },
                            991: { slidesPerView: 4 },
                            767: { slidesPerView: 3 },
                            575: { slidesPerView: 2 },
                            0: { slidesPerView: 1 },
                        }}
                        spaceBetween={30}
                        speed={1300}
                        centeredSlides
                        loop
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {partners.map(({ id, img }) => (
                            <SwiperSlide key={id}>
                                <div className="brand-image">
                                    <img src={img} alt="brand-img" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default PartnersGrid;

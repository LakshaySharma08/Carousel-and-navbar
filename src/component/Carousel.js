import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./Carousel.css";

const Carousel = () => {
    const [photos, setPhotos] = useState([]);
    const [currPhoto, setCurrPhoto] = useState(0);

    const fetchData = async () => {
        const res = [];

        for (let i = 0; i < 5; i++) {
            const output = await fetch("https://picsum.photos/800/500");
            res.push(output.url);
        }

        setPhotos(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        beforeChange: (current, next) => setCurrPhoto(next),
    };

    return (
        <div className="carousel-container">
            <h1 className="carousel-heading">IMAGES & SCENERY</h1>
            {photos.length !== 0 ? (
                <Slider {...settings} className="custom-slider">
                    {photos.map((photo, index) => (
                        <div key={index} className={`carousel-slide ${index === currPhoto ? 'active-slide' : ''}`}>
                            <img src={photo} alt={`slide-${index}`} className="carousel-image" />
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="carousel-div">LOADING ...</div>
            )}
        </div>
    );
};

export default Carousel;

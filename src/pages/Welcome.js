import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import logo from "../assets/img/logo.png";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Swiper, SwiperSlide } from "swiper/react";
import "../App.css";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Button } from "@mui/material";
import { useLocalStorage } from "../hooks/useLocalStorage";
export const Welcome = () => {
  const navigate = useNavigate();
  const [welcome, setWelcome] = useLocalStorage("welcome");

  useEffect(() => {
    if (welcome) {
      navigate("/home");
    }
  }, [welcome, navigate]);

  return (
    <div className="w-screen h-screen bg-blue-500 flex flex-col place-items-center">
      <div className="mx-auto mt-7">
        <img src={logo} alt="logo" className="object-none" />
        <p className="text-white text-lg font-thin italic">
          Twoje ulubione miejsca na ryby!
        </p>
      </div>

      <div className="w-2/3 text-2xl text-white mt-20">
        <p className="font-semibold">Chcesz dodać łowisko?</p>
        <p className="font-thin">To tylko 3 proste kroki!</p>
      </div>
      <div className=" flex place-content-center w-full mt-24 text-white px-3">
        <Swiper
          className="mySwiper"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          <SwiperSlide>
            <div>
              <p className="mb-7 text-2xl md:text-4xl font-light">
                <span className="font-semibold">1.</span> Zaznacz na mapie swoje
                łowisko.
              </p>
              <PinDropIcon sx={{ fontSize: 60 }} />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div>
              <p className="mb-7 text-2xl md:text-4xl font-light">
                <span className="font-semibold">2.</span> Wypełnij wymagane
                informacje.
              </p>
              <AssignmentIcon sx={{ fontSize: 60 }} />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div>
              <p className="mb-7 text-2xl md:text-4xl font-light">
                <span className="font-semibold">3.</span> Kliknij{" "}
                <span className="font-semibold">DODAJ</span> i zaczekaj na
                akceptacje.
              </p>
              <HourglassBottomIcon sx={{ fontSize: 60 }} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex  h-full place-items-center">
        <div>
          <Link to="/">
            <Button
              onClick={() => setWelcome(true)}
              variant="contained"
              color="info"
              size="large"
            >
              Otwórz mapę <NavigateNextIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

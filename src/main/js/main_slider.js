import '../css/main_slider.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import SlideImg1 from '../../images/slide1.jpg'
import SlideImg2 from '../../images/slide2.jpg'
import SlideImg3 from '../../images/slide3.jpg'
import SlideImg4 from '../../images/slide4.jpg'

export default function Main_slider() {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return(
        <div id="main_slider_div">
            <Slider {...settings}>
                <img alt='' src={`${SlideImg1}`}></img>
                <img alt='' src={`${SlideImg2}`}></img>
                <img alt='' src={`${SlideImg3}`}></img>
                <img alt='' src={`${SlideImg4}`}></img>
            </Slider>
        </div>
    )
}
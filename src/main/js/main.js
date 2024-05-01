import '../css/main.css';
import MainSlider from './main_slider';
import MainUsed from './main_used';
import MainFree from './main_free';

export default function Main() {
    return(
        <div id='main'>
            <div id='main_img_slider'>
                <MainSlider/>
            </div>

            {/* 중고 상품 */}
            <div id='main_used_page'>
                <MainUsed/>
            </div>

            {/* 무료 상품 */}
            <div id='main_free_page'>
                <MainFree/>
            </div>

            <div id='main_footer'>
                
            </div>
        </div>
    )
}
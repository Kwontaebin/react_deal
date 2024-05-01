import '../css/market_price_list.css';
import cookie from 'react-cookies'
import axios from 'axios';

export default function Market_price_list(props) {
    const { id, img, price, content, view } = props;

    const view_detail_item=async()=> {
        const login_user_id = cookie.load('id');

        if(login_user_id === undefined) {
            alert('로그인 먼저 하세요');
            window.location.href='/login';
        } else {
            window.location.href=`/view_detail?id=${id}&ie=utf-8`

            const add_view_obj = { id:id, view:view };
            const result = await axios.put('/post_add_view', add_view_obj);
            console.log(result);
        }
    }

    return(
        <div id='market_price_list_div'>
            <div id='market_price_list_div_inner'>
                <div id='market_price_list_div_inner_img'>
                    <img alt='' src={`${img}`}></img>
                </div>

                <div id='market_price_list_div_inner_content_price'>
                    {/* content */}
                    <div id='market_price_list_div_inner_content_price_top'>
                        <p>{content}</p>
                    </div>

                    {/* price */}
                    <div id='market_price_list_div_inner_content_price_bottom'>
                        <p>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                    </div>
                </div>

                <div id='market_price_list_div_inner_content_right'>
                    <button onClick={view_detail_item}>아이템 보기</button>
                </div>
            </div>
        </div>
    )
}
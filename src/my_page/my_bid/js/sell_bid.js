import '../css/sell_bid.css';
import axios from 'axios';

export default function Sell_bid(props) {
    const { id, price, content, img, favorite, view } = props;

    const view_detail_item=async()=> {
        window.location.href=`/view_detail?id=${id}&ie=utf-8`

        const add_view_obj = { id:id, view:view };
        const result = await axios.put('/post_add_view', add_view_obj);
        console.log(result);
    }


    return(
        <div id='sell_bid_div'>
            <div id='sell_bid_div_inner'>
                <div id='sell_bid_div_inner_header'>
                    <img alt='' src={`${img}`} onClick={view_detail_item}></img>
                </div>

                <div id='sell_bid_div_inner_main'>
                    <div id='sell_bid_div_inner_main_content'>
                        <p>{content}</p>
                    </div>

                    <div id='sell_bid_div_inner_main_price'>
                        <p>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                    </div>

                    <div id='sell_bid_div_inner_main_favorite_view'>
                        <p>관심 {favorite}</p>
                        <p>조회 {view}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
import '../css/used_item_list.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { useEffect } from 'react';

export default function Used_item_list(props) {
    const {id, img, content, price, favorite, view, status} = props;

    useEffect(() => {
        console.log(status);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        <div id='used_item_list_div'>
            <div id='used_item_list_div_inner'>
                <div id='used_item_list_div_inner_header'>
                    <img alt='' src={`${img}`} onClick={view_detail_item}></img>
                    <input defaultValue={status} id='input_status'></input>
                </div>

                <div id='used_item_list_div_inner_main'>
                    <div id='used_item_list_div_inner_main_content'>
                        <p>{content}</p>
                    </div>

                    <div id='used_item_list_div_inner_main_price'>
                        <p>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                    </div>

                    <div id='used_item_list_div_inner_main_favorite_view'>
                        <p>관심 {favorite}</p>
                        <p>조회 {view}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
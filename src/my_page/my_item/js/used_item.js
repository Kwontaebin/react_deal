import axios from 'axios';
import '../css/used_item.css';
import cookie from 'react-cookies';
import { useEffect, useState } from 'react';

export default function Used_item(props) {
    const { id, name, price, content, img, date, view } = props;
    const [buy_item_list, set_buy_item_list] = useState([]);

    useEffect(() => {
        get_buy_item_list();

        async function get_buy_item_list() {
            const {
                data
            } = await axios.get('/get_buy_item');
            set_buy_item_list(data);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const view_detail_item=async()=> {
        window.location.href=`/view_detail?id=${id}&ie=utf-8`

        const add_view_obj = { id:id, view:view };
        const result = await axios.put('/post_add_view', add_view_obj);
        console.log(result);
    }

    const used_item_div_inner_footer_delete_btn=async()=> {
        const login_user_id = cookie.load('id');
        console.log(buy_item_list);

        for(let i = 0; i < buy_item_list.length; i++) {
            if(Number(buy_item_list[i].item_id) === Number(id)) {
                alert('이미 판매가 완료된 상품이라서 삭제가 불가능합니다.');
                return;
            }
        }

        if(window.confirm('삭제하시겠습니까?')) {
            const result = await axios.delete(`/delete_item/${id}/${login_user_id}`);
            console.log(result);
            window.location.reload();
        } else {
            alert('취소');
        }
    }

    const used_item_div_inner_footer_update_btn=()=> {
        for(let i = 0; i < buy_item_list.length; i++) {
            if(Number(buy_item_list[i].item_id) === Number(id)) {
                alert('이미 판매가 완료된 상품이라서 수정이 불가능합니다.');
                return;
            }
        }

        window.location.href=`/update_page?id=${id}&ie=utf-8`;
    }
    
    return(
        <div id='used_item_div'>
            <div id='used_item_div_inner'>
                <div id='used_item_div_inner_img'>
                    <img alt='' src={`${img}`} onClick={view_detail_item}></img>
                </div>

                <div id='used_item_div_inner_name_date'>
                    <p id='used_item_div_inner_name'>{name}</p>
                    <p id='used_item_div_inner_date'>{date}</p>
                </div>

                <div id='used_item_div_inner_content'>
                    <p>{content}</p>
                </div>

                <div id='used_item_div_inner_price'>
                    <p>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>

                <div id='used_item_div_inner_footer'>
                    <button id='used_item_div_inner_footer_update_btn' onClick={used_item_div_inner_footer_update_btn}>수정</button>
                    <button id='used_item_div_inner_footer_delete_btn' onClick={used_item_div_inner_footer_delete_btn}>삭제</button>
                </div>
            </div>
        </div>
    )
}
import '../css/favorite_item.css';
import cookie from 'react-cookies';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteItemList from './favorite_item_list';
import $ from 'jquery';

export default function Favorite_item() {
    const favorite_item_array = [];
    const [favorite_item_list, set_favorite_item_list] = useState([]);

    useEffect(() => {
        get_favorite_item();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    const get_favorite_item=async()=> {
        // 로그인한 유저의 아이디
        const user_login_id = cookie.load('id');

        const {
            data
        } = await axios.get(`/get_favorite_item_list/${user_login_id}`);

        for(let i = 0; i < data.length; i++) {
            const result = await axios.get(`/get_detail_item/${data[i].item_id}`);
            favorite_item_array.push(result.data[0]);
        }
        set_favorite_item_list(favorite_item_array);

        if(favorite_item_array.length === 0) {
            $("#favorite_item_div_main").hide();
            $("#favorite_item_div_text").show();
        } else {
            $("#favorite_item_div_text").hide();
            $("#favorite_item_div_main").show();
        }
    }

    const result = favorite_item_list.map(
        (data, index) => (
            <FavoriteItemList
            key={index}
            id={data.id}
            user_id={data.user_id}
            name={data.name}
            price={data.price}
            img={data.img}
            content={data.content}
            favorite={data.favorite}
            view={data.view}
            ></FavoriteItemList>
        )
    )

    return(
        <div id='favorite_item_div'>
            <div id='favorite_item_div_header'>
                <p>관심 물품</p>
            </div>

            <div id='favorite_item_div_main'>
                {result}
            </div>

            <div id='favorite_item_div_text'>
                <p>관심 물품이 없습니다</p>
            </div>
        </div>
    )
}
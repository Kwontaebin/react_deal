import '../css/view_detail_list.css';
import black_star from '../../images/black_star.png';
import yellow_star from '../../images/yellow_star.png';
import axios from 'axios';
import cookie from 'react-cookies';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import RecommendItem from './recommend_item';

export default function View_detail_list(props) {
    const [get_favorite_list, set_get_favorite_list] = useState([]);
    const [recommend_item, set_recommend_item] = useState([]);

    const { id, img, name, price, content, date, favorite, view, user_id, status } = props;

    useEffect(() => {
        favorite_list();
        get_recommend_item_list();

        if(status === 'sale') {
            $("#view_detail_list_header_img img").css('opacity', '0.5')
            $("#view_detail_list_header_img p").show();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const favorite_list=async() => {
        const {
            data
        } = await axios.get('/get_all_favorite_list');
        set_get_favorite_list(data);

        for(let i = 0; i < data.length; i++) {
            const user_id = cookie.load('id');
            if(Number(data[i].user_id) === Number(user_id) && Number(data[i].item_id) === Number(id)) {
                $("#view_detail_list_header_footer #view_detail_list_header_footer_star_img").attr('src', yellow_star);
            } 
            // else {
            //     $("#view_detail_list_header_footer #view_detail_list_header_footer_star_img").attr('src', black_star);
            // }
        }
    }

    const get_recommend_item_list=async()=> {
        const {
            data
        } = await axios.get('/get_recommend_item');
        set_recommend_item(data);
    }

    const click_favorite_img=async()=> {
        console.log(get_favorite_list);
        
        // 현재 로그인되어 있는 사용자의 아이디
        const login_user_id = cookie.load('id');

        for(let i = 0; i < get_favorite_list.length; i++) {
            if(Number(login_user_id) === Number(get_favorite_list[i].user_id) && Number(get_favorite_list[i].item_id) === Number(id)) {
                if(window.confirm("관식목록에서 삭제하시겠습니까?")) {
                    const result = await axios.delete(`/update_favorite_item/${login_user_id}/${id}/${favorite}`);
                    console.log(result);
                    window.location.reload();
                    return;
                } else {
                    alert('취소');
                    return;
                }
            }
        }

        if(window.confirm('관심목록에 추가하시겠습니까?')) {
            if(Number(login_user_id) === Number(user_id)) {
                alert('본인이 등록한 상품은 관심목록에 추가하실수 없습니다.');
                return;
            } else if(status === "sale") {
                alert('이미 판매가 완료된 상품입니다.');
                return;
            }  else {
                const add_favorite_obj = { user_id:login_user_id, item_id:id, favorite:favorite };
                const result = await axios.post('/post_favorite_item', add_favorite_obj);
                console.log(result);
                alert('관심목록 추가');
                window.location.reload();
                return;
            }
        } else {
            alert('취소');
        }
    }

    const go_user_item_page=()=> {
        window.location.href='/used_page';
    }

    const item_buy_btn=async()=> {
        // 현재 로그인한 유저의 아이디
        const login_user_id = cookie.load('id');

        if(status === "sale") {
            alert('이미 판매가 완료된 상품입니다.');
            return;
        } else if(Number(login_user_id) === Number(user_id)) {
            alert('자기 자신의 물건을 살수없습니다.')
            return;
        }

        if(window.confirm('구매하시겠습니까?')) {
            const buy_item_obj = { buy_user_id:login_user_id, sell_user_id:user_id, item_id:id };
            const result = await axios.post('/buy_item', buy_item_obj);
            console.log(result);
            alert('구매 완료');
            return;
        } else {
            alert('취소');
            return;
        }
    }

    const recommend_item_result = recommend_item.map(
        (data, index) => (
            <RecommendItem
            key={index}
            id={data.id}
            img={data.img}
            price={data.price}
            content={data.content}
            favorite={data.favorite}
            view={data.view}
            ></RecommendItem>
        )
    )

    return(
        <div id='view_detail_list'>

            {/* 상품 이미지 */}
            <div id='view_detail_list_header'>

                {/* 이미지 */}
                <div id='view_detail_list_header_img'>
                    <img alt='' src={`${img}`}></img>
                    
                    <p>판매완료</p>
                </div>

                {/* 상품 이미지(별) */}
                <div id='view_detail_list_header_footer'>
                    <p id='view_detail_list_header_footer_name'>{name}</p>
                    <p id='view_detail_list_header_footer_date'>{date}</p>

                    <img id='view_detail_list_header_footer_star_img' alt='' src={`${black_star}`} onClick={click_favorite_img}></img>
                </div>
            </div>

            {/* 제품 설명 */}
            <div id='view_detail_list_main'>
                {/* 글 */}
                <div id='view_detail_list_main_content'>
                    <p>{content}</p>
                </div>

                {/* 이름, 날짜 */}
                <div id='view_detail_list_main_name_date'>
                    <p>{name}</p>
                    <p>{date}</p>
                </div>

                {/* 가격 */}
                <div id='view_detail_list_main_price'>
                    <p>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>

                {/* 구매버튼, 관심홧수, 조회수 */}
                <div id='view_detail_list_main_buy_btn'>
                    <p>관심 {favorite} </p>
                    <p>조회 {view} </p>

                    <button onClick={item_buy_btn}>구매하기</button>
                </div>
            </div>

            {/* 추천상품 */}
            <div id='view_detail_list_footer'>
                <div id='view_detail_list_footer_header'>
                    <p id='view_detail_list_footer_header_text'>중고나라 인기 물품</p>

                    {/* 자세히보기 클릭하면 중고물품 페이지로~ */}
                    <p id='go_used_item' onClick={go_user_item_page}>더 구경하기</p>
                </div>

                <div id='view_detail_list_footer_main'>
                    {recommend_item_result}
                </div>
            </div>
        </div>
    )
}
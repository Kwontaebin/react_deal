import '../css/my_page.css';
import '../css/pagenation.css'
import $ from 'jquery';
import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import PostItem from './post_item';
import UsedItem from '../my_item/js/used_item';
import FreeItem from '../my_item/js/free_item';
import Pagination from "react-js-pagination";
import FavoriteItem from '../my_favorite_item/js/favorite_item';
import Bid from '../my_bid/js/bid';

export default function My_page() {
    const name = cookie.load('name');
    const [my_used_list, set_my_used_list] = useState([]);
    const [my_free_list, set_my_free_list] = useState([]);
    const [my_page_status, set_my_page_status] = useState('used');
    const [page, setPage] = useState(1);

    useEffect(() => {
        $("#my_page_header div").click(function() {
            let idx = $("#my_page_header div").index(this);
            
            $("#my_page_header div").removeClass('where_div');
            $("#my_page_header div").eq(idx).addClass('where_div');
        })

        $("#my_page_my_item_header p").click(function() {
            let idx = $("#my_page_my_item_header p").index(this);

            $("#my_page_my_item_header p").removeClass('p_where');
            $("#my_page_my_item_header p").eq(idx).addClass('p_where');
        })

        get_used_item();
        get_free_item();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const my_item=()=> {
        $("#my_page_favorite_item").hide();
        $("#my_page_bid").hide();
        $("#my_page_post_item").hide();

        $("#my_page_my_item").show();
    }

    const favorite_item=()=> {
        $("#my_page_my_item").hide();
        $("#my_page_bid").hide();
        $("#my_page_post_item").hide();

        $("#my_page_favorite_item").show();
    }

    const comment_list=()=> {
        $("#my_page_my_item").hide();
        $("#my_page_favorite_item").hide();
        $("#my_page_post_item").hide();

        $("#my_page_bid").show();
    }

    const post_item=()=> {
        $("#my_page_my_item").hide();
        $("#my_page_favorite_item").hide();
        $("#my_page_bid").hide();

        $("#my_page_post_item").show();
    }

    const my_page_my_item_used=()=> {
        $("#my_page_my_item_free").hide();
        $("#my_page_my_item_used").show();
        set_my_page_status('used');
    }

    const my_page_my_item_free=()=> {
        $("#my_page_my_item_used").hide();
        $("#my_page_my_item_free").show();
        set_my_page_status('free');
    }

    const get_used_item=async()=> {
        const id = cookie.load('id');

        const {
            data
        } = await axios.get(`/get_my_used_item/${id}`);
        set_my_used_list(data);
    }

    const get_free_item=async()=> {
        const id = cookie.load('id');

        const {
            data
        } = await axios.get(`/get_my_free_item/${id}`);
        set_my_free_list(data)
    }

    const used_list_result = my_used_list.map(
        (data, index) => (
            <UsedItem
            key={index}
            id={data.id}
            name={data.name}
            price={data.price}
            content={data.content}
            img={data.img}
            view={data.view}
            date={data.date}
            data={data}
            ></UsedItem>
        )
    )

    const free_list_result = my_free_list.map(
        (data, index) => (
            <FreeItem
            key={index}
            id={data.id}
            name={data.name}
            price={data.price}
            content={data.content}
            img={data.img}
            view={data.view}
            date={data.date}
            data={data}
            ></FreeItem>
        )
    )

    const handlePageChange =async(page) => {
        setPage(page); // 해당 페이지
        const id = cookie.load('id');

        if(my_page_status === 'used') {
            const {
                data
            } = await axios.get(`/get_my_user_item_pagenation/${id}/${page}`);
            console.log(data);

            if(data.length === 0) {
                alert('더 이상 물품이 없습니다.');
                setPage(page-1);
            } else {
                set_my_used_list(data);
            }
        } else if(my_page_status === 'free') {
            const {
                data
            } = await axios.get(`/get_my_free_item_pagenation/${id}/${page}`);

            if(data.length === 0) {
                alert('더 이상 물품이 없습니다.');
                setPage(page-1);
            } else {
                set_my_free_list(data);
            }
        }
    };

    return(
        <div id='my_page'>
            <div id='my_page_header'>
                <div className='where_div' onClick={my_item}>
                    <p>{name} 등록템</p>
                </div>

                <div onClick={favorite_item}>
                    <p>관심템</p>
                </div>

                <div onClick={comment_list}>
                    <p>낙찰목록</p>
                </div>

                <div onClick={post_item}>
                    <p>물건 등록하기</p>
                </div>
            </div>

            <div id='my_page_my_item'>
                <div id='my_page_my_item_header'>
                    <p className='p_where' onClick={my_page_my_item_used}>중고 물품</p>
                    <p onClick={my_page_my_item_free}>무료 나눔</p>
                </div>

                {/* 중고 물품 */}
                <div id='my_page_my_item_used'>
                    {used_list_result}
                </div>

                {/* 무료 나눔 */}
                <div id='my_page_my_item_free'>
                    {free_list_result}
                </div>

                {/* 페이지네이션 */}
                <div id='my_page_my_item_footer'>
                <Pagination
                    activePage={page} // 현재 페이지
                    itemsCountPerPage={8} // 한 페이지랑 보여줄 아이템 갯수
                    totalItemsCount={100} // 총 아이템 갯수
                    pageRangeDisplayed={5} // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
                />
                </div>
            </div>

            <div id='my_page_favorite_item'>
                <FavoriteItem></FavoriteItem>
            </div>

            <div id='my_page_bid'>
                <Bid></Bid>
            </div>

            <div id='my_page_post_item'>
                <PostItem></PostItem>
            </div>
        </div>
    )
}
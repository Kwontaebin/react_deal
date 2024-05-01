import '../css/free_page.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import FreeItemList from './free_item_list';

export default function Free_page() {
    const [free_item_list, set_free_item_list] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        get_free_item_list();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handlePageChange=(page)=> {
        setPage(page);
    }

    const get_free_item_list=async()=> {
        const {
            data
        } = await axios.get(`/get_free_page_item/${page}`);

        if(data.length === 0) {
            setPage(page - 1)
            alert('등록된 상품이 없습니다.');
            return;
        } else {
            set_free_item_list(data);
        }
    }

    const free_item_list_result = free_item_list.map(
        (data, index) => (
            <FreeItemList
            key={index}
            id={data.id}
            img={data.img}
            content={data.content}
            price={data.price}
            favorite={data.favorite}
            view={data.view}
            status={data.status}
            ></FreeItemList>
        )
    )

    return(
        <div id='free_page_div'>
            <div id='free_page_div_header'>
                <p>중고나라 인기무료 물품</p>
            </div>

            <div id='free_page_div_main'>
                {free_item_list_result}
            </div>

            <div id='free_page_div_footer'>
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
    )
}
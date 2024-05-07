import '../css/post_item.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BasicPreviewImg from '../../images/basic_preview_img.png';
import cookie from 'react-cookies';

export default function Post_item() {
    const [selectedFile, Set_selectedFile] = useState(null);
    const [item_type, set_item_type] = useState('used');
    const [item_content, set_item_content] = useState(null);
    const [item_price, set_item_price] = useState('0');
    let item_img;
    let [mainImg,setMainImg] = useState(BasicPreviewImg);

    useEffect(() => {
        if(item_type === 'used') {
            const target = document.getElementById('post_item_price_input');
            target.disabled = false;
        } else if(item_type === 'free') {
            const target = document.getElementById('post_item_price_input');
            target.disabled = true;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item_type]);

    const file_input=(e)=> {
        Set_selectedFile(e.target.files[0]);

        var reader = new FileReader();

        reader.onload = function(e) {
            setMainImg(e.target.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const get_item_type=(e)=> {
        set_item_type(e.target.value)
    }

    const get_item_content=(e)=> {
        set_item_content(e.target.value);
    }

    const get_item_price=(e)=> {
        set_item_price(e.target.value);
    }

    const post_item_btn=async()=> {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const id = cookie.load('id');
        const name = cookie.load('name');

        if(selectedFile == null) {
            alert('이미지를 넣어주세요');
            return;
        } else {
            const {
                data
            } = await axios.post('/api/upload', formData);
            console.log(data.file);
            item_img = `/upload/${data.file}`
        }

        if(id === undefined) {
            alert('다시 로그인 해주세요!');
        } else if(item_content === null) {
            alert('물건을 설명해주세요');
            return;
        } else if(item_type === "used" && item_price === "0") {
            alert('가격을 입력하세요')
        } else {
            const post_item_obj = { user_id:id, name:name, type:item_type, price:item_price, content:item_content, img:item_img };
            const result = await axios.post('/post_item', post_item_obj);
            console.log(result);

            alert('물건 등록이 완료되었습니다.');
            window.location.href=`/my_page?id=${id}&ie=utf-8`;
        }
    }

    return (
        <div id='post_item_div'>
            <div id='post_item_div_header'>
                <img alt='' src={mainImg} id='img_preview'></img>
                <label id='input_file_button' htmlFor="input-file">업로드</label>
                <input type="file" id="input-file" style={{display:"none"}} onChange={file_input}/>
            </div>

            <div id='post_item_div_center'>
                <input placeholder='물건을 설명해주세요!' onChange={get_item_content}></input>
            </div>

            <div id='post_item_div_footer'>
                <select onChange={get_item_type}>
                    {/* type */}
                    <option value="used">중고거래</option>
                    <option value="free">무료나눔</option>
                </select>

                <input id='post_item_price_input' placeholder='가격을 입력하세요' onChange={get_item_price}></input>

                <button onClick={post_item_btn}>등록하기</button>
            </div>
        </div>
    )
}

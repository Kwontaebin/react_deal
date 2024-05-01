import '../css/update_item_information.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Update_item_information(props) {
    const { id, img, content, type, price } = props;
    const [item_content, set_item_content] = useState(content);
    const [item_type, set_item_type] = useState(type);
    const [item_price, set_item_price] = useState(price);
    const [selectedFile, Set_selectedFile] = useState(img);
    let update_item_img;
    let [mainImg,setMainImg] = useState(img);

    useEffect(() => {
        if(item_type === 'used') {
            const target = document.getElementById('update_item_information_div_type_input');
            target.disabled = false;
            set_item_price(price);
            target.value=`${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`
        } else if(item_type === 'free') {
            const target = document.getElementById('update_item_information_div_type_input');
            target.disabled = true;
            set_item_price('0');
            target.value=''
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
        set_item_type(e.target.value);
    }

    const get_item_content=(e)=> {
        set_item_content(e.target.value);
    }

    const get_item_price=(e)=> {
        set_item_price(e.target.value);
    }

    const update_btn=async()=> {
        const formData = new FormData();
        formData.append('file', selectedFile);

        if(selectedFile === img) {
            update_item_img = img
        } else {
            const {
                data
            } = await axios.post('/api/upload', formData);
            console.log(data.file);
            update_item_img = `/upload/${data.file}`
        }

        if(window.confirm('수정하시겠습니까?')) {
            const update_obj = { id:id, img:update_item_img, content:item_content, type:item_type, price:item_price };
            const result = await axios.put('/update_item', update_obj);
            console.log(result);
            alert('수정완료')
            window.location.reload();
        } else {
            alert("취소");
        }
        
    }

    return(
        <div id='update_item_information_div'>
            <div id='update_item_information_div_header'>
                <div id='update_item_information_div_header_inner'>
                    <img alt='' src={mainImg} id='img_preview'></img>
                    <label id='update_input_file_button' htmlFor="input-file">업로드</label>
                    <input type="file" id="input-file" style={{display:"none"}} onChange={file_input}/>
                </div>
            </div>

            <div id='update_item_information_div_content'>
                <input defaultValue={content} onChange={get_item_content}></input>
            </div>

            <div id='update_item_information_div_type'>
                <select onChange={get_item_type}>
                    <option value='used'>중고거래</option>
                    <option value='free'>무료나눔</option>
                </select>

                <input id='update_item_information_div_type_input' onChange={get_item_price} defaultValue={price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}></input>
            </div>

            <div id='update_item_information_div_footer'>
                <button onClick={update_btn}>수정</button>
            </div>
        </div>
    )
}
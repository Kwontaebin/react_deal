import '../css/sign.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function Sign() {
    const [id_value, set_id_value] = useState();
    const [pw_value, set_pw_value] = useState();
    const [pw_check_value, set_pw_check_value] = useState();
    const [name_value, set_name_value] = useState();
    const [user_information, set_user_information] = useState([]);

    useEffect(() => {
        get_user_information();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_user_information=async()=> {
        const {
            data
        } = await axios.get('/get_all_user_information');
        set_user_information(data);
    }

    const get_input_id_value=(e)=> {
        set_id_value(e.target.value)
    }

    const get_input_pw_value=(e)=> {
        set_pw_value(e.target.value)
    }

    const get_input_pw_check_value=(e)=> {
        set_pw_check_value(e.target.value)
    }

    const get_input_name_value=(e)=> {
        set_name_value(e.target.value)
    }

    const sign_btn=async()=> {
        const hash_pw = CryptoJS.AES.encrypt(pw_value, "5546").toString();

        if(user_information.length === 0) {
            const sign_obj = { user_id:id_value, user_password:hash_pw, name:name_value };
            const result = await axios.post('/sign', sign_obj);
            console.log(result);
        }
        console.log(id_value)

        for(let i = 0; i < user_information.length; i++) {
            if(id_value === undefined || pw_value === undefined || pw_check_value === undefined || name_value === undefined) {
                alert('모두다 작성해주세요');
                return;
            } else if(user_information[i].user_id === id_value) {
                alert('일치하는 아이디가 있습니다.')
                return;
            } else if(pw_value !== pw_check_value) {
                alert('비밀번호가 일치하지 않습니다.')
                return;
            } else if(user_information[i].name === name_value) {
                alert('일치하는 닉네임이 있습니다.')
                return;
            }  else {
                const sign_obj = { user_id:id_value, user_password:hash_pw, name:name_value };
                const result = await axios.post('/sign', sign_obj);
                console.log(result);
                alert('회원가입 성공');
                window.location.href='/login';
            }
        }
    }

    return(
        <div id='sign'>
            <div id='sign_inner'>
                <div id='sign_inner_header'>
                    <p id='sign_inner_header_text'>회원가입</p>
                </div>

                <div id='sign_inner_center'>
                    <div id='sign_inner_center_id'>
                        <p>아이디</p>
                        <input placeholder='아이디' onChange={get_input_id_value}></input>
                    </div>

                    <div id='sign_inner_center_pw'>
                        <p>비밀번호</p>
                        <input type='password' placeholder='비밀번호' onChange={get_input_pw_value}></input>
                    </div>

                    <div id='sign_inner_center_pw_check'>
                        <p>비밀번호 확인</p>
                        <input type='password' placeholder='비밀번호 확인' onChange={get_input_pw_check_value}></input>
                    </div>

                    <div id='sign_inner_center_name'>
                        <p>이름</p>
                        <input placeholder='이름' onChange={get_input_name_value}></input>
                    </div>

                    <button onClick={sign_btn} id='sign_btn'>회원가입</button>
                </div>
            </div>
        </div>
    )
}
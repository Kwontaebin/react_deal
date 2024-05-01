import '../css/login.css';
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import cookie from 'react-cookies';
import axios from 'axios';

export default function Login() {
    const [id_value, set_id_value] = useState();
    const [pw_value, set_pw_value] = useState();
    const [user_information, set_user_information] = useState([]);
    const [login_status, set_login_status] = useState();

    useEffect(() => {
        get_user_information();
        login();

        async function login() {
            if(login_status === "null") {
                alert('모두 다 작성해주세요');
            } else if(login_status === "id_err") {
                alert('아이디가 일치하지 않습니다.')
            } else if(login_status === 'password_err') {
                alert('비밀번호가 일치하지 않습니다.')
            } else if(login_status === 'success') {
                const {
                    data
                } = await axios.get(`/login/${id_value}`);
                console.log(data);

                const expires = new Date()
                expires.setMinutes(expires.getMinutes() + 120)

                cookie.save('id', data[0].id, {
                    path : '/',
                    expires,
                });

                cookie.save('name', data[0].name, {
                    path : '/',
                    expires,
                });

                alert('로그인 성공')

                window.location.href='/';
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login_status]);

    const get_user_information=async()=> {
        const {
            data
        } = await axios.get('/get_all_user_information');
        set_user_information(data);
    }

    const go_sign=()=> {
        window.location.href='/sign';
    }

    const get_input_id_value=(e)=> {
        set_id_value(e.target.value)
    }

    const get_input_pw_value=(e)=> {
        set_pw_value(e.target.value);

    }

    const login_btn=async()=> {
        for(let i = 0; i < user_information.length; i++) {
            const bytes  = CryptoJS.AES.decrypt(user_information[i].user_password, "5546")
            const decoding_pw = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            
            if(id_value === undefined || pw_value === undefined) {
                set_login_status('null');
                return;
            };

            if(String(user_information[i].user_id) === id_value) {
                if(String(decoding_pw) === pw_value) {
                    set_login_status('success');
                    return;
                } else {
                    set_login_status('password_err');
                    return;
                }
            } else {
                set_login_status('id_err');
            }
        }
    }

    const login_enter=(e)=> {
        if(e.key === 'Enter') {
            login_btn();
        }
    }

    return(
        <div id='login'>
            <div id='login_inner'>
                <div id='login_inner_header'>
                    <p>로그인</p>
                </div>

                <div id='login_inner_main'>
                    <input placeholder='아이디' onChange={get_input_id_value}></input>
                    <input type='password' placeholder='비밀번호' onChange={get_input_pw_value} onKeyDown={login_enter}></input>
                    <button onClick={login_btn}>로그인</button>
                </div>

                <div id='login_inner_footer'>
                    <p>아직 회원가입을 하시지않으셨나요?</p>
                    <button onClick={go_sign}>회원가입</button>
                </div>
            </div>
        </div>
    )
}
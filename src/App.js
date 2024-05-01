import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './main/js/main';
import Header from './header/js/header';
import Sign from './login_sign/js/sign';
import Login from './login_sign/js/login';
import MyPage from './my_page/js/my_page';
import ViewDetail from './view_detail/js/view_detail';
import UsedPage from './used_page/js/used_page';
import UpdateItem from './my_page/my_item/js/update_item';
import FreePage from './free_page/js/free_page';
import Search from './search/js/search';
import MarkeyPrice from './market_price/js/market_price';

export default function App() {
  return(
    <div id='app'>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/sign' element={<Sign/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/my_page' element={<MyPage/>}></Route>
            <Route path='/view_detail' element={<ViewDetail/>}></Route>
            <Route path='/used_page' element={<UsedPage/>}></Route>
            <Route path='/free_page' element={<FreePage/>}></Route>
            <Route path='/update_page' element={<UpdateItem/>}></Route>
            <Route path='/search' element={<Search/>}></Route>
            <Route path='/market_price' element={<MarkeyPrice/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}
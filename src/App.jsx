import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './fragments/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import SocialLogin from './components/SocialLogin';
import Setting from './components/Setting';
import ApiKeyUpdateForm from './components/member/ApiKeyUpdateForm';
import FriendWrap from './components/friends/FriendsWrap';
import BoardListContainer from './containers/boards/BoardListContainer';
import BoardReadContainer from './containers/boards/BoardReadContainer';
import BoardInsertContainer from './containers/boards/BoardInsertContainer';
import BoardUpdateContainer from './containers/boards/BoardUpdateContainer';
import CommentListContainer from './containers/comments/CommentListContainer';
import CircularLoading from './fragments/CircularLoading';
import TodoContainer from './containers/todo/TodoContainer';
import Notification from './fragments/Notification';
import HomeContainer from "./containers/home/HomeContainer";
import SignUp from "./components/auth/SignUp";
import SignUpCharacters from "./components/auth/SignUpCharacters";

const App = () => {
  //Notification 관련
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Darkmode 관련
  const [isDarkMode, setIsDarkMode] = useState(false);

  //로그인 여부 관련
  const [loginName, setLoginName] = useState("");

  useEffect(() => {
    setLoginName(window.localStorage.getItem("username"));
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const showMessage = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div>
        {isLoading && <CircularLoading />}
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}
                setIsLoading={setIsLoading} showMessage={showMessage} />
        <Notification
          message={snackbarMessage}
          open={openSnackbar}
          handleClose={handleSnackbarClose}
        />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<HomeContainer setIsLoading={setIsLoading} showMessage={showMessage} />} />
            <Route path="login" element={<Login isDarkMode={isDarkMode} showMessage={showMessage} setLoginName={setLoginName} loginName={loginName} />} />
            <Route path='signup' element={<SignUp setIsLoading={setIsLoading}/>} />
            <Route path='signup/character' element={<SignUpCharacters />} />
            <Route path='sociallogin' element={<SocialLogin />} />
            {loginName ?
                <Route path="todo" element={<TodoContainer setIsLoading={setIsLoading} showMessage={showMessage}/>} /> :
                <Route path="todo" element={<Login message="로그인 후 LoaTodo 숙제관리 기능을 이용해보세요!!"
                                                    isDarkMode={isDarkMode} showMessage={showMessage}
                                                   setLoginName={setLoginName} loginName={loginName} />} />
            }

            <Route path='comments' element={<CommentListContainer setIsLoading={setIsLoading} />} />
            <Route path='setting' element={<Setting />} />
            <Route path='member/apikey' element={<ApiKeyUpdateForm />} />
            <Route path='friends' element={<FriendWrap setIsLoading={setIsLoading}/>} />

            {/* 게시글(공지사항) 관련 */}
            <Route path='/boards' element={<BoardListContainer />} />
            <Route path='/boards/:no' element={<BoardReadContainer />} />
            <Route path='/boards/insert' element={<BoardInsertContainer />} />
            <Route path='/boards/update/:no' element={<BoardUpdateContainer />} />
          </Routes>
        </BrowserRouter>
        {/* 구글 애드센스 */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9665234618246720"
                crossOrigin="anonymous"></script>
        <ins className="adsbygoogle"
             style={{display:"block"}}
             data-ad-client="ca-pub-9665234618246720"
             data-ad-slot="1480898783"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script> */}
        <footer>
          <p>© 2023 LoaTodo. LoaTodo isn’t endorsed by Smilegate RPG and doesn’t reflect the views <br />
            or opinions of Smilegate RPG or anyone officially involved in producing or managing Lostark.
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;

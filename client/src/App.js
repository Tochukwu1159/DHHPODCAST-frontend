import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import Signup from '../src/components/Signup.jsx';
import Signin from '../src/components/Signin.jsx';
import Navbar from '../src/components/Navbar.jsx';
import Menu from '../src/components/Menu.jsx';
import Dashboard from '../src/pages/Dashboard.jsx'
import ToastMessage from './components/ToastMessage.jsx';
import Search from '../src/pages/Search.jsx';
import Favourites from '../src/pages/Favourites.jsx';
import Profile from '../src/pages/Profile.jsx';
import DisplayPodcasts from '../src/pages/DisplayPodcasts.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import AudioPlayer from "./components/AudioPlayer.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";
import PodcastDetails from "./pages/PodcastDetails.jsx";
import { closeSignin } from "./redux/setSigninSlice.jsx";
import AddPodcastCategory from "./mockPage/AddPodcastCategory.js";
import AddPodcastForm from "./mockPage/AddPodcastForm.js";
import PlanForm from "./mockPage/PlanForm.jsx";
import AddEpisodeForm from "./mockPage/AddEpisode.jsx";
// import PodcastList from "./mockPage/PodcastList.jsx";
import PodcastCategoryList from "./mockPage/PodcastCategoryList.jsx";
import SinglePodcastCategory from "./mockPage/SinglePodcastCategory.jsx";
import { AllUsers } from "./admin/AllUsers.js";
import { AllPodcasts } from "./admin/AllPodcasts.js";
import { AllPodcastCategory } from "./admin/AllPodcastCategory.js";
import { AllComments } from "./admin/AllComments.js";
import { AllEpisodes } from "./admin/AllEpisodes.js";
import { AllPodcastViews } from "./admin/AllPodcastViews.js";
import { AllSubscriptionPlan } from "./admin/AllSubscriptions.js";
import { AllSubGroup } from "./admin/AllSubGroup.js";
import StatsPage from "./admin/StatsPage.js";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const Podstream = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
`;

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const {openplayer,type, episode, podid, currenttime,index} = useSelector((state) => state.audioplayer);
  const {opensi} =  useSelector((state) => state.signin);
  const [SignUpOpen, setSignUpOpen] = useState(false);
  const [SignInOpen, setSignInOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);


  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch()
    //set the menuOpen state to false if the screen size is less than 768px
    useEffect(() => {
      const resize = () => {
        if (window.innerWidth < 1110) {
          setMenuOpen(false);
        } else {
          setMenuOpen(true);
        }
      }
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }, []);

    useEffect(()=>{
      dispatch(
        closeSignin()
      )
    },[])

  return (

    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

      <BrowserRouter>
        {opensi && <Signin setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />}
        {SignUpOpen && <Signup setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />}
        {/* {uploadOpen && <Upload setUploadOpen={setUploadOpen} />} */}
        {openplayer && type === 'video' && <VideoPlayer episode={episode} podid={podid} currenttime={currenttime} index={index}/>}
        {openplayer && type === 'audio'  && <AudioPlayer episode={episode} podid={podid} currenttime={currenttime} index={index}/>}
        <Podstream>
          {menuOpen && <Menu setMenuOpen={setMenuOpen} darkMode={darkMode} setDarkMode={setDarkMode} setUploadOpen={setUploadOpen} setSignInOpen={setSignInOpen}/>}
          <Frame>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} setSignInOpen={setSignInOpen} setSignUpOpen={setSignUpOpen} />
            <Routes>
              <Route path='/' exact element={<Dashboard setSignInOpen={setSignInOpen}/>} />
              <Route path='/search' exact element={<Search />} />
              <Route path='/favourites' exact element={<Favourites />} />
              <Route path='/profile' exact element={<Profile />} />
              <Route path='/podcast/:id' exact element={<PodcastDetails />} />
              <Route path='/showpodcasts/:type' exact element={<DisplayPodcasts/>} />
              <Route path='/podcast-category' exact element={<AddPodcastCategory/>} />
              <Route path='/podcast' exact element={<AddPodcastForm/>} />
              <Route path='/plan' exact element={<PlanForm/>} />
              <Route path='/episode' exact element={<AddEpisodeForm/>} />
              {/* <Route path='/category-update/:categoryId' exact element={<UpdatePodcastCategory/>} /> */}
              <Route path='/all-categories' exact element={<PodcastCategoryList/>} />
              <Route path='/all-categories/:categoryId' exact element={<SinglePodcastCategory/>} />
              admin area
              <Route path="/admin/allpodcasts" exact element={<AllPodcasts/>}></Route>
              <Route path="/admin/allcategory" exact element={<AllPodcastCategory/>}></Route>
              <Route path="/admin/allcomments" exact element={<AllComments/>}></Route>
              <Route path="/admin/allepisodes" exact element={<AllEpisodes/>}></Route>
              <Route path="/admin/views" exact element={<AllPodcastViews/>}></Route>
              <Route path="/admin/subgroup" exact element={<AllSubGroup/>}></Route> 
              <Route path="/admin/allsubcription" exact element={<AllSubscriptionPlan/>}></Route>
              <Route path="/admin/stat" exact element={<StatsPage/>}></Route> 
              <Route path="/admin/users" exact element={<AllUsers/>}></Route> 


            </Routes>
          </Frame>

          {open && <ToastMessage open={open} message={message} severity={severity} />}
        </Podstream>

      </BrowserRouter>

    </ThemeProvider>

  );
}

export default App;

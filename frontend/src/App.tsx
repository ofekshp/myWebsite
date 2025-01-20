import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.tsx'
import WeatherPage from './components/WeatherPage/WeatherPage.tsx'
import DrComputerPage from './components/DrComputer/Start/StartPage.tsx'
import DrComputerHomePage from './components/DrComputer/Home/HomePage.tsx'
import DrComputerFeedPage from './components/DrComputer/Feed/FeedPage.tsx'
import DrComputerLoginForm from './components/DrComputer/Login/LoginForm.tsx'
import DrComputerRegisterForm from './components/DrComputer/Register/RegisterPage.tsx'
import DrComputerUploadPostForm from './components/DrComputer/UploadPost/PostPage.tsx'
import DrComputerProfilePage from './components/DrComputer/Profile/ProfilePage.tsx'
import DrComputerArticlePage from './components/DrComputer/Article/ArticlePage.tsx'
import DrComputerCommentsPage from './components/DrComputer/Comments/CommentsPage.tsx'
import DrComputerEditPostPage from './components/DrComputer/EditPost/EditPostPage.tsx'
import DrComputerMyPostsPage from './components/DrComputer/MyPosts/MyPostsPage.tsx'
import DrComputerEditProfilePage from './components/DrComputer/EditProfile/EditProfilePage.tsx'

function AppContent() {
  return (
    <div className='app'>
    <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weatherApp" element={<WeatherPage />} />
          <Route path="/drComputerApp" element={<DrComputerPage />} />
          <Route path="/drComputerApp/Home" element={<DrComputerHomePage />} />
          <Route path="/drComputerApp/Feed" element={<DrComputerFeedPage />} />
          <Route path="/drComputerApp/Login" element={<DrComputerLoginForm />} />
          <Route path="/drComputerApp/Register" element={<DrComputerRegisterForm />} />
          <Route path="/drComputerApp/Post" element={<DrComputerUploadPostForm />} />
          <Route path="/drComputerApp/Profile" element={<DrComputerProfilePage />} />
          <Route path="/drComputerApp/Article" element={<DrComputerArticlePage />} />
          <Route path="/drComputerApp/Post/Comments" element={<DrComputerCommentsPage />} />
          <Route path="/drComputerApp/Post/Edit" element={<DrComputerEditPostPage />} />
          <Route path="/drComputerApp/Profile/MyPosts" element={<DrComputerMyPostsPage />} />
          <Route path="/drComputerApp/Profile/EditProfile" element={<DrComputerEditProfilePage />} />
    </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App

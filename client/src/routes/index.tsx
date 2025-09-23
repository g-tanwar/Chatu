import { Routes, Route } from 'react-router-dom';
import AddFriend from '../pages/AddFriend';
import Channel from '../pages/Channel';
import Chat from '../pages/Chat';
import Create from '../pages/Create';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Register from '../pages/Register';
import Edit from '../pages/Edit';
import ProtectedRoute from './ProtectedRoute';
import LandingLayout from '../components/layout/Landing';
import LandingHome from '../pages/Landing/Home';
import Features from '../pages/Landing/Features';
import Pricing from '../pages/Landing/Pricing';
import About from '../pages/Landing/About';
import Contact from '../pages/Landing/Contact';

const Index = () => {
    return (
        <Routes>
            {/* Public landing routes */}
            <Route element={<LandingLayout />}>
                <Route path='/' element={<LandingHome />} />
                <Route path='/landing' element={<LandingHome />} />
                <Route path='/features' element={<Features />} />
                <Route path='/pricing' element={<Pricing />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
            </Route>

            {/* App routes (protected) */}
            <Route path='/' element={<ProtectedRoute/>}>
                <Route path='/home' element={<Home />} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/profile/edit' element={<ProfileEdit/>} />
                <Route path='/create' element={<Create />} />
                <Route path='/addfriend' element={<AddFriend />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/channel' element={<Channel />} />
                <Route path='/edit' element={<Edit />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default Index;
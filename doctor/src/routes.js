import Login from './components/Login'
import Profile from './components/Profile'
import Presc from './components/Presc'
import Patient from './components/Patient'
import Diary from './components/PersonalDiary'
import past from './components/PastPresc'

export const routes = [
    { path: '', component: Login },
    { path: '/profile', component: Profile, children: [
        { path: '/profile/patient', component: Patient },
        { path: '/profile/presc', component: Presc },
        { path:'/profile/diary', component: Diary },
        { path: '/profile/past', component: past }
    ] }
];
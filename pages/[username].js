import fetchUserProfile from '../shared/fetchUserProfile'
import UserProfile from '../components/userProfile'

export async function getServerSideProps({query}){
    return await fetchUserProfile({username: query.username})
}

export default function ProfileByUserId(props) {
    return <UserProfile {...props}/>;
}
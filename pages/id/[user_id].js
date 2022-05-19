import fetchUserProfile from '../../shared/fetchUserProfile'
import UserProfile from '../../components/userProfile'

export async function getServerSideProps({query}){
    return await fetchUserProfile({user_id: query.user_id})
}

export default function ProfileByUserId(props) {
    return <UserProfile {...props}/>;
}
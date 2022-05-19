import { authMethodUserProfileGetInfo, authApiErrorCode } from '@kirillzhosul/florgon-auth-api'
import UserProfile from '../../components/userProfile'

export async function getServerSideProps({query}){
    let userProfile = null;
    try{
        userProfile = await authMethodUserProfileGetInfo(query.user_id, undefined);
    }catch(error){
        if (error && "error" in error){
            if (error["error"]["code"] === authApiErrorCode.USER_DEACTIVATED){
                return {
                    props: {
                        error: authApiErrorCode.USER_DEACTIVATED
                    }
                }
            }
        }
        return {
            notFound: true
        }
    }
    return {
        props: {
            user: userProfile["success"]["user"]
        }
    }
}

export default function ProfileByUserId(props) {
    return <UserProfile {...props}/>;
}
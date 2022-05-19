import {authMethodUserProfileGetInfo, authApiErrorCode} from '@kirillzhosul/florgon-auth-api'

export default async function fetchUserProfile({user_id, username}){
    let userProfile = null;

    try{
        userProfile = await authMethodUserProfileGetInfo(user_id, username);
    }catch(error){
        if (error && "error" in error){
            const errorCode = error["error"]["code"];

            if (errorCode === authApiErrorCode.USER_NOT_FOUND){
                return {
                    notFound: true
                }
            }
            
            if (errorCode === authApiErrorCode.USER_DEACTIVATED || 
                errorCode === authApiErrorCode.USER_PROFILE_PRIVATE ||
                errorCode === authApiErrorCode.USER_PROFILE_AUTH_REQUIRED){
                return {
                    props: {
                        error: error["error"]["code"]
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
import Head from 'next/head'
import Link from 'next/link'
import { authMethodUserProfileGetInfo, authApiErrorCode } from '@kirillzhosul/florgon-auth-api'

export async function getServerSideProps({query}){
    let userProfile = null;
    try{
        userProfile = await authMethodUserProfileGetInfo(undefined, query.username);
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
export default function ProfileByUserId({ user, error }) {
    if (error === authApiErrorCode.USER_DEACTIVATED){
        return (<>
            <Head>
                <meta name="title" content="Deactivated account" />
                <title>Deactivated account</title>
            </Head>
            <div className="display-1 text-danger"><b>User deactivated</b></div>
            <div className="row mt-5 mb-5">
                <div className="col-lg ml-lg-5 text-center">
                    <h2></h2>
                    <h2><b>Oops...</b></h2>
                    <p>Sorry, but this user has been banned!</p>
                    <Link href="https://florgon.space"><a className="btn btn-lg btn-primary mt-3 shadow">Go back to Florgon</a></Link>
                </div>
            </div>
        </>)
    }
    const createdAt = new Date(user.time_created * 1000);
    const existsForDays = Math.floor((Date.now() - createdAt) / (1000 * 3600 * 24));
    return (<>
        <Head>
            <meta name="title" content={`${user.username} profile`} />
            <title>{user.username} profile</title>
        </Head>
        <div className="display-1 text-primary"><b>{user.username}</b></div>
        <div className="row mt-5 mb-5">
            <div className="col-lg ml-lg-5 text-center">
                {(user.first_name || user.last_name) && <h2>Also known as {user.first_name}{user.last_name}</h2>}
                
                <h2><b>Florgon</b> member, since <i>{createdAt.toDateString()}</i> (<b>{existsForDays}</b> days)</h2>
            </div>
        </div>
    </>)
}
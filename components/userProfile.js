import Head from 'next/head'
import Link from 'next/link'
import { authApiErrorCode } from '@kirillzhosul/florgon-auth-api'

function _UserProfile({user}){

    const createdAt = new Date(user.time_created * 1000);
    const existsForDays = Math.floor((Date.now() - createdAt) / (1000 * 3600 * 24));
    const pageTitle = `${user.username} profile`;
    return (<>
        <Head>
            <meta name="description" content={pageTitle} />
            <meta name="title" content={pageTitle} />
            <title>{pageTitle}</title>
        </Head>
        <div>
            <div className="display-1">
                <b className="text-primary">{user.username}</b>&nbsp;
                {(user.first_name || user.last_name) && <small className="display-6">({user.first_name} {user.last_name})</small>}
            </div>
            <p>
                <b>Florgon</b> member from <i>{createdAt.toDateString()}</i> (<b>{existsForDays}</b> days).<br/>
            </p>
        </div>
        <hr/>
        <div className="row mb-5 mt-5">
            <div className="col-lg ml-lg-5">

                <h2>About me</h2>
                <div className="mx-4">
                    <h4 className="text-secondary">User has not written anything about himself...</h4>
                </div>
            </div>
        </div>
        <div className="row mb-5">
            <div className="col-lg ml-lg-5">

                <h2>Publications</h2>
                <div className="mx-4">
                    <h4 className="text-secondary">User has not published anything yet...</h4>
                </div>
            </div>
        </div>
    </>)
}

function _FailedToLoad({pageTitle, description}){
    return (<>
        <Head>
            <meta name="description" content={pageTitle} />
            <meta name="title" content={pageTitle} />
            <title>{pageTitle}</title>
        </Head>
        <div className="display-1 text-danger text-center"><b>{pageTitle}</b></div>
        <div className="row mt-5 mb-5">
            <div className="col-lg ml-lg-5 text-center">
                <h2></h2>
                <h2><b>Oops...</b></h2>
                <p>{description}</p>
                <Link href="https://florgon.space"><a className="btn btn-lg btn-primary mt-3 shadow">Go back to Florgon</a></Link>&nbsp;
            </div>
        </div>
    </>)
}
export default function UserProfile({ user, error }) {
    if (error === authApiErrorCode.USER_DEACTIVATED){
        return <_FailedToLoad 
            pageTitle={"Deactivated user!"} 
            description={"Sorry, but this user has been banned!"}
        />
    }

    if (error === authApiErrorCode.USER_PROFILE_PRIVATE){
        return <_FailedToLoad 
            pageTitle={"Private profile!"} 
            description={"Sorry, but this user preferred to keep his profile private!"}
        />
    }

    if (error === authApiErrorCode.USER_PROFILE_AUTH_REQUIRED){
        return <_FailedToLoad 
            pageTitle={"Private profile!"} 
            description={"Sorry, but this user preferred to keep his profile private!"}
        />
    }

    return <_UserProfile user={user}/>
}
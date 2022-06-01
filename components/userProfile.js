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
                <b>Florgon</b> member since <i>{createdAt.toDateString()}</i> (<b>{existsForDays}</b> days).<br/>
                {user.profile.website && <>
                    Website: <a href={user.profile.website} className="link-secondary">{user.profile.website}</a>
                </>}
            </p>
        </div>
        <hr/>
        <div className="row mt-5">
            <div className="col-lg ml-lg-5">

                <h2>About me</h2>
                <div className="mx-4">
                    <h4 className="text-secondary">
                        {user.profile.bio && user.profile.bio}
                        {!user.profile.bio && "User has not written anything about himself..."}
                    </h4>
                </div>
            </div>
        </div>
        <div className="row mb-5">
            <div className="col-lg ml-lg-5">

            {(user.profile.socials.vk || user.profile.socials.tg || user.profile.socials.gh) && <>
                    <h2>My accounts</h2>
                    <div className="mx-4">
                        <h4 className="text-secondary">
                            {user.profile.socials.vk && <div>
                                VK: <a href={`https://vk.com/${user.profile.socials.vk}`}>@{user.profile.socials.vk}</a>
                            </div>}
                            {user.profile.socials.tg && <div>
                                Telegram: <a href={`https://t.me/${user.profile.socials.tg}`}>@{user.profile.socials.tg}</a>
                            </div>}
                            {user.profile.socials.gh && <div>
                                GitHub: <a href={`https://github.com/${user.profile.socials.gh}`}>@{user.profile.socials.gh}</a>
                            </div>}
                        </h4>
                    </div>
                </>}
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

    if (error === 44){
        return <_FailedToLoad 
            pageTitle={"Too many requests!"} 
            description={"Please slow down in making requests!"}
        />
    }

    if (error === 42){
        return <_FailedToLoad 
            pageTitle={"Internal server error!"} 
            description={"Sorry, server unable to process your request!"}
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
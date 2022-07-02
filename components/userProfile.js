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
                <b>Florgon</b> member since <i>{createdAt.toDateString()}</i> (<b>{existsForDays}</b> days).
                {(user.profile.website || user.states.is_vip) && <br/>}
                {user.profile.website && <>
                    Website: <a href={user.profile.website} className="link-secondary">{user.profile.website}</a>
                </>}
                {(user.profile.website && user.states.is_vip) && <br/>}
                {user.profile.socials.vk && <span style={{color: "#ffc0cb"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
                    </svg>
                    {" "}
                    This is VIP Florgon user!
                    {" "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
                    </svg>
                <br/></span>}
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
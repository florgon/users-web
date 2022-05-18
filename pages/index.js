export async function getServerSideProps(){
    return {
        redirect: {
            destination: 'https://profile.florgon.space',
            permanent: false,
        },
    }
}
export default function Home() {}
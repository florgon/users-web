import Footer from './footer'
import { Container } from 'react-bootstrap'
import Head from 'next/head'

export default function Layout({ children }) {
  return (<>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      <meta name="author" content={process.env.NEXT_PUBLIC_META_AUTHOR} />
      
      <meta name="description" content="Florgon users public profiles." />
      <meta name="keywords" content="florgon, users, profile" />
      
      <link rel="canonical" href={process.env.NEXT_PUBLIC_CANONICAL_DOMAIN} />
      <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_CANONICAL_DOMAIN} />

      <meta name="title" content="Florgon Users" />
      <title>Florgon Users</title>
    </Head>
    <Container className="mt-5">{children}</Container>
    <Footer/>
  </>)
}

import Head from 'next/head'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import BLOG from '../blog.config'
import useDomClean from 'lib/use-dom-clean'
import { PrismBaseline } from '@geist-ui/react-prism'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { useCallback, useState, useEffect, useMemo } from 'react'
import { getDNSPrefetchValue } from 'lib/data-transform'
import { BlogConfigsProvider } from 'lib/components'

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
  const [themeType, setThemeType] = useState('light')
  const domain = useMemo(() => getDNSPrefetchValue(BLOG.domain), [])
  const changeHandle = useCallback(isDark => {
    const next = isDark ? 'light' : 'dark'
    setThemeType(next)
  }, [])

  useEffect(() => {
    if (typeof localStorage !== 'object') return
    const themeType = localStorage.getItem('theme')
    setThemeType(themeType === 'dark' ? 'dark' : 'light')
  }, [])
  useEffect(() => localStorage.setItem('theme', themeType), [themeType])
  useDomClean()

  return (
    <>
      <Head>
        <title>{BLOG.title}</title>
        {domain && <link rel="dns-prefetch" href={domain} />}
        <meta name="google" content="notranslate" />
        <meta name="referrer" content="strict-origin" />
        <meta name="description" content={BLOG.description} />
        <meta property="og:site_name" content={BLOG.title} />
        <meta property="og:description" content={BLOG.description} />
        <meta property="og:type" content="website" />
        <meta name="generator" content="unix.bio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content={BLOG.author} />
        <meta name="twitter:creator" content={`@${BLOG.twitter}`} />
        <meta property="og:title" content={BLOG.title} />
        <meta property="og:url" content={BLOG.domain} />
        <meta property="og:image" content={`https:${domain}/assets/og-main.png`} />
        <meta property="twitter:image" content={`https:${domain}/assets/og-main.png`} />
        <meta
          itemProp="image"
          property="og:image"
          content={`https:${domain}/assets/og-main.png`}
        />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
      </Head>
      <GeistProvider themeType={themeType}>
        <CssBaseline />
        <PrismBaseline />
        <BlogConfigsProvider onChange={changeHandle}>
          <Component {...pageProps} />
        </BlogConfigsProvider>
        <style global jsx>{`
          @media only screen and (max-width: 767px) {
            html {
              font-size: 15px;
            }
          }
        `}</style>
      </GeistProvider>
    </>
  )
}

export default Application

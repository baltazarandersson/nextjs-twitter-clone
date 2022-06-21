import AppLayout from "@components/Layout/index"

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp

import MainLayout from "@components/Layout/index"
import UserContextProvider from "@context/UserContext"

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </UserContextProvider>
  )
}

export default MyApp

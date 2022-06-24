import { Loader } from "@components/Loader"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "@hooks/useUser"

export const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = () => {
    const user = useUser()
    const router = useRouter()

    if (user === USER_STATES.NOT_LOGGED) {
      router.push("/")
    } else if (user === USER_STATES.NOT_KNOWN) {
      return (
        <>
          <div>
            <Loader size={32} />
          </div>
          <style jsx>{`
            div {
              display: grid;
              height: 100%;
              width: 100%;
              place-items: center;
              align-content: center;
            }
          `}</style>
        </>
      )
    } else {
      return <WrappedComponent user={user} />
    }
  }
  return AuthenticatedComponent
}

import Devit from "@components/Devit"
import DevitSkeleton from "@components/Devit/DevitSkeleton"

export default function Timeline({ devitsList }) {
  return (
    <>
      {devitsList ? (
        devitsList.map((devit) => {
          return <Devit key={devit.id} devit={devit} />
        })
      ) : (
        <>
          <DevitSkeleton />
          <DevitSkeleton />
        </>
      )}
    </>
  )
}

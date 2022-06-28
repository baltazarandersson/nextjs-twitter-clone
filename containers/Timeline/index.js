import Devit from "@components/Devit"
import DevitSkeleton from "@components/Devit/DevitSkeleton"

export default function Timeline({ devitList }) {
  return (
    <>
      {devitList ? (
        devitList.map((devit) => {
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

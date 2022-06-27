import Devit from "@components/Devit"
import DevitSkeleton from "@components/Devit/DevitSkeleton"

export default function Timeline({ devitList }) {
  return (
    <>
      {devitList ? (
        devitList.map(
          ({
            id,
            userUid,
            avatar,
            displayName,
            userName,
            createdAt,
            content,
            commentsCount,
            shares,
            likedBy,
            img,
          }) => {
            return (
              <Devit
                key={id}
                id={id}
                userUid={userUid}
                avatar={avatar}
                displayName={displayName}
                userName={userName}
                createdAt={createdAt}
                content={content}
                commentsCount={commentsCount}
                shares={shares}
                likedBy={likedBy}
                img={img}
              />
            )
          }
        )
      ) : (
        <>
          <DevitSkeleton />
          <DevitSkeleton />
        </>
      )}
    </>
  )
}

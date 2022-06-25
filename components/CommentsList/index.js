import Comment from "./Comment"

export default function CommentsList({ list }) {
  return (
    <>
      {list.map(
        ({ avatar, createdAt, displayName, userName, content, likes, id }) => {
          return (
            <Comment
              key={id}
              avatar={avatar}
              createdAt={createdAt}
              displayName={displayName}
              userName={userName}
              content={content}
              likes={likes}
            />
          )
        }
      )}
    </>
  )
}

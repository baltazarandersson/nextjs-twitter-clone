import Reply from "@components/Reply"

export default function RepliesList({ list }) {
  return (
    <>
      {list.map((replyContent) => {
        return <Reply key={replyContent.id} replyContent={replyContent} />
      })}
    </>
  )
}

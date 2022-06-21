import Button from "@components/Button"

export default function devit() {
  return (
    <>
      <form>
        <textarea placeholder="What's happening?"></textarea>
        <div>
          <Button>Devittear</Button>
        </div>
      </form>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          min-height: 200px;
          outline: 0;
          width: 100%;
          border: none;
          padding: 15px;
          font-size: 21px;
          resize: none;
        }
      `}</style>
    </>
  )
}

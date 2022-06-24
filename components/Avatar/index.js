export default function Avatar({ alt, src, text, size = 48 }) {
  return (
    <>
      <div>
        <img alt={alt} src={src}></img>
        {text && <strong>{text || alt}</strong>}
      </div>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
        }
        img {
          border-radius: 50%;
          height: ${size}px;
          width: ${size}px;
        }
        img + strong {
          margin-left: 8px;
        }
      `}</style>
    </>
  )
}

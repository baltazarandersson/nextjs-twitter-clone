export default function Avatar({
  alt,
  src,
  text,
  size = 48,
  hoverOpacity = 0.9,
}) {
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
          transition: filter 0.2s ease;
        }
        img {
          border-radius: 50%;
          height: ${size}px;
          width: ${size}px;
        }
        img + strong {
          margin-left: 8px;
        }
        img:hover {
          filter: brightness(${hoverOpacity});
        }
      `}</style>
    </>
  )
}

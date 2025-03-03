function PosterImg({ img }) {
  console.log({ img });
  return <div className="w-full">{img && <img src={img.src} />}</div>;
}

export default PosterImg;

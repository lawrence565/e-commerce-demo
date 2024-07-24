function Card(props: {
  title: string;
  content: string;
  img: string;
}): JSX.Element {
  return (
    <div className="img-container">
      <img className="promote-img rounded-md" src={props.img} alt="" />
      <div className="goods-tag">
        <h3 className="goods-name">{props.title}</h3>
        <p className="goods-disc">{props.content}</p>
      </div>
    </div>
  );
}

export default Card;

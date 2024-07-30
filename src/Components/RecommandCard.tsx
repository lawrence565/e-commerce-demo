function RecommandCard(props: {
  name: string;
  img: string;
  description: string;
}) {
  return (
    <div className="class-midbrown max-w-[300px] w-[20dvw] m-4">
      <h1 className="text-[1.3rem]">{props.name}</h1>
      <div className="store-img-container aspect-[4/3] overflow-hidden rounded-md my-2">
        <img src={props.img} />
      </div>
      <p className="text-base">{props.description}</p>
    </div>
  );
}

export default RecommandCard;

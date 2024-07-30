function StoreProductCard(props: {
  img: string;
  productName: string;
  productPrice: number;
}) {
  return (
    <div className="mx-6 my-2 cursor-pointer">
      <div className="w-[12dvw] max-w-[250px] rounded-md overflow-hidden border-midBrown border-[5px] aspect-4/3">
        <img src={props.img} />
      </div>
      <div className="">
        <h1 className="text-xl">{props.productName}</h1>
        <h2 className="text-lg italic font-bold text-end">{`$ ${props.productPrice}`}</h2>
      </div>
    </div>
  );
}

export default StoreProductCard;

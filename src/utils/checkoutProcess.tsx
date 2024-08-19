function CheckoutProcess(props: { step: number }) {
  const step = props.step;
  return (
    <div className="flex items-center">
      <div
        id="first"
        className={`rounded-2xl w-8 h-8 overflow-hidden text-center align-middle flex justify-center items-center ${
          step > 0 ? "bg-midBrown text-white" : "bg-gray-200 "
        }`}
      >
        {step > 1 ? <div id="first">✔</div> : <div>1</div>}
      </div>
      <div
        className={`line h-[3px] w-[30dvh] ${
          step > 1 ? "bg-midBrown" : "bg-gray-200"
        }`}
      ></div>
      <div
        id="second"
        className={`rounded-2xl w-8 h-8 overflow-hidden text-center align-middle flex justify-center items-center  ${
          step > 1 ? "bg-midBrown text-white" : "bg-gray-200 "
        }`}
      >
        {step > 2 ? <div id="first">✔</div> : <div>2</div>}
      </div>
      <div
        className={`line h-[3px] w-[30dvh] ${
          step > 2 ? "bg-midBrown" : "bg-gray-200"
        }`}
      ></div>
      <div
        id="third"
        className={`rounded-2xl w-8 h-8 overflow-hidden text-center align-middle flex justify-center items-center  ${
          step > 3 ? "bg-midBrown text-white" : "bg-gray-200 "
        }`}
      >
        {step > 3 ? <div id="first">✔</div> : <div>3</div>}
      </div>
    </div>
  );
}
export default CheckoutProcess;

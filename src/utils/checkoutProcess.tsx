function CheckoutProcess(props: { step: number }) {
  const step = props.step;
  return (
    <div className="flex items-center">
      <div
        id="first"
        className={`rounded-2xl w-8 h-8 overflow-hidden text-center align-middle flex justify-center items-center ${
          step === 1 ? "bg-gray-200" : "bg-midBrown"
        }`}
      >
        {step === 1 ? <div>1</div> : <div id="first">✔</div>}
      </div>
      <div
        className={`h-[3px] w-[30dvh] ${
          step > 1 ? "bg-midBrown" : "bg-gray-200"
        }`}
      ></div>
      <div
        id="second"
        className={`rounded-2xl w-8 h-8 overflow-hidden text-center align-middle flex justify-center items-center ${
          step === 1 ? "bg-gray-200" : "bg-midBrown"
        }`}
      >
        {step === 1 ? <div>2</div> : <div id="first">✔</div>}
      </div>
      <div
        className={`h-[3px] w-[30dvh] ${
          step > 2 ? "bg-midBrown" : "bg-gray-200"
        }`}
      ></div>
      <div
        id="third"
        className={`rounded-2xl w-8 h-8 overflow-hidden text-center align-middle flex justify-center items-center ${
          step === 1 ? "bg-gray-200" : "bg-midBrown"
        }`}
      >
        {step === 1 ? <div>3</div> : <div id="first">✔</div>}
      </div>
    </div>
  );
}
export default CheckoutProcess;

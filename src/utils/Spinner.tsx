const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/90 backdrop-blur-sm">
      <div className="relative w-40 h-40">
        <div className="absolute inset-0 flex items-center justify-center text-clay font-bold text-xl tracking-wider animate-pulse">
          Loading
        </div>
        <div className="absolute inset-0 border-8 border-transparent border-t-clay border-r-clay rounded-full animate-spin [animation-duration:1.5s]"></div>
        <div className="absolute inset-2 border-8 border-transparent border-l-gray-200 border-b-gray-200 rounded-full animate-spin [animation-duration:2s] opacity-60"></div>
      </div>
    </div>
  );
};

export default Spinner;

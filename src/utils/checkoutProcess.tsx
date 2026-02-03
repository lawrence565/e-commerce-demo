function CheckoutProcess(props: { step: number }) {
  const step = props.step;
  const steps = [
    { id: 1, label: "購物車" },
    { id: 2, label: "填寫資料" },
    { id: 3, label: "完成" },
  ];

  return (
    <div className="w-full max-w-[640px] mx-auto">
      <div className="flex items-center gap-3">
        {steps.map((item, index) => (
          <div key={item.id} className="flex items-center gap-3 flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                step >= item.id
                  ? "bg-[color:var(--color-accent)] text-white"
                  : "bg-black/10 text-black/50"
              }`}
            >
              {step > item.id ? "✓" : item.id}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] flex-1 ${
                  step > item.id ? "bg-[color:var(--color-accent)]" : "bg-black/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 text-xs text-black/50">
        {steps.map((item) => (
          <span
            key={item.id}
            className={`text-center ${
              step >= item.id ? "text-black" : "text-black/40"
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
export default CheckoutProcess;

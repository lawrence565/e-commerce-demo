import { useForm } from "react-hook-form";

type CardInfo = {
  cardNumber: string;
  expiryMonth: number | string;
  expiryYear: number | string;
  securityCode: string;
};

interface ChildFormProps {
  handlePaymentMethod: (data: CardInfo) => void;
}

export function CreditCard({ handlePaymentMethod }: ChildFormProps) {
  const form = useForm<CardInfo>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: CardInfo) => {
    handlePaymentMethod(data);
  };

  return (
    <div className="p-4 m-4 border-4 border-midBrown w-fit rounded-lg">
      <div className="mb-2 flex flex-col">
        <label
          htmlFor="cardNumber"
          className="mr-2 text-midBrown font-semibold mb-1"
        >
          信用卡卡號
        </label>
        <input
          className="w-full border-2 border-midBrown rounded-md bg-gray-100 h-8"
          type="text"
          id="cardNumber"
          {...register("cardNumber", {
            required: "請輸入卡號",
            validate: (FormValue) => {
              return FormValue.length != 16 || "請輸入正確的信用卡號";
            },
          })}
        />
        <p className="text-red-600">{errors.cardNumber?.message}</p>
      </div>
      <div className="flex mb-2">
        <div className="flex-1">
          <label
            htmlFor="expiry-date"
            className="inline-block mr-2 text-midBrown font-semibold mb-1"
          >
            到期日
          </label>
          <div id="expiry-date" className="flex mr-4">
            <select
              className="h-8 border-2 border-midBrown"
              {...register("expiryMonth", {
                required: "請選擇月份",
                validate: (value) => {
                  return value !== "month" || "請選擇正確的到期日";
                },
              })}
            >
              <option value="month">月</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <p className="mx-2"> / </p>
            <select
              className="h-8 border-2 border-midBrown"
              {...register("expiryYear", {
                required: "請選擇年份",
                validate: (value) => {
                  return value !== "year" || "請選擇正確的到期日";
                },
              })}
            >
              <option value="year">年</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() + i}>
                  {new Date().getFullYear() + i}
                </option>
              ))}
            </select>
          </div>
          <p className="text-red-600">
            {errors.expiryMonth?.message || errors.expiryYear?.message}
          </p>
        </div>
        {/* {errors.expiryMonth && <p>{errors.expiryMonth.message}</p>}
          {errors.expiryYear && <p>{errors.expiryYear.message}</p>} */}
        <div className="flex-1 flex flex-col">
          <label
            htmlFor="securityCode"
            className="mr-2 text-midBrown font-semibold mb-1"
          >
            安全碼
          </label>
          <input
            className="w-full border-2 border-midBrown rounded-md bg-gray-100 h-8"
            type="text"
            id="securityCode"
            {...register("securityCode", {
              required: "請輸入安全碼",
              validate: (FormValue) => {
                return FormValue.length == 3 || "請輸入正確的安全碼";
              },
            })}
          />
          <p className="text-red-600">{errors.securityCode?.message}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="py-2 px-4 text-base bg-midBrown text-white rounded-md"
          onClick={handleSubmit(onSubmit)}
        >
          儲存
        </button>
      </div>
    </div>
  );
}

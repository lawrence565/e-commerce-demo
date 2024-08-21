import { useForm } from "react-hook-form";

type CardInfo = {
  cardNumber: string;
  expiryMonth: number | string;
  expiryYear: number | string;
  securityCode: string;
};

type ATMInfo = {
  bank: string;
  account: string;
  transferAccount: string;
};

interface ChildFormProps {
  handlePaymentMethod: (data: CardInfo | ATMInfo) => void;
}

export function CreditCard({ handlePaymentMethod }: ChildFormProps) {
  const { register, handleSubmit, formState } = useForm<CardInfo>();
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
                required: true,
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

export function ATM({ handlePaymentMethod }: ChildFormProps) {
  const { register, handleSubmit, formState } = useForm<ATMInfo>({
    defaultValues: {
      transferAccount: "",
    },
  });
  const { errors } = formState;

  const onSubmit = (data: ATMInfo) => {
    data.bank = "星展銀行";
    data.account = "123456789012";
    handlePaymentMethod(data);
  };

  return (
    <div
      id="ATM-info"
      className="m-4 border-midBrown border-4 rounded-xl w-fit px-2"
    >
      <div className="m-4">
        <h3 className="text-xl">收款銀行：星展銀行（812）</h3>
        <h3 className="text-xl">收款帳號：123456789012</h3>
        <div className="flex flex-col mt-2 px-2">
          <label htmlFor="transfer-account" className="text-lg pb-2">
            請輸入轉帳帳號後五碼：
          </label>
          <input
            id="transfer-account"
            type="text"
            className="border-midBrown border-[2px] rounded-md h-8 p-[0.25rem] w-full"
            {...register("transferAccount", {
              required: "請輸入正確的帳號後五碼",
              validate: (value: string) => {
                return value.length == 5 || "請輸入正確的後五碼";
              },
            })}
          />
          <p className="text-red-600">{errors.transferAccount?.message}</p>
        </div>
        <div className="flex justify-center">
          <button
            className="py-2 px-4 mt-2 text-base bg-midBrown text-white rounded-md"
            onClick={handleSubmit(onSubmit)}
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  );
}

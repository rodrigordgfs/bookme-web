import { MdAttachMoney } from "react-icons/md";
import formatMoneyBRL from "../../utils/formatMoneyBRL";

const CardDashboard = ({
  title = "",
  value = 0,
  money = false,
  percentage = 0,
  percentageText = "",
}) => {
  return (
    <div className="flex flex-col gap-2 flex-1 border border-zinc-400 rounded-lg p-5">
      <div className="flex flex-row justify-between items-center gap-2">
        <h2 className="text-md font-medium">{title}</h2>
        <MdAttachMoney className="h-5 w-5" />
      </div>
      <p className="text-lg font-semibold">
        {money ? formatMoneyBRL(value) : value}
      </p>
      <p className="text-xs">
        {percentage === 0 ? (
          <span className="font-medium">0%</span>
        ) : percentage > 0 ? (
          <span className="text-green-600 font-medium">{`+${percentage}%`}</span>
        ) : (
          <span className="text-red-600 font-medium">{`${percentage}%`}</span>
        )}{" "}
        {percentageText}
      </p>
    </div>
  );
};

export default CardDashboard;

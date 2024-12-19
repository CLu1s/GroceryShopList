"use client";
import { Progress } from "@/components/ui/progress";
import useGroceryList from "@/hooks/useGroceryList";
import { Label } from "@/components/ui/label";
import { cn, formatMoney } from "@/lib/utils";

const BudgetProgress = () => {
  const { total, remaining, count, progress } = useGroceryList();
  const barColors = (value: number) => {
    if (value < 50) return "bg-green-500";
    if (value > 50 && value < 90) return "bg-yellow-500";
    if (value > 90) return "bg-red-500";
    return "bg-purple-500";
  };
  return (
    <div className=" py-2 px-8">
      <div className={"flex flex-col gap-0"}>
        <div className={"flex w-full justify-between gap-4"}>
          <p className={"text-lg"}>
            <strong>Total:</strong> {formatMoney(total)}
          </p>
          <p className={cn("text-lg", remaining < 0 && "text-red-600")}>
            <strong>Restante:</strong> {formatMoney(remaining)}
          </p>

          <p className={"text-lg m-auto text-center"}>
            <strong>Productos:</strong> {count}
          </p>
        </div>
      </div>
      <div className={"flex m-auto gap-2 w-full"}>
        <Label className={"text-md flex flex-col justify-center"}>
          {Math.ceil(progress)}%
        </Label>
        <div className={"flex flex-col w-full justify-center"}>
          <Progress value={progress} progressColor={barColors(progress)} />
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;

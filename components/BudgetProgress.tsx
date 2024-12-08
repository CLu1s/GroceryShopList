"use client";
import { Progress } from "@/components/ui/progress";
import useGroceryList from "@/hooks/useGroceryList";
import { Label } from "@/components/ui/label";

const BudgetProgress = () => {
  const { progress } = useGroceryList();

  return (
    <div className="alert alert-primary py-2 px-8">
      <Label className={"text-md"}>
        Progreso del presupuesto ${Math.ceil(progress)}%
      </Label>
      <Progress value={progress} />
    </div>
  );
};

export default BudgetProgress;

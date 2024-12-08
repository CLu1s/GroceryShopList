"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useGroceryList from "@/hooks/useGroceryList";
const Budget = () => {
  const { total, remaining, count, budget } = useGroceryList();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}> Ver Resumen</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resumen</DialogTitle>
        </DialogHeader>

        <div className={"flex flex-col gap-3 "}>
          <div className={"flex w-full justify-between gap-4"}>
            <p className={"text-lg"}>
              <strong>Total:</strong> {formatMoney(total)}
            </p>
            <p className={cn("text-lg", remaining < 0 && "text-red-600")}>
              <strong>Restante:</strong> {formatMoney(remaining)}
            </p>
          </div>
          <div className={"flex w-full justify-between gap-4"}>
            <p className={"text-lg"}>
              <strong>Presupuesto:</strong> {formatMoney(budget)}
            </p>
            <p className={"text-lg m-auto text-center"}>
              <strong>Productos:</strong> {count}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Budget;

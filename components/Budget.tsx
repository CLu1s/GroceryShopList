"use client";
import { useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { cn, formatMoney } from "@/lib/utils";
const BUDGET = 1000;
const Budget = () => {
  const { items } = useContext(ShoppingListContext);
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const remaining = BUDGET - total;
  return (
    <div className={"flex flex-col gap-3 "}>
      <h2 className={"text-lg font-semibold"}>Resumen</h2>

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
          <strong>Presupuesto:</strong> {formatMoney(BUDGET)}
        </p>
        <p className={"text-lg m-auto text-center"}>
          <strong>Productos:</strong> {items.length}
        </p>
      </div>
    </div>
  );
};

export default Budget;

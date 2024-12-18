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
import { saveOnFirestore } from "@/firebase/services";
import { nanoid } from "nanoid";
import { toast } from "sonner";

const Budget = () => {
  const { total, remaining, count, budget, items, clearItems } =
    useGroceryList();

  const saveToDB = async () => {
    try {
      const id = `shopping-${nanoid(4)}`;
      toast.promise(
        saveOnFirestore(`shoppingLists/${id}`, {
          id,
          total,
          remaining,
          count,
          budget,
          items,
          timestamp: Date.now(),
        }),
        {
          loading: "Guardando...",
          success: "Guardado correctamente",
          error: "Error al guardar",
        },
      );
    } catch (e) {
      console.log("Error saving to DB", e);
    }
    clearItems();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Guardar</Button>
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
          <Button onClick={saveToDB} disabled={items.length === 0}>
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Budget;

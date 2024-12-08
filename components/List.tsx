"use client";
import { useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { Card, CardContent } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const List = () => {
  const { items, deleteItem, setElementToEdit } =
    useContext(ShoppingListContext);
  return (
    <div className={"border bg-white   p-8"}>
      <ul className={"flex flex-col gap-4"}>
        {items.map((item) => (
          <li key={item.id}>
            <Card>
              <CardContent className={"py-4 px-2"}>
                <div className={"flex flex-col justify-between gap-4 "}>
                  <div className={"flex justify-between"}>
                    <p
                      className={
                        "text-md font-semibold flex flex-col justify-center "
                      }
                    >
                      {item.product}
                    </p>
                    <div className={"flex gap-2"}>
                      <Button
                        size={"sm"}
                        onClick={() => setElementToEdit(item)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        size={"sm"}
                        onClick={() => deleteItem(item.id)}
                        variant={"destructive"}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                  <div className={"flex justify-between"}>
                    <p className={" flex flex-col justify-center"}>
                      {formatMoney(item.price)} x {item.quantity}
                    </p>
                    <div className={"flex flex-col justify-center"}>
                      <p className={"font-semibold "}>
                        {formatMoney(item.quantity * item.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;

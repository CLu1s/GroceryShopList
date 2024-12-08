"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import useGroceryList from "@/hooks/useGroceryList";

const List = () => {
  const [filter, setFilter] = useState("");
  const { items, deleteItem, setElementToEdit, findItemByName } =
    useGroceryList();
  const filters = findItemByName(filter) || items;
  return (
    <div className={"border bg-white  flex flex-col gap-2  px-8 py-4 pb-1"}>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder={"Buscar producto"}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button type="button" size={"sm"}>
          <X />
        </Button>
      </div>
      {filters.length === 0 ? (
        <strong className={"text-lg p-9 text-gray-600 text-center"}>
          No hay elementos para mostrar
        </strong>
      ) : (
        <ScrollArea className={"h-[400px]"}>
          <ul className={"flex flex-col gap-4"}>
            {filters.map((item) => (
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
        </ScrollArea>
      )}
    </div>
  );
};

export default List;

"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { Label } from "@/components/ui/label";
import { nanoid } from "nanoid";
import { Minus, Plus } from "lucide-react";

type FormValues = {
  product: string;
  price: number | string;
  quantity: number;
};

const defaultValues: FormValues = {
  product: "",
  price: "",
  quantity: 1,
};

// @ts-expect-error sssss
const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.product ? values : {},
    errors: !values.product
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

const NewItem = () => {
  const { setItems, elementToEdit, updateItem } =
    useContext(ShoppingListContext);
  const [quantity, setQuantity] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver });
  useEffect(() => {
    if (elementToEdit) {
      reset(elementToEdit);
      setQuantity(elementToEdit.quantity);
    }
  }, [elementToEdit]);
  const onSubmit = handleSubmit((data) => {
    const dataToSubmit = {
      ...data,
      price: typeof data.price === "string" ? parseInt(data.price) : data.price,
      quantity,
      id: elementToEdit ? elementToEdit.id : nanoid(),
      product: data.product.trim(),
    };
    if (elementToEdit) {
      updateItem(dataToSubmit);
    } else {
      setItems(dataToSubmit);
    }
    reset(defaultValues);
    setQuantity(1);
  });
  return (
    <form onSubmit={onSubmit} className={"flex flex-col gap-4"}>
      <div className={"flex flex-col gap-4"}>
        <div>
          <Label htmlFor={"price"}>Nombre</Label>

          <Input {...register("product")} placeholder="Producto" />
        </div>
        {errors?.product && <p>{errors.product.message}</p>}
        <div className={"flex gap-4"}>
          <div>
            <Label htmlFor={"price"}>Precio</Label>
            <Input
              {...register("price")}
              type={"number"}
              step="0.01"
              placeholder="Precio"
            />
          </div>
          <div>
            <Label htmlFor={"quantity"}>Cantidad</Label>
            <div className={"flex gap-2"}>
              <Button
                type={"button"}
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              >
                <Minus />
              </Button>
              <Input
                {...register("quantity")}
                type={"number"}
                placeholder="Cantidad"
                value={quantity}
                className={"w-12"}
              />
              <Button
                type={"button"}
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className={"w-full"}>
        {elementToEdit ? "Actualizar" : "Agregar"}
      </Button>
    </form>
  );
};

export default NewItem;

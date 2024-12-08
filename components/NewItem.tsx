"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
import { Label } from "@/components/ui/label";
import { nanoid } from "nanoid";

type FormValues = {
  product: string;
  price: number;
  quantity: number;
};

const defaultValues: FormValues = {
  product: "",
  price: 0,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver });
  useEffect(() => {
    if (elementToEdit) {
      reset(elementToEdit);
    }
  }, [elementToEdit]);
  const onSubmit = handleSubmit((data) => {
    if (elementToEdit) {
      updateItem({
        ...data,
        id: elementToEdit.id,
        product: data.product.trim(),
      });
    } else {
      setItems({
        ...data,
        id: nanoid(),
        product: data.product.trim(),
      });
    }
    reset(defaultValues);
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
            <Input
              {...register("quantity")}
              type={"number"}
              placeholder="Cantidad"
              defaultValue={1}
            />
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

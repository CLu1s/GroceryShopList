import { useContext } from "react";
import { ShoppingListContext } from "@/contexts/ShoppingListContext";
const BUDGET = 1000;

const useGroceryList = () => {
  const {
    setItems,
    elementToEdit,
    updateItem,
    items,
    deleteItem,
    setElementToEdit,
  } = useContext(ShoppingListContext);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const remaining = BUDGET - total;
  const progress = (total / BUDGET) * 100;
  const findItemByName = (name: string) => {
    return items.filter((item) => item.product.includes(name));
  };

  return {
    items,
    setItems,
    elementToEdit,
    updateItem,
    total,
    remaining,
    count: items.length,
    progress,
    deleteItem,
    setElementToEdit,
    findItemByName,
    budget: BUDGET,
  };
};

export default useGroceryList;

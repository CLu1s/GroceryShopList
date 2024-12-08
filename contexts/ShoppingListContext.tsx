"use client";
import { createContext, useState } from "react";
type Item = {
  id: string;
  product: string;
  price: number;
  quantity: number;
};
const ShoppingListContext = createContext({
  items: [],
  setItems: () => {},
  deleteItem: () => {},
  elementToEdit: null,
  updateItem: () => {},
  setElementToEdit: () => {},
} as {
  items: Item[];
  setItems: (items: Item) => void;
  deleteItem: (id: string) => void;
  elementToEdit: Item | null;
  updateItem: (item: Item) => void;
  setElementToEdit: (item: Item) => void;
});

type Props = {
  children: React.ReactNode;
};

const ShoppingListProvider = ({ children }: Props) => {
  const [items, setItems] = useState<Item[]>([]);
  const [elementToEdit, setElementToEdit] = useState<Item | null>(null);
  const handleAddItem = (item: Item) => {
    const newItem = { ...item, quantity: item.quantity || 1 };
    setItems((prevItems) => [...prevItems, newItem]);
  };
  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const updateItem = (item: Item) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, ...item } : prevItem,
      ),
    );
    setElementToEdit(null);
  };

  return (
    <ShoppingListContext.Provider
      value={{
        items,
        setItems: handleAddItem,
        deleteItem,
        elementToEdit,
        setElementToEdit,
        updateItem,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
export { ShoppingListContext };
export default ShoppingListProvider;

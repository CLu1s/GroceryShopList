"use client";
import { createContext, useState } from "react";
type Item = {
  id: string;
  product: string;
  price: number;
  quantity: number;
};

type Context = {
  items: Item[];
  setItems: (items: Item) => void;
  deleteItem: (id: string) => void;
  elementToEdit: Item | null;
  updateItem: (item: Item) => void;
  setElementToEdit: (item: Item) => void;
  clearItems: () => void;
};

const ShoppingListContext = createContext<Context>({
  items: [],
  setItems: () => {},
  deleteItem: () => {},
  elementToEdit: null,
  updateItem: () => {},
  setElementToEdit: () => {},
  clearItems: () => {},
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

  const clearItems = () => {
    setItems([]);
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
        clearItems,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
export { ShoppingListContext };
export default ShoppingListProvider;

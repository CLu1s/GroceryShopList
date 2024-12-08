import NewItem from "@/components/NewItem";
import ShoppingListProvider from "@/contexts/ShoppingListContext";
import List from "@/components/List";
import Budget from "@/components/Budget";
import ListFooter from "@/components/ListFooter";

export default function Home() {
  return (
    <div className={"relative bg-gray-100 h-screen"}>
      <ShoppingListProvider>
        <h1>Home</h1>
        <List />
        <ListFooter>
          <NewItem />
          <Budget />
        </ListFooter>
      </ShoppingListProvider>
    </div>
  );
}

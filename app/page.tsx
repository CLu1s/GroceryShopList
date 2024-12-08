import NewItem from "@/components/NewItem";
import ShoppingListProvider from "@/contexts/ShoppingListContext";
import List from "@/components/List";
import Budget from "@/components/Budget";
import ListFooter from "@/components/ListFooter";
import BudgetProgress from "@/components/BudgetProgress";

export default function Home() {
  return (
    <div className={"relative bg-gray-100 h-screen"}>
      <ShoppingListProvider>
        <div className={"flex justify-between px-8 py-2"}>
          <h1 className={"text-xl font-bold "}>Lista del super</h1>
          <Budget />
        </div>
        <BudgetProgress />
        <List />
        <ListFooter>
          <NewItem />
        </ListFooter>
      </ShoppingListProvider>
    </div>
  );
}

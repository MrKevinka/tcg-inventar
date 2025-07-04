import { CardList } from "@/components/CardList/CardList";
import { InventoryProvider } from "@/hooks/useInventory";

export default function Home() {
  return (
    <main className="mx-5 flex flex-col">
      <InventoryProvider>
        <CardList />
      </InventoryProvider>
    </main>
  );
}

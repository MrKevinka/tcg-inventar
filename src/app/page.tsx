import { CardList } from '@/components/CardList/CardList';
import { Collection } from '@/components/Collection/Collection';

export default function Home() {
  return (
    <main className="m-4 flex flex-col" id="start">
      <CardList />
      <Collection />
    </main>
  );
}

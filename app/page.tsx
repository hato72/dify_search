import SearchComponent from '../components/SearchComponent';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Dify Search</h1>
      <SearchComponent />
    </div>
  );
}
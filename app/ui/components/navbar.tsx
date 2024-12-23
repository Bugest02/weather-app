import SearchBar from "./searchBar";

export default async function NavBar(props: {
  searchParams?: Promise<{
    city?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const city = searchParams?.city;

  return (
    <div className="fixed top-0 left-0 w-full bg-black h-16 flex items-center z-50">
      {/* Shared container for alignment */}
      <div className="w-full max-w-6xl mx-auto flex items-center px-4">
        <SearchBar placeholder="Search City" />
        <p className="text-white ml-4">{city}</p>
      </div>
    </div>
  );
}

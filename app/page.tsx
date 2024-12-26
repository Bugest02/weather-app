import React, { Suspense } from "react";
import NavBar from "./ui/components/navbar";
import WeatherCardSkeleton from "./ui/cards/skeleton";
import Footer from "./ui/components/footer";
const WeatherCard = React.lazy(() => import("./ui/cards/cards"));

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ city?: string }>;
}) {

  const resolvedParams = await searchParams;
  const city = resolvedParams?.city || "Aguascalientes";

  return (
    <div className="grid grid-rows-auto items-center justify-items-center gap-5 pt-20 font-[family-name:var(--font-geist-sans)] bg-slate-100">
      {/* Always render NavBar */}
      <header>
        <NavBar />
      </header>

      {/* Error Boundary resets based on city */}
      <main className="flex flex-col items-center justify-center m-5">
          <Suspense fallback={<WeatherCardSkeleton />}>
            <WeatherCard url={city} temp_unit="C" />
          </Suspense>
      </main>
      <footer className="flex bottom-0 left-0  w-full items-center mt-10">
        <Footer />
      </footer>
    </div>
  );
}
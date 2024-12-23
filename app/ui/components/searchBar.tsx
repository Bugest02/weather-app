"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";
import { useState, useRef, useEffect } from "react";
import { Locations, countryCode } from "@/app/lib/definitions";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const [results, setResults] = useState<Locations[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    if (query.trim().length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await fetch(`/api/cities?city=${query}`);
      if (!response.ok) throw new Error("Failed to fetch cities.");

      const data: Locations[] = await response.json();
      setResults(data);
      setShowDropdown(data.length > 0);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setResults([]);
      setShowDropdown(false);
    }
  }, 500);

  const handleCitySelection = (cityId: string) => {
    const params = new URLSearchParams(searchParams);

    if (cityId) {
      params.set("city", cityId);
    } else {
      params.delete("city");
    }

    replace(`${pathname}?${params.toString()}`);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-80">
      {/* Input Field */}
      <div className="relative">
        <input
          id="search"
          type="text"
          className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
        />
        {/* Icon/Button on the Right */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Dropdown Suggestions */}
      {showDropdown && (
        <div
          className="absolute top-full left-0 mt-2 w-full bg-gray-50 border border-gray-300 shadow z-10"
          ref={dropdownRef}
        >
          <ul className="divide-y divide-gray-200">
            {results.map((city) => (
              <li
                key={city.id}
                className="flex justify-between items-center px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCitySelection(city.url)}
              >
                <span>
                  {city.name}
                  {city.region && <span>, {city.region}</span>}
                </span>
                {countryCode[city.country] && (
                  <img
                    src={`https://flagsapi.com/${countryCode[city.country]}/flat/64.png`}
                    alt={`Flag of ${city.country}`}
                    className="w-6 h-6"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

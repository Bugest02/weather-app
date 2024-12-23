import React from "react";

// Skeleton component for WeatherCard
export default function WeatherCardSkeleton() {
  return (
    <div className="grid gap-4 w-10/12 grid-cols-1 lg:grid-cols-3 animate-pulse">
      <div className="col-span-1 lg:col-span-2 space-y-4 w-full">
        <TodayCardSkeleton />
        <DailyForecastSkeleton />
        <ConditionsCardSkeleton />
      </div>
      <div className="col-span-1 w-full">
        <WeeklyForecastSkeleton />
      </div>
    </div>
  );
}

// Skeleton for TodayCard
function TodayCardSkeleton() {
  return (
    <div className="grid w-full px-8 py-5 grid-cols-3 gap-10 rounded-lg bg-gray-200">
      <div className="relative col-span-2">
        <div className="h-6 w-1/2 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded mb-4"></div>
        <div className="h-12 w-1/4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center justify-center">
        <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}

// Skeleton for WeeklyForecast
function WeeklyForecastSkeleton() {
  return (
    <div className="w-full h-full bg-gray-200 p-8 rounded-lg">
      <div className="h-4 w-1/3 bg-gray-300 rounded mb-3"></div>
      <div className="grid rows-auto h-full divide-y">
        {[...Array(7)].map((_, index) => (
          <ForecastWeekCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function ForecastWeekCardSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4 items-center py-2">
      <div className="h-4 w-12 bg-gray-300 rounded"></div>
      <div className="flex col-span-2 flex-row items-center">
        <div className="h-8 w-8 bg-gray-300 rounded-full mr-4"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </div>
      <div className="h-4 w-16 bg-gray-300 rounded"></div>
    </div>
  );
}

// Skeleton for DailyForecast
function DailyForecastSkeleton() {
  return (
    <div className="w-full bg-gray-200 p-8 rounded-lg">
      <div className="h-4 w-1/3 bg-gray-300 rounded mb-3"></div>
      <div className="w-full flex overflow-x-scroll scrollbar-hide whitespace-nowrap divide-x divide-solid">
        {[...Array(10)].map((_, index) => (
          <ForecastDayCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function ForecastDayCardSkeleton() {
  return (
    <div className="h-full place-items-center font-bold text-sm px-3 lg:px-5 space-y-2">
      <div className="h-4 w-10 bg-gray-300 rounded mb-2"></div>
      <div className="h-8 w-8 bg-gray-300 rounded-full mb-2"></div>
      <div className="h-6 w-8 bg-gray-300 rounded"></div>
    </div>
  );
}

// Skeleton for ConditionsCard
function ConditionsCardSkeleton() {
  return (
    <div className="w-full bg-gray-200 p-8 rounded-lg">
      <div className="h-4 w-1/3 bg-gray-300 rounded mb-3"></div>
      <div className="w-full bg-white rounded-lg grid grid-cols-2 gap-y-3">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[auto_1fr] items-center gap-x-2"
          >
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="h-6 w-8 bg-gray-300 rounded col-start-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

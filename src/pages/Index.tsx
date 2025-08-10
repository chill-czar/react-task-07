import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search, Droplets, Wind } from "lucide-react";
import WeatherIcon from "@/components/weather/WeatherIcon";
import CityCard from "@/components/weather/CityCard";

interface City {
  name: string;
  tempC: number;
  condition: string;
  humidity: number; // percentage
  windKph: number;
}

const CITY_DATA: City[] = [
  { name: "San Francisco", tempC: 18, condition: "Cloudy", humidity: 72, windKph: 14 },
  { name: "New York", tempC: 26, condition: "Sunny", humidity: 58, windKph: 11 },
  { name: "London", tempC: 17, condition: "Rain", humidity: 80, windKph: 20 },
  { name: "Tokyo", tempC: 29, condition: "Partly Cloudy", humidity: 64, windKph: 9 },
  { name: "Sydney", tempC: 22, condition: "Clear", humidity: 55, windKph: 18 },
  { name: "Paris", tempC: 21, condition: "Cloudy", humidity: 67, windKph: 13 },
  { name: "Berlin", tempC: 19, condition: "Rain", humidity: 73, windKph: 16 },
];

const toF = (c: number) => Math.round((c * 9) / 5 + 32);

const Index = () => {
  const [isCelsius, setIsCelsius] = useState(true);
  const featured = CITY_DATA[0];
  const canonical = typeof window !== "undefined" ? window.location.href : undefined;

  const featuredTemp = useMemo(
    () => (isCelsius ? featured.tempC : toF(featured.tempC)),
    [isCelsius]
  );

  return (
    <>
      <Helmet>
        <title>Sleek Weather App — Static Forecast UI</title>
        <meta
          name="description"
          content="Beautiful static weather UI with city search, cards, icons, and °C/°F toggle."
        />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta property="og:title" content="Sleek Weather App — Static Forecast UI" />
        <meta property="og:description" content="Static weather demo with elegant design." />
      </Helmet>

      <header className="container mx-auto py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Sleek Weather App
            </h1>
            <p className="text-muted-foreground max-w-prose">
              Minimal, fast, and beautiful. Explore static city weather with a modern gradient theme.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative w-full md:max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search city (demo)"
                className="pl-9"
                aria-label="Search city"
              />
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <Label htmlFor="unit-toggle" className="text-sm text-muted-foreground">
                °C
              </Label>
              <Switch
                id="unit-toggle"
                checked={!isCelsius}
                onCheckedChange={(v) => setIsCelsius(!v ? true : false)}
                aria-label="Toggle temperature unit"
              />
              <Label htmlFor="unit-toggle" className="text-sm text-muted-foreground">
                °F
              </Label>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto pb-16">
        {/* Featured City */}
        <section aria-labelledby="featured" className="mb-10">
          <h2 id="featured" className="sr-only">
            Featured city
          </h2>
          <div className="rounded-2xl bg-gradient-hero p-6 md:p-8 shadow-glow ring-1 ring-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <WeatherIcon condition={featured.condition} className="text-foreground" size={56} />
                </div>
                <div>
                  <div className="text-sm text-foreground/80">Current city</div>
                  <div className="text-2xl md:text-3xl font-semibold text-foreground">
                    {featured.name}
                  </div>
                  <div className="text-foreground/80">{featured.condition}</div>
                </div>
              </div>

              <div className="flex md:justify-center items-center gap-3">
                <span className="text-5xl md:text-6xl font-bold leading-none text-foreground">
                  {featuredTemp}
                </span>
                <span className="text-2xl md:text-3xl font-medium text-foreground">°{isCelsius ? "C" : "F"}</span>
              </div>

              <div className="flex md:justify-end items-center gap-6 text-foreground/90">
                <div className="flex items-center gap-2">
                  <Droplets size={18} />
                  <span className="text-sm">Humidity</span>
                  <span className="font-medium">{featured.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind size={18} />
                  <span className="text-sm">Wind</span>
                  <span className="font-medium">{featured.windKph} km/h</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Cities */}
        <section aria-labelledby="more-cities">
          <div className="flex items-center justify-between mb-4">
            <h2 id="more-cities" className="text-xl font-semibold">Other cities</h2>
          </div>

          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {CITY_DATA.slice(1).map((city) => (
                <article key={city.name} className="min-w-[240px]">
                  <CityCard city={city} isCelsius={isCelsius} />
                </article>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      </main>
    </>
  );
};

export default Index;

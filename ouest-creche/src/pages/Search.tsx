import MapView from "@/components/MapView";

export default function Search() {
  return (
    <div className="h-main flex flex-col items-center justify-center text-gray-700">
      <h1 className="text-2xl font-bold mb-4">Carte des places disponibles 🧒</h1>
      <MapView />
    </div>
  );
}
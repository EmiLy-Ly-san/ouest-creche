import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// MapContainer = conteneur principal de la carte
// TileLayer = le fond de carte (OpenStreetMap)
// Marker = pour afficher des points sur la carte
// Popup = petite fenêtre d’infos quand on clique sur un marqueur
import L from "leaflet";
//Leaflet lui-même (pour les icônes et la config)


type Creche = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  placesDispo: number;
  ville: string;
};

// Les icônes par défaut leaflet peuvent être cassées si on ne précise pas l'URL du fichier image, ici c'est des icones de leafleft quand meme.
const crecheIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapView() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [creches, setCreches] = useState<Creche[]>([]);
  const [search, setSearch] = useState("");

  //  Récupère la position de l'utilisateur
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => console.error(err)
    );

    // Fake data
    setCreches([
      { id: 1, name: "Crèche Les P’tits Loups", lat: 47.2173, lng: -1.5534, placesDispo: 2, ville: "Nantes" },
      { id: 2, name: "Crèche Les Mésanges", lat: 47.2806, lng: -1.5208, placesDispo: 0, ville: "Carquefou" },
      { id: 3, name: "Crèche Les Petits Bouts", lat: 47.1972, lng: -1.6311, placesDispo: 1, ville: "Rezé" },
    ]);
  }, []);

  const filteredCreches = creches.filter(c =>
    c.ville.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher une ville..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full max-w-md"
      />

      {/* Carte : on la return que si on a une position*/}
      {position && (
        <MapContainer center={position} zoom={11} className="h-[70vh] w-[90vw] max-w-5xl rounded-xl shadow-lg">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marqueur de position de l'utilisateur (sa géoloc) */}
          <Marker position={position} icon={userIcon}>
            <Popup>Vous êtes ici 🧭</Popup>
          </Marker>

          {/* Marqueurs des crèches */}
          {filteredCreches.map((c) => (
            <Marker key={c.id} position={[c.lat, c.lng]} icon={crecheIcon}>
              <Popup>
                <strong>{c.name}</strong> <br />
                Ville : {c.ville} <br />
                Places dispo : {c.placesDispo}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default MapView;
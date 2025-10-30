import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import type { Nursery, User } from "../types";
import { fakeCreches } from "../data/fakeCreches";
import CrecheCard from "./CrecheCard";
import CrechePopup from "./CrechePopup";
import ModalNurseryDetails from "./ModalNurseryDetails";
import ModalSelectChildren from "./ModalSelectChildren";
import ModalConfirmation from "./ModalConfirmation";
import ModalNotification from "./ModalNotification";

// === Leaflet marker icons ===
const crecheIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const entrepriseIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapView() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [creches] = useState<Nursery[]>(fakeCreches);
  const [search, setSearch] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );

  const [selectedCreche, setSelectedCreche] = useState<Nursery | null>(null);
  const [selectedCrecheFromMap, setSelectedCrecheFromMap] =
    useState<Nursery | null>(null);
  const [step, setStep] = useState<"select" | "confirm" | "notify" | null>(
    null
  );
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  const asideRef = useRef<HTMLDivElement>(null);

  const [user] = useState<User>({
    prenom: "Julien",
    nom: "Morel",
    enfants: ["Léo", "Lilou"],
    entreprise: {
      nom: "MecaTech Ouest",
      adresse: "12 Rue de la Noë, 44800 Saint-Herblain",
      lat: 47.2132,
      lng: -1.6545,
    },
  });

  /// Géolocalisation + détection automatique de la ville
  // 🎯 Géolocalisation + détection automatique de la ville
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);

        try {
          // Appel à l’API de géocodage inverse d’OpenStreetMap
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json&accept-language=fr`
          );
          const data = await response.json();

          // nom de la ville 
          let cityName: string = data.address.city || data.address.town || "";
          if (cityName) {
            cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
            setSearch(cityName);
          }
        } catch (error) {
          console.error("Erreur lors du reverse géolocalisation :", error);
        }
      },
      (err) => console.error("Erreur de géolocalisation :", err),
      { enableHighAccuracy: true }
    );
  }, []);

  // Mobile scroll expansion
  useEffect(() => {
    const aside = asideRef.current;
    if (!aside || window.innerWidth >= 768) return;

    const handleScroll = () => {
      if (aside.scrollTop > 10 && !isExpanded) setIsExpanded(true);
      else if (aside.scrollTop === 0 && isExpanded) setIsExpanded(false);
    };

    aside.addEventListener("scroll", handleScroll);
    return () => aside.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  // Filter crèches by city 
  const filteredCreches = creches.filter((c) =>
    c.ville.toLowerCase().includes(search.toLowerCase())
  );

  // Child selection 
  const toggleChild = (child: string, max: number) => {
    if (selectedChildren.includes(child)) {
      setSelectedChildren(selectedChildren.filter((c) => c !== child));
    } else if (selectedChildren.length < max) {
      setSelectedChildren([...selectedChildren, child]);
    }
  };

  const confirmReservation = () => setStep("confirm");

  return (
    <div
      className="relative w-full h-screen md:flex md:flex-row"
      role="main"
      aria-label="Carte des crèches et liste des résultats"
    >
      {/* === Carte === */}
      <section
        className="w-full md:w-2/3 h-full"
        aria-label="Carte interactive des crèches"
      >
        {position && (
          <MapContainer
            attributionControl={false}
            center={position}
            zoom={11}
            zoomControl={false}
            className="h-full w-full z-0"
            aria-label="Carte centrée sur votre position actuelle"
          >
            <TileLayer
              attribution='&copy; <a href="https://cartodb.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {/* Marqueur utilisateur */}
            <Marker position={position} icon={userIcon}>
              <Popup>
                {user.prenom} {user.nom} <br /> Vous êtes ici
              </Popup>
            </Marker>

            {/* Marqueur entreprise */}
            <Marker
              position={[user.entreprise.lat, user.entreprise.lng]}
              icon={entrepriseIcon}
            >
              <Popup>
                <strong>{user.entreprise.nom}</strong> <br />
                {user.entreprise.adresse}
              </Popup>
            </Marker>

            {/* Marqueurs crèches */}
            {filteredCreches.map((c) => (
              <Marker
                key={c.id}
                position={[c.lat, c.lng]}
                icon={crecheIcon}
                aria-label={`Crèche ${c.name} à ${c.ville}`}
              >
                <Popup>
                  <CrechePopup
                    name={c.name}
                    ville={c.ville}
                    placesDispo={c.placesDispo}
                    onClick={() => setSelectedCrecheFromMap(c)}
                  />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </section>

      {/* === Liste latérale === */}
      <aside
        ref={asideRef}
        role="complementary"
        aria-label="Liste des crèches disponibles"
        className={`
            absolute bottom-0 left-0 w-full bg-[#feffee]
            transition-all duration-500 ease-in-out overflow-y-auto
            shadow-[0_4px_20px_5px_rgba(0,0,0,0.25)] md:shadow-none
            md:static md:w-1/3 md:h-full md:bg-[#feffee]
            ${isExpanded
            ? "h-screen rounded-none"
            : "max-h-[50vh] rounded-t-3xl"
          }
  `}
      >

        <section className="px-4 bg-[#feffee] pt-3" aria-labelledby="results-title">
          <div
            className="w-full flex justify-center items-center pt-3 pb-2 cursor-pointer md:hidden"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Replier la liste" : "Déplier la liste"}
          >
            <img
              src="arrow-top.svg"
              alt=""
              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"
                }`}
            />
          </div>

          <label htmlFor="search" className="sr-only">
            Rechercher une crèche par ville
          </label>
          <input
            id="search"
            type="text"
            placeholder="Rechercher une ville..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full mb-3 bg-gray-50"
          />
          <h2 id="results-title" className="text-lg font-semibold mb-3">
            Résultats ({filteredCreches.length})
          </h2>
        </section>

        <section
          className="space-y-4 px-4 pb-6 bg-[#feffee]"
          aria-live="polite"
          aria-label="Résultats de recherche de crèches"
        >
          {filteredCreches.map((c) => (
            <CrecheCard
              key={c.id}
              {...c}
              onReserve={() => {
                setSelectedCreche(c);
                setStep("select");
                setSelectedChildren([]);
              }}
              onNotify={() => {
                setSelectedCreche(c);
                setStep("notify");
              }}
            />
          ))}
        </section>
      </aside>

      {/* === Modales === */}
      {selectedCrecheFromMap && (
        <ModalNurseryDetails
          nursery={selectedCrecheFromMap}
          onReserve={() => {
            setSelectedCreche(selectedCrecheFromMap);
            setSelectedCrecheFromMap(null);
            setStep("select");
          }}
          onNotify={() => {
            setSelectedCreche(selectedCrecheFromMap);
            setSelectedCrecheFromMap(null);
            setStep("notify");
          }}
          onClose={() => setSelectedCrecheFromMap(null)}
        />
      )}

      {step === "select" && selectedCreche && (
        <ModalSelectChildren
          user={user}
          nursery={selectedCreche}
          selectedChildren={selectedChildren}
          toggleChild={toggleChild}
          onConfirm={confirmReservation}
          onClose={() => setStep(null)}
        />
      )}

      {step === "confirm" && selectedCreche && (
        <ModalConfirmation
          user={user}
          nursery={selectedCreche}
          children={selectedChildren}
          onClose={() => {
            setStep(null);
            setSelectedCreche(null);
          }}
        />
      )}

      {step === "notify" && selectedCreche && (
        <ModalNotification
          user={user}
          nursery={selectedCreche}
          entreprise={user.entreprise.nom}
          onClose={() => setStep(null)}
        />
      )}
    </div>
  );
}

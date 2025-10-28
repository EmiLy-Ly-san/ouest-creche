import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

type Creche = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  placesDispo: number;
  ville: string;
  image?: string;
};

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

export default function MapView() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [creches, setCreches] = useState<Creche[]>([]);
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // 🔹 États modale
  const [selectedCreche, setSelectedCreche] = useState<Creche | null>(null);
  const [step, setStep] = useState<"select" | "confirm" | null>(null);
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  // 🔹 Fake enfants utilisateur
  const childrenList = ["Timéo", "Lilou"];

  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err)
    );

    setCreches([
      {
        id: 1,
        name: "Crèche Les P’tits Loups",
        lat: 47.2173,
        lng: -1.5534,
        placesDispo: 2,
        ville: "Nantes",
        image: "https://picsum.photos/300/200?random=1",
      },
      {
        id: 2,
        name: "Crèche Les Mésanges",
        lat: 47.2806,
        lng: -1.5208,
        placesDispo: 1,
        ville: "Carquefou",
        image: "https://picsum.photos/300/200?random=2",
      },
      {
        id: 3,
        name: "Crèche Les Petits Bouts",
        lat: 47.1972,
        lng: -1.6311,
        placesDispo: 3,
        ville: "Rezé",
        image: "https://picsum.photos/300/200?random=3",
      },
    ]);
  }, []);

  const filteredCreches = creches.filter((c) =>
    c.ville.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Scroll mobile
  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return;
    const handleScroll = () => {
      if (aside.scrollTop > 10 && !isExpanded) setIsExpanded(true);
      else if (aside.scrollTop === 0 && isExpanded) setIsExpanded(false);
    };
    aside.addEventListener("scroll", handleScroll);
    return () => aside.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  // 🔹 Sélection enfants
  const toggleChild = (child: string, max: number) => {
    if (selectedChildren.includes(child)) {
      setSelectedChildren(selectedChildren.filter((c) => c !== child));
    } else {
      if (selectedChildren.length < max) {
        setSelectedChildren([...selectedChildren, child]);
      }
    }
  };

  // 🔹 Validation sélection → confirmation
  const confirmReservation = () => {
    setStep("confirm");
  };

  return (
    <div className="relative w-full h-screen md:flex md:flex-row">
      {/* === Carte === */}
      <div className="w-full md:w-2/3 h-full">
        {position && (
          <MapContainer center={position} zoom={11} className="h-full w-full z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={userIcon}>
              <Popup>Vous êtes ici 🧭</Popup>
            </Marker>

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

      {/* === Liste des crèches === */}
      <aside
        ref={asideRef}
        className={`
          md:static md:w-1/3 md:h-full md:overflow-y-auto md:bg-gray-50
          absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-2xl transition-all duration-500 ease-in-out
          ${isExpanded ? "max-h-[90vh]" : "max-h-[25vh]"}
          overflow-y-auto
        `}
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-2 mb-3"></div>

        <div className="px-4">
          <input
            type="text"
            placeholder="Rechercher une ville..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />
          <h2 className="text-lg font-semibold mb-3">
            Résultats ({filteredCreches.length})
          </h2>
        </div>

        <div className="space-y-4 px-4 pb-6">
          {filteredCreches.map((c) => (
            <div key={c.id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
              {c.image && <img src={c.image} alt={c.name} className="h-40 w-full object-cover" />}
              <div className="p-3 flex flex-col">
                <h3 className="font-semibold text-lg">{c.name}</h3>
                <p className="text-sm text-gray-600">{c.ville}</p>
                <p className="text-sm mt-1">
                  {c.placesDispo > 0 ? (
                    <span className="text-green-600 font-medium">
                      {c.placesDispo} places disponibles
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">Aucune place disponible</span>
                  )}
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white py-1.5 rounded-lg hover:bg-blue-600 transition">
                    Voir la crèche
                  </button>
                  <button
                    disabled={c.placesDispo === 0}
                    onClick={() => {
                      setSelectedCreche(c);
                      setStep("select");
                      setSelectedChildren([]);
                    }}
                    className={`flex-1 py-1.5 rounded-lg transition ${c.placesDispo === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* === MODALE DE SÉLECTION DES ENFANTS === */}
      {selectedCreche && step === "select" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 max-w-[90%] text-center">
            <h2 className="text-xl font-semibold mb-3">
              Réserver à {selectedCreche.name}
            </h2>
            <p className="text-gray-600 mb-4">
              Sélectionnez l’enfant à inscrire
              {selectedCreche.placesDispo > 1 && " (plusieurs choix possibles)"}
            </p>

            <div className="flex flex-col gap-2 mb-4">
              {childrenList.map((child) => (
                <label
                  key={child}
                  className={`border rounded-lg p-2 cursor-pointer ${selectedChildren.includes(child)
                      ? "bg-green-100 border-green-400"
                      : "bg-white"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedChildren.includes(child)}
                    disabled={
                      !selectedChildren.includes(child) &&
                      selectedChildren.length >= selectedCreche.placesDispo
                    }
                    onChange={() =>
                      toggleChild(child, selectedCreche.placesDispo)
                    }
                    className="mr-2"
                  />
                  {child}
                </label>
              ))}
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setSelectedCreche(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Annuler
              </button>
              <button
                disabled={selectedChildren.length === 0}
                onClick={confirmReservation}
                className={`px-4 py-2 rounded-lg text-white transition ${selectedChildren.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                  }`}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODALE DE CONFIRMATION === */}
      {selectedCreche && step === "confirm" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 max-w-[90%] text-center animate-fadeIn">
            <h2 className="text-xl font-semibold mb-3">
              Réservation confirmée 🎉
            </h2>
            <p className="text-gray-700 mb-2">
              Votre place est bien réservée à{" "}
              <span className="font-medium">{selectedCreche.name}</span> pour{" "}
              {selectedChildren.join(" et ")}.
            </p>
            <p className="text-gray-600 text-sm mb-4">
              Hâte de vous y voir ! Un mail de confirmation va vous être envoyé.
            </p>
            <button
              onClick={() => {
                setSelectedCreche(null);
                setStep(null);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




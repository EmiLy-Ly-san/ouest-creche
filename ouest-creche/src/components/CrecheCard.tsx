type Creche = {
  id: number;
  name: string;
  ville: string;
  horaire: string;
  placesDispo: number;
  image?: string;
  onReserve?: () => void;
  onNotify?: () => void;
};

export default function CrecheCard({
  name,
  placesDispo,
  image,
  ville,
  horaire,
  onReserve,
  onNotify,
}: Creche) {
  return (
    <div className="relative bg-[url('/bg-card.svg')] bg-cover bg-center p-3 rounded-md overflow-hidden shadow-[0_3px_10px_5px_rgba(0,0,0,0.25)]">
      {/* Bloc image principal */}
      <div className="relative">
        {image && (
          <img
            src={image}
            alt={name}
            className="h-40 w-full object-cover rounded-sm"
          />
        )}

        {/* Image de certification */}
        <img
          src="certif-creche.svg"
          alt="Certification Tribu"
          className="absolute bottom-27 left-70 md:left-93 w-12 h-auto rotate-10 drop-shadow-md"
        />
      </div>

      {/* Contenu principal */}
      <div className="p-3 pb-0.5 flex flex-col gap-1.5">
        {/* Ligne 1 : Nom + Note */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{name}</h3>

          {/* Bloc image + note */}
          <div className="relative flex items-center gap-1">
            {/* étoile */}
            <img
              src="star.svg"
              alt="Note"
              className="w-4 h-4 object-contain"
            />

            {/* texte de la note */}
            <span className="relative text-sm font-medium z-10">4.86</span>

            {/* highlight sous la note */}
            <img
              src="hightlight.svg"
              alt="Highlight"
              className="absolute left-5 top-1/2 -translate-y-1/2 z-0 w-8 h-5"
            />
          </div>
        </div>

        {/* Adresse complète */}
        <p className="text-sm text-gray-600">
          {ville}
        </p>

        {/* Ligne 2 : icônes + infos */}
        <div className="flex items-center justify-between text-sm mt-1">
          {/* Bloc gauche → berceau + nombre de places */}
          <div className="flex items-center gap-1">
            <img
              src="berceau.svg"
              alt="Places disponibles"
              className="w-4 h-4 object-contain"
            />
            <span className="text-gray-700">{placesDispo}</span>
          </div>

          {/* Bloc droit → calendrier + horaires */}
          <div className="flex items-center gap-1">
            <img
              src="calendar.svg"
              alt="Horaires"
              className="w-4 h-4 object-contain"
            />
            <span className="text-gray-700">{horaire}</span>
          </div>
        </div>

        {/* Boutons d’action */}
        <div className="mt-3 flex gap-2">
          {placesDispo > 0 ? (
            <button
              onClick={onReserve}
              className="flex-1 border border-[#202940] text-[#202940] py-1.5 rounded-lg hover:bg-[#202940] hover:text-white transition"
            >
              Réserver
            </button>
          ) : (
            <button
              onClick={onNotify}
              className="flex-1 border border-[#202940] text-[#202940] py-1.5 rounded-lg hover:bg-[#202940] hover:text-white transition"
            >
              Être notifié
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
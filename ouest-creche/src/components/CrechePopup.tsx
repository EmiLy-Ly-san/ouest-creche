type PopupProps = {
  name: string;
  ville: string;
  placesDispo: number;
  onClick?: () => void;
};

export default function CrechePopup({ name, ville, placesDispo, onClick }: PopupProps) {
  return (
    <div
      onClick={onClick}
      className="text-center cursor-pointer select-none leading-tight p-0.5"
    >
      <strong className="block text-xs font-semibold">{name}</strong>
      <p className="text-[11px] text-gray-700">{ville}</p>
      <p className="text-[11px] mt-0.5">
        {placesDispo > 0 ? (
          <span className="text-green-600 font-medium">
            {placesDispo} place{placesDispo > 1 ? "s" : ""} dispo
          </span>
        ) : (
          <span className="text-red-500 font-medium">Complet</span>
        )}
      </p>
      <p className="text-[9px] text-gray-400 mt-0.5 italic">
        (cliquez pour plus de détails)
      </p>
    </div>
  );
}
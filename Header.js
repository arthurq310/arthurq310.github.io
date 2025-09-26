import React from "react";

export default function Header({ onToggleLayout, layout, onBack, canGoBack }) {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {canGoBack && (
        <button className="px-3 py-1 rounded bg-blue-800" onClick={onBack}>
          Voltar
        </button>
      )}

      <h1 className="text-xl font-bold">Intranet React - JSONPlaceholder</h1>

      <button className="px-3 py-1 rounded bg-blue-800" onClick={onToggleLayout}>
        {layout === "grid" ? "Lista" : "Grade"}
      </button>
    </header>
  );
}

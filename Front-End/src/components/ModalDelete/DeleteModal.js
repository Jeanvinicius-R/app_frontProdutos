// src/components/ModalDelete/DeleteModal.js
import React from "react";
import "../../styles/ModalDelete.css"; // style inside styles or components folder

export default function DeleteModal({ categoria, confirmar, cancelar }) {
  if (!categoria) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Confirmar Exclusão</h3>
        <p>Deseja excluir <strong>{categoria.nome}</strong> ?</p>
        <div className="modal-actions">
          <button onClick={() => confirmar(categoria.id)} className="confirm">Sim</button>
          <button onClick={cancelar} className="cancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

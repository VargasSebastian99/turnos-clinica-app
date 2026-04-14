export default function Modal({ 
  Open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onCancel,
  onConfirm,
  onClose,
  children,
  formId 
}) {
  if (!Open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg min-w-[350px] relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>


        {/* Botón de cerrar (X) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Contenido del modal */}
        {children}

        {/* Footer con botones */}

        <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {confirmLabel}
            </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            {cancelLabel}
          </button>

        </div>
      </div>
    </div>
  );
}
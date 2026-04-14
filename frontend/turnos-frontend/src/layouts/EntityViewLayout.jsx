import { Outlet } from "react-router-dom"
export default function EntityLayout({
    title,
    tabs,
    activeTab,
    onTabChange,
    children,
    onEdit,
    onDelete,
    onBack
}){
    return(
        <div className="w-full px-6 space-y-6">
            {/* Tabs */}
            {tabs?.length > 0 && (
                <div className="flex gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={
                                activeTab === tab.id
                                ? "px-4 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-medium"
                                : "px-4 py-2 rounded-full border-2 border-gray-300 text-gray-600 font-medium hover:bg-gray-50"
                            }
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Titulo */}
            <h1 className="text-2xl font-semibold mt-4">{title}</h1>
            {/* Contenido dinámico */}
            <div className="bg-white p-6 rounded-lg shadow">
                {children}
            </div>
            {/* Acciones */}
            <div className="flex gap-2 pt-4">
                {onEdit && (
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"                    
                        onClick={onEdit}
                    >
                        Editar
                    </button>
                )}
                {onDelete && (
                    <button
                        className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                        onClick={onDelete}
                    >
                        Eliminar
                    </button>
                )}
                {onBack && (
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition"
                        onClick={onBack}
                    >
                        Volver
                    </button>
                )}
            </div>
        </div>
    );
}

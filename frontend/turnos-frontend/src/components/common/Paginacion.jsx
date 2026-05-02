export default function Pagination({ page, totalPages, onPageChange}){
    if (totalPages <= 1) return null;

    const pages = [];
    for(let i = 0; i < totalPages; i++){
        pages.push(i);
    }

    return(
        <div className="flex items-center justify-center mt-6">
            <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

                {/*botón anterior*/}
                 <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 0}
                    className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium rounded-l-md
                        ${page === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"}`}
                        
                    >Anterior</button>
                    {/*Números de página*/}
                    
                    {pages.map((p) => (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                                className={`px-3 py-2 border border-gray-300 text-sm font-medium 
                                ${p === page 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-white text-gray-700 hover:bg-gray-50"}`}
                        >
                            {p + 1}
                        </button>
                    ))}
                    {/* Botón Siguiente */}
                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={page + 1 >= totalPages}
                        className={`px-3 py-2 border border-gray-300 bg-white text-sm font-medium rounded-r-md 
                            ${page + 1 >= totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"}`}
                    >
                    Siguiente
                    </button>
            </nav>   
        </div>
    );
}
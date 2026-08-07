

export default function ModalConfirmarEliminar({ mostrar, onCerrar, onConfirmar }) {

    if(!mostrar) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center ">
            <div className=" bg-white rounded-lg p-8 w-96 bg-gradient-to-r from-orange-500 to-red-600 rounded">
                <h2 className="text-center mb-6 text-xl">¿Esta seguro de eliminar este insumo?</h2>
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        type="submit"
                        onClick={() => onConfirmar()}
                        className="cursor-pointer border-2 rounded pr-5 pl-5"
                    >
                        Si
                    </button>
                    <button type="button" onClick={onCerrar} className="cursor-pointer border-2 rounded pr-5 pl-5">
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}
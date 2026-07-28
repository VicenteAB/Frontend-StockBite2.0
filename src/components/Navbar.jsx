
export default function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-orange-500 to-red-600 flex justify-between items-center px-6 py-4 text-white font-bold">
            <h1>StockBite</h1>
            <div className="flex gap-6">
                <a className="text-white">Home</a>
                <a className="text-white">Local</a>
                <a className="text-white">Help</a>
            </div>
        </nav>
    )
}
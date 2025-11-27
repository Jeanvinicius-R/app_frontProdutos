import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <ul className="flex gap-6">
        <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
        <li><Link to="/categorias" className="hover:text-gray-200">Categorias</Link></li>
        <li><Link to="/produtos" className="hover:text-gray-200">Produtos</Link></li>
      </ul>
    </nav>
  );
}

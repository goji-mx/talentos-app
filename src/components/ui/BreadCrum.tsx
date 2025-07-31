// src/components/ui/Breadcrumb.tsx
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import UserDropdown from './UserDropdown';
import talentos from "../../assets/logos/talentos.png"

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onLogout: () => void
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onLogout }) => {
  return (
    <nav className="flex justify-between items-center py-4 px-6" aria-label="Breadcrumb">
      {/* Logo section */}
      <div className="flex items-center">
        <img src={talentos} alt="Talentos Logo" className="w-10 h-10" />
      </div>

      {/* Center title */}
      <div className="flex-1 text-center">
        <ol className="flex justify-center items-center">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link to={item.path}>
                {item.label}
              </Link>
              {index < items.length - 1 && <span className="mx-2 text-gray-500">/</span>}
            </li>
          ))}
        </ol>
      </div>

      {/* Right section with search and user */}
      <div className="flex items-center space-x-4">
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-64 px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* User profile */}
        <UserDropdown onLogout={onLogout} />
      </div>
    </nav>
  );
};

export default Breadcrumb;
import { useState } from 'react';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
    <header className="absolute top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">AI Task Spliter</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">History</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Settings</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Profile</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          MENU
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <a href="#" className="text-gray-700 hover:text-blue-600">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">History</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Settings</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Profile</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header
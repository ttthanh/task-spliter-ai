import { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';

function Header(props: any) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [username, setUsername] = useState<string>('User');

    useEffect(() => {
        const getUserAttributes = async () => {
          try {
            const user = await fetchUserAttributes();;
            setUsername(user.preferred_username || user.email || 'User');
          } catch (error) {
            console.error('Error fetching user attributes:', error);
            return {};
          }
        }
        getUserAttributes();
      }, []);

    return (
    <header className="absolute top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">AI Task Spliter</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600 pt-3">Hello {username}</a>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300" onClick={props.signOutEvent}>Sign out</button>
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
            <a href="#" className="text-gray-700 hover:text-blue-600">Hello {username}</a>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300" onClick={props.signOutEvent}>
                Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header
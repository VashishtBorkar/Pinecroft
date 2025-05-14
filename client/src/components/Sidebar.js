import { HomeIcon, UsersIcon, ArrowTrendingUpIcon, WalletIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; 

function Sidebar() {
  return (
    <aside className="w-64 flex-none h-full bg-main-bg border-r border-border-color text-text-color p-4 ">
      <nav className="flex flex-col gap-4 border-r-gray-500 w-full">
        <Link to="/home" className="btn-custom hover-custom">
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>

        <Link to="/communities" className="btn-custom hover-custom">
          <UsersIcon className="h-5 w-5" />
          Communities
        </Link>

        <Link to="/following" className="btn-custom hover-custom">
          <ArrowTrendingUpIcon className="h-5 w-5" />
          Following
        </Link>

        <Link to="/wallet" className="btn-custom hover-custom">
          <WalletIcon className="h-5 w-5" />
          My Wallet
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;


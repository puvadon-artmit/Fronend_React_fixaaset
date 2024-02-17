import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';
export default function Logout() {

    const navigate = useNavigate();

    const handleLogout = () => {

        Cookies.remove('token');
        navigate('/');
    };
    return (
        <div>
            <div>
                <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleLogout}>ออกจากระบบ</button>
            </div>
        </div>
    )
}
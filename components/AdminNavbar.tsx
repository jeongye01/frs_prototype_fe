import { useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Dispatch, SetStateAction } from 'react';
interface Props {
  showSidebar: string;
  setShowSidebar: Dispatch<SetStateAction<string>>;
}
export default function AdminNavbar({ showSidebar, setShowSidebar }: Props) {
  //const location = useLocation().pathname;

  return (
    <nav className="bg-light-blue-500 md:ml-64 py-6 px-3">
      <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
        <div className="md:hidden">
          <Button size="lg">123</Button>
          <div
            className={`absolute top-2 md:hidden ${
              showSidebar === 'left-0' ? 'left-64' : '-left-64'
            } z-50 transition-all duration-300`}
          >
            <Button size="lg">456</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// DashboardLayout.jsx
import 'primeicons/primeicons.css';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import './DashboardLayout.css';

const DashboardLayout = ({ children }:any) => {
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
    },
    // Add more menu items as needed
  ];

  return (
    <div>
      <Menubar model={items} />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
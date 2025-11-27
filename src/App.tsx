import { AdminLayout } from './layouts/AdminLayout';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';

function App() {
  return (
    <AdminLayout>
      <DashboardPage />
    </AdminLayout>
  );
}

export default App;

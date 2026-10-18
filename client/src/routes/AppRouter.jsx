import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AdminLayout from '../components/layout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Tentang from '../pages/Tentang';
import Paket from '../pages/Paket';
import DetailPaket from '../pages/DetailPaket';
import Galeri from '../pages/Galeri';
import Testimoni from '../pages/Testimoni';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/admin/Dashboard';
import KelolaPaket from '../pages/admin/KelolaPaket';
import KelolaGaleri from '../pages/admin/KelolaGaleri';
import KelolaTestimoni from '../pages/admin/KelolaTestimoni';
import KelolaKontak from '../pages/admin/KelolaKontak';
import RekapPermintaan from '../pages/admin/RekapPermintaan';

function PublikLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublikLayout><Home /></PublikLayout>} />
        <Route path="/tentang" element={<PublikLayout><Tentang /></PublikLayout>} />
        <Route path="/paket" element={<PublikLayout><Paket /></PublikLayout>} />
        <Route path="/paket/:slug" element={<PublikLayout><DetailPaket /></PublikLayout>} />
        <Route path="/galeri" element={<PublikLayout><Galeri /></PublikLayout>} />
        <Route path="/testimoni" element={<PublikLayout><Testimoni /></PublikLayout>} />
        <Route path="/login" element={<PublikLayout><Login /></PublikLayout>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="paket" element={<KelolaPaket />} />
          <Route path="galeri" element={<KelolaGaleri />} />
          <Route path="testimoni" element={<KelolaTestimoni />} />
          <Route path="kontak" element={<KelolaKontak />} />
          <Route path="permintaan" element={<RekapPermintaan />} />
        </Route>
        <Route path="*" element={<PublikLayout><NotFound /></PublikLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

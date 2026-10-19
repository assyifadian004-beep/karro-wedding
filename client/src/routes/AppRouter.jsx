import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PublikLayout() {
  return (
    <>
      <Header />
      <main id="konten">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublikLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/paket" element={<Paket />} />
          <Route path="/paket/:slug" element={<DetailPaket />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
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
      </Routes>
    </BrowserRouter>
  );
}

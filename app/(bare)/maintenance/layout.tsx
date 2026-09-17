export default function MaintenanceLayout({
  children,
}: { children: React.ReactNode }) {
  // Navbar/Footer yok; içeriği ortalıyoruz (html/body kök düzende)
  return (
    <main className="flex-1 flex items-center justify-center">
      {children}
    </main>
  );
}

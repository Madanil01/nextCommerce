import Navbar from "@/components/admin/NavbarComponent";

export default function AdminLayout({children}: {children: React.ReactNode;}) {
    return (
        <section>
        <Navbar/>
        <div className="container mx-auto">{children}</div>
      </section>
    );
}

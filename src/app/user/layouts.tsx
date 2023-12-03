import Navbar from "@/components/user/NavbarComponent";

export default function UserLayout({children}: {children: React.ReactNode;}) {
    return (
      <section>
        <Navbar/>
        <div className="container mx-auto">{children}</div>
      </section>
    );
}

import Footer from "@/components/sharePage/Footer";
import Navbar from "@/components/sharePage/Navbar";
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="min-h-screen">{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default layout;

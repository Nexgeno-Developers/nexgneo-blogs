import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;

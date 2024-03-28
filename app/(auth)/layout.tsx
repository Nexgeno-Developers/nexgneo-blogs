export const metadata = {
  title: "Authentication",
  description:
    "Offshore Software Development & IT Consulting Company in mumbai india",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex items-center justify-center h-[100vh]">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;

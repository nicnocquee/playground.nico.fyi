import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="min-h-[calc(100vh-100px)]">{children}</div>
      <Footer />
    </div>
  );
}

import Tabs from "./tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-stretch justify-start space-y-2 text-center p-4 w-full">
      <Tabs />
      {children}
    </div>
  );
}

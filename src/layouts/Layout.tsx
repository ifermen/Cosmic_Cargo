import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { type ReactNode } from "react";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

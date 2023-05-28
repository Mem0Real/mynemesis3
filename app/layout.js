import Navbar from "./components/navigation/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  fallback: ["system-ui", "arial"],
});

export const metadata = {
  title: "My Nemesis 3.0",
  description: "Full Stack page for viewing different ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex flex-col overflow-x-hidden no-scrollbar overflow-y-auto overscroll-y-none bg-neutral-100 min-h-screen h-fit">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}

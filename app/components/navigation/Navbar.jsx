import Image from "next/image";
import Logo from "@/public/images/nemesisLogo.jpg";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  fallback: ["system-ui", "arial"],
});
export const Navbar = () => {
  return (
    <nav className="w-full h-20 shadow-xl bg-neutral-900 text-white navbar">
      <div className="flex justify-between items-center w-full h-full px-8 2xl:px-16 text-sm">
        <Link href="/">
          <div className="flex justify-evenly items-center">
            <Image
              src={Logo}
              alt="logo"
              width="55"
              height="auto"
              className="cursor-pointer rounded-full"
              priority
            />
            <h1 className="lg:px-12 md:px-6 text-xl uppercase font-medium">
              Nemesis
            </h1>
          </div>
        </Link>
        <div>
          <ul className="hidden sm:flex">
            <Link href="/collection">
              <li className="ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
                Collection
              </li>
            </Link>
            <Link href="/services">
              <li className="ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
                Services
              </li>
            </Link>
            <Link href="/about">
              <li className="ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
                About
              </li>
            </Link>
            <Link href="/admin">
              <li className="ml-10 hover:border-b border-white border-spacing-y-2 py-3 font-medium">
                Admin
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

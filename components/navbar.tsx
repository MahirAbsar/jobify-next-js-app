import { UserButton } from "@clerk/nextjs";
import LinksDropdown from "./linksDropdown";
import ThemeToggle from "./themeToggle";

const Navbar = () => {
  return (
    <nav className="py-8 px-4 sm:px-16 lg:px-24 bg-muted flex items-center justify-between">
      <div className="lg:hidden">
        <LinksDropdown />
      </div>
      <div className="flex items-center gap-x-2 lg:ml-auto">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};
export default Navbar;

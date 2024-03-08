"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo.svg";
import { links } from "@/utils/links";
import Link from "next/link";
import { Button } from "./ui/button";

const Sidebar = () => {
  const path = usePathname();
  return (
    <aside className="py-8 px-8 bg-muted h-full">
      <Image src={Logo} alt="jobify logo" className="mx-auto" />
      <div className="flex flex-col gap-y-6 mt-20">
        {links.map((link) => {
          return (
            <Button asChild variant={path === link.href ? "default" : "link"} key={link.href}>
              <Link href={link.href} className="flex gap-x-2 items-center">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
};
export default Sidebar;

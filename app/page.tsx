import Image from "next/image";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.svg";
import LandingImg from "@/assets/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-8 md:px-4 py-6">
        <Image src={Logo} alt="jobify img" />
        <section className="max-w-6xl mx-auto  -mt-20 grid lg:grid-cols-[1fr,400px] items-center h-screen">
          <div>
            <h1 className="capitalize font-bold text-4xl md:text-7xl">
              job <span className="text-primary">tracking</span> app
            </h1>
            <p className="leading-loose max-w-md mt-4">
              I am baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
              narwhal.
            </p>
            <Button asChild className="mt-4">
              <Link href="/add-job">Get Started</Link>
            </Button>
          </div>
          <Image
            src={LandingImg}
            alt="Landing image"
            className="hidden lg:block"
          />
        </section>
      </header>
    </main>
  );
}

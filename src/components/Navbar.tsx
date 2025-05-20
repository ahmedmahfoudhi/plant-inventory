import { House, LogIn, Sprout } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import ModeToggle from "./ModeToggle";
import { UserButton } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
// import { getUserDetails } from "@/actions/user.actions";
async function Navbar() {
  const user = await stackServerApp.getUser();
  // const userProfile = await getUserDetails(user?.id);
  const app = stackServerApp.urls;
  return (
    <nav className=" sticky top-0 z-10 border-b w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="max-w-7xl mx-auto px-4 flex  items-center justify-between h-16">
        <div className="flex items-center gap-3 text-2xl">
          <Link href="/" className="font-mono font-bold tracking-wider">
            🌱 PlantInventory{" "}
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/plants">
              <Sprout className="w-4 h-4" />
              <span className="hidden lg:inline">Plants</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/">
              <House className="w-4 h-4" />
              <span className="hidden lg:inline">Home</span>
            </Link>
          </Button>
          <ModeToggle />
          {user ? (
            <UserButton />
          ) : (
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href={app.signIn}>
                <LogIn className="w-4 h-4" />
                <span className="hidden lg:inline">Login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

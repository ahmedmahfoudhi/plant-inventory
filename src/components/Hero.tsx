import React from "react";
import logo from "./../../public/logo.png";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
function Hero() {
  return (
    <div className="flex items-center flex-wrap-reverse w-[100%]">
      <div className="flex flex-col gap-8 w-[50%] max-lg:w-[100%]">
        <h1 className="text-4xl font-bold">
          Discover Your Perfect Plant Inventory Today
        </h1>
        <p className="text-lg font-light text-gray-400">
          Welcome to your ultimate plant inventory solution! <br />
          Explore our diverse collection and find the perfect plants for your
          home or garden.
        </p>
        <div className="flex gap-5">
          <Button asChild>
            <Link href="/plants">Explore</Link>
          </Button>
          <Button variant="outline">Favorites</Button>
        </div>
      </div>
      <div className="flex justify-center max-lg:hidden xl:w-[50%]">
        <Image
          src={logo}
          height={500}
          width={400}
          alt="logo"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}

export default Hero;

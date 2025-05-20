import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { stackServerApp } from "@/stack";

async function CallToActionSection() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  return (
    <section className="flex flex-col gap-7 py-7">
      <h2 className="text-xl font-semibold">Start Your Plant Journey Today</h2>
      <p className="text-sm">
        Join us now to effortlessly manage and explore your plant inventory with
        ease and joy.
      </p>
      <div className="flex gap-3">
        {user ? (
          <Button asChild>
            <Link href="/plants">Discover</Link>
          </Button>
        ) : (
          <>
            <Button asChild>
              <Link href={app.signUp}>Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={app.signIn}>Login</Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
}

export default CallToActionSection;

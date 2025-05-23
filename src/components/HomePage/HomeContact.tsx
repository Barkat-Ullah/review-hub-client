import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const HomeContact = () => {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex justify-center">
        <div className="rounded-lg border bg-primary p-6 shadow-sm">
          <h3 className="text-xl font-bold">Still have questions?</h3>
          <p className="mt-2 ">
            Our support team is here to help. Contact us and we&apos;ll get back
            to you as soon as possible.
          </p>
          <Link href="/contact">
            <Button className="mt-4">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;

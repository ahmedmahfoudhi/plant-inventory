import React from "react";
import ExploreCard from "./ExploreCard";

const exploreContent = [
  {
    title: "Seamless Plant Search And Discovery",
    description: "Quickly search for plants by name and category",
  },
  {
    title: "Efficient Inventory Management Tools",
    description: "Keep track of stock levels and pricing effortlessly.",
  },
  {
    title: "Personalized User Profiles for Enhanced Experience",
    description: "Manage your information and favorite plants easily.",
  },
];

function ExploreSection() {
  return (
    <section className="flex flex-col px-[-4]">
      <p className="text-center text-sm">Explore</p>
      <h1 className="font-semibold text-xl text-center mt-5">
        Your perfect inventory solution
      </h1>
      <p className="text-sm text-center mt-3">
        Our platform empowers you to effortlessly manage your plant collection.
        With intuitive features, finding and organizing your plants has never
        been easier.
      </p>
      <div className="grid md:grid-cols-3 mt-8 gap-4 ">
        {exploreContent.map(({ title, description }, index) => (
          <ExploreCard title={title} description={description} key={index} />
        ))}
      </div>
    </section>
  );
}

export default ExploreSection;

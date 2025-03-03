import Hero from "@/components/hero.jsx";
import {
    Card,
    PageContainer,
    PrimaryButton,
    Section,
    SectionHeader,
} from "@/theme/theme.jsx";

import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/services");
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <PageContainer>
      
      <Section className="min-h-[70vh] flex items-center justify-center bg-gray-100">
        <Hero />
      </Section>

      <Section className="relative overflow-hidden bg-white">
        <SectionHeader
          title="Our Premium Services"
          subtitle="Indulge in laundry solutions crafted with elegance and precision"
          className="animate-fadeIn"
        />
        {loading ? (
          <p className="text-xl text-center text-teal-600 animate-pulse font-medium">
            Loading services...
          </p>
        ) : error ? (
          <p className="text-red-500 text-center text-lg font-medium py-8">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card
                key={service._id}
                image={
                  service.image
                    ? `http://localhost:3000${service.image}`
                    : "https://via.placeholder.com/400"
                }
                title={service.title}
                description={service.description || "No description available."}
                price={service.price}
                buttonText="Discover More"
                buttonLink={`/service/${service._id}`}
                className="shadow-md hover:shadow-lg"
              />
            ))}
          </div>
        )}
      </Section>

      <Section className="relative overflow-hidden bg-white py-16">
  <div className="container mx-auto max-w-7xl px-6">
    <SectionHeader
      title="About Us"
      subtitle="Discover the passion and precision behind our laundry expertise"
      className="animate-fadeIn"
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Side - Text Content */}
      <div className="text-center lg:text-left animate-fadeIn">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          Who We Are
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
          We bring sophistication and innovation to laundry care. With a commitment to excellence, we transform everyday tasks into extraordinary experiences tailored just for you.
        </p>
        <PrimaryButton className="px-6 py-3 text-lg rounded-lg shadow-md hover:shadow-lg">
          Explore Our Story
        </PrimaryButton>
      </div>

      {/* Right Side - Image */}
      <div className="relative animate-fadeIn delay-300 lg:order-2">
        <div className="relative w-full max-w-md mx-auto lg:max-w-lg">
          <div className="absolute -inset-4 bg-teal-200 opacity-20 blur-xl rounded-2xl -z-10" />
          <img
            src="src/assets/images/automated_laundry.avif"
            className="rounded-2xl shadow-lg w-full object-cover transform hover:scale-105 transition-transform duration-500 border border-slate-100"
            alt="Automated Laundry"
          />
        </div>
      </div>
    </div>

    {/* Statistics Section */}
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
      {[
        { value: "10+", label: "Successful Transactions" },
        { value: "2024", label: "Year Established" },
        { value: "10+", label: "Delighted Clients" },
      ].map((stat, index) => (
        <div
          key={index}
          className={`p-6 bg-white rounded-xl shadow-md border border-slate-200 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg`}
        >
          <h3 className="text-3xl font-bold text-teal-500">{stat.value}</h3>
          <p className="text-gray-600 text-sm mt-2 font-medium">{stat.label}</p>
        </div>
      ))}
    </div>

  </div>
</Section>


    </PageContainer>
  );
};

export default HomePage;

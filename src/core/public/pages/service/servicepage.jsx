import { Card, PageContainer, PrimaryButton, Section, SectionHeader } from "@/theme/theme.jsx";
import React, { useEffect, useState } from "react";

const ServicePage = () => {
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
    <PageContainer bgColor="bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <Section className="relative overflow-hidden py-24 px-6 lg:px-12">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.15),transparent_70%)] -z-10" />
        <div className="absolute top-0 left-10 w-96 h-96 bg-teal-100 opacity-15 rounded-full filter blur-3xl -z-10" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-indigo-100 opacity-15 rounded-full filter blur-3xl -z-10" />

        {/* Header */}
        <SectionHeader
          title="Our Premium Services"
          subtitle="Indulge in laundry solutions crafted with elegance, precision, and care"
          className="mb-16 text-center"
        />

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16 bg-white/90 rounded-2xl shadow-xl max-w-md mx-auto">
            <div className="inline-block w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xl text-teal-700 font-semibold">
              Loading your services...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white/90 rounded-2xl shadow-xl max-w-md mx-auto">
            <p className="text-rose-600 text-xl font-semibold mb-6">
              Oops! {error}
            </p>
            <PrimaryButton
              onClick={() => window.location.reload()}
              className="px-8 py-3 text-lg font-semibold bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition-colors duration-300"
            >
              Try Again
            </PrimaryButton>
          </div>
        ) : (
          /* Services Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, index) => (
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
                className="relative bg-white rounded-2xl shadow-xl border border-teal-100/50 hover:shadow-2xl hover:border-teal-200 transition-all duration-300"
              >
                {/* Badge */}
                {index === 0 && (
                  <span className="absolute -top-4 -right-4 bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                    Top Choice
                  </span>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Call-to-Action */}
        {!loading && !error && (
          <div className="text-center mt-16">
            <PrimaryButton className="px-10 py-4 text-xl font-semibold bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg shadow-xl hover:shadow-2xl transition-colors duration-300">
              Request a Custom Plan
            </PrimaryButton>
          </div>
        )}
      </Section>
    </PageContainer>
  );
};

export default ServicePage;
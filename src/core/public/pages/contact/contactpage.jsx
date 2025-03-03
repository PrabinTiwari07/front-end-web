import Navbar from "@/components/Navbar";
import { PrimaryButton, SecondaryButton } from "@/theme/theme.jsx";
import React from "react";

const ContactPage = () => {
  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-b from-slate-50 via-white to-teal-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.15),transparent_70%)] -z-10" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-100 opacity-10 rounded-full filter blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 opacity-10 rounded-full filter blur-3xl -z-10 animate-pulse delay-700" />

        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left animate-fadeIn space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-800 bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500 tracking-tight">
                Let's Connect
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-6 max-w-md mx-auto lg:mx-0 font-light">
                Have questions or need assistance? Our dedicated team is here to provide exceptional support. Reach out today!
              </p>
              <div className="relative flex justify-center lg:justify-start">
                <div className="w-48 sm:w-56 lg:w-72 xl:w-80 transform hover:scale-105 transition-transform duration-500">
                  <div className="absolute -inset-4 bg-teal-200 opacity-20 blur-2xl rounded-full -z-10 animate-pulse" />
                  <img />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <PrimaryButton className="w-full sm:w-auto px-8 py-3 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  Chat with Us
                </PrimaryButton>
                <SecondaryButton className="w-full sm:w-auto px-8 py-3 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  Call Support
                </SecondaryButton>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-lg mx-auto lg:max-w-xl xl:max-w-2xl animate-fadeIn delay-300 border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-slate-50 hover:bg-white shadow-sm placeholder-slate-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder=""
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-slate-50 hover:bg-white shadow-sm placeholder-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder=""
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-slate-50 hover:bg-white shadow-sm placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-slate-50 hover:bg-white shadow-sm placeholder-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Interested In</label>
                  <select
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-slate-50 hover:bg-white shadow-sm appearance-none text-slate-600"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Iron">Iron</option>
                    <option value="Shoe Cleaning">Shoe Cleaning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                  <textarea
                    placeholder="Tell us how we can assist you..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 bg-slate-50 hover:bg-white shadow-sm resize-y min-h-[120px] placeholder-slate-400"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <PrimaryButton
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
                  >
                    Send Message
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;

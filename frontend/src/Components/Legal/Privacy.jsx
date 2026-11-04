import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import logo from "../../images/logo2.svg";

function Privacy() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] dark:bg-[#0b0f19] text-gray-800 dark:text-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#151c2c] rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-[#1e293b]">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100 dark:border-[#1e293b]">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Al Taalim" className="h-8" />
            <h1 className="text-2xl font-bold">Al Taalim Privacy Policy</h1>
          </div>
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <FiArrowLeft /> Back to Login
          </Link>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when creating an account, such as your name, email address, profile photo, and academic preferences. We also record course completion, test scores, and attendance data to facilitate your learning progress.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2. How We Use Information</h2>
            <p>
              Your data is used to provide educational services, personalize course recommendations, track assignment deadlines, and generate official certificates of completion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">3. Data Protection & Security</h2>
            <p>
              We employ industry-standard encryption protocols (including HTTPS/TLS and BCrypt hashing) to safeguard your personal credentials and educational records against unauthorized disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">4. Sharing with Third Parties</h2>
            <p>
              Al Taalim does not sell or lease your personal information. Data is only shared with designated course instructors or institutional administrators directly responsible for your academic curriculum.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">5. Your Privacy Rights</h2>
            <p>
              You have the right to access, update, or request the deletion of your personal account data at any time through your Profile Settings or by contacting our support team.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-[#1e293b] text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Al Taalim (التعليم). All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Privacy;

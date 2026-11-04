import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import logo from "../../images/logo2.svg";

function Terms() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] dark:bg-[#0b0f19] text-gray-800 dark:text-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#151c2c] rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-[#1e293b]">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100 dark:border-[#1e293b]">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Al Taalim" className="h-8" />
            <h1 className="text-2xl font-bold">Al Taalim Terms of Service</h1>
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
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Al Taalim (التعليم) educational platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2. Educational Services</h2>
            <p>
              Al Taalim provides online educational courses, class management, learning materials, and academic tools. Access to certain content may require active enrollment or specific permissions granted by an institution or instructor.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">3. User Conduct and Responsibilities</h2>
            <p>
              Students and instructors must maintain academic integrity. Plagiarism, disruptive behavior in discussions, or unauthorized distribution of course materials will result in immediate suspension or termination of access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">4. Account Security</h2>
            <p>
              You are responsible for safeguarding your login credentials. Notify Al Taalim support immediately if you suspect unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">5. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of Al Taalim following any updates constitutes acceptance of the revised terms.
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

export default Terms;

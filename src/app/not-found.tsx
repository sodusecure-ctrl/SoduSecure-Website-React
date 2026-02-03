"use client";


import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Error404() {
  return (
    <div className=" flex flex-col">
      {/* Header */}
      <header className="bg-[#00715D] h-[300px] flex items-center py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 mb-4 hover:bg-gray-800 transition-colors">
            Start Donating Poor People 🌱
          </button>
          <h1 className="text-white text-4xl font-bold">Error 404</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 flex items-center justify-center px-4 pb-16">
        <div className="max-w-md w-full text-center">
          {/* UFO Illustration */}
          <div className="mb-8 relative">
            <svg
              className="mx-auto"
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cloud/Smoke effect behind 404 */}
              <ellipse cx="100" cy="140" rx="60" ry="25" fill="#D1E9F6" opacity="0.6" />

              {/* 404 Text */}
              <text x="60" y="150" fill="#B8E0D2" fontSize="48" fontWeight="bold" fontFamily="system-ui">
                4
              </text>
              <text x="105" y="150" fill="#A8D5BA" fontSize="48" fontWeight="bold" fontFamily="system-ui">
                0
              </text>
              <text x="145" y="150" fill="#D1E9F6" fontSize="48" fontWeight="bold" fontFamily="system-ui">
                4
              </text>

              {/* UFO Body */}
              <ellipse cx="100" cy="85" rx="50" ry="15" fill="#E8F4F8" />
              <ellipse cx="100" cy="85" rx="45" ry="12" fill="#F0F8FF" />

              {/* UFO Dome */}
              <ellipse cx="100" cy="70" rx="25" ry="20" fill="#3B82F6" />
              <ellipse cx="100" cy="68" rx="20" ry="15" fill="#60A5FA" opacity="0.6" />

              {/* Exclamation mark on dome */}
              <rect x="98" y="60" width="4" height="12" rx="2" fill="white" />
              <circle cx="100" cy="76" r="2" fill="white" />

              {/* UFO Windows/Lights */}
              <circle cx="75" cy="85" r="4" fill="#1E293B" />
              <circle cx="90" cy="85" r="4" fill="#1E293B" />
              <circle cx="110" cy="85" r="4" fill="#1E293B" />
              <circle cx="125" cy="85" r="4" fill="#1E293B" />

              {/* Light beam lines (left) */}
              <line x1="60" y1="95" x2="55" y2="110" stroke="#E5E7EB" strokeWidth="2" />
              <line x1="70" y1="95" x2="67" y2="110" stroke="#E5E7EB" strokeWidth="2" />

              {/* Light beam lines (right) */}
              <line x1="140" y1="95" x2="145" y2="110" stroke="#E5E7EB" strokeWidth="2" />
              <line x1="130" y1="95" x2="133" y2="110" stroke="#E5E7EB" strokeWidth="2" />

              {/* Motion lines (left side) */}
              <line x1="45" y1="75" x2="35" y2="70" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="40" y1="85" x2="30" y2="85" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

              {/* Motion lines (right side) */}
              <line x1="155" y1="75" x2="165" y2="70" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
              <line x1="160" y1="85" x2="170" y2="85" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

              {/* Small sparkle effects */}
              <circle cx="135" cy="60" r="2" fill="#CBD5E1" />
              <circle cx="65" cy="60" r="2" fill="#CBD5E1" />
            </svg>
          </div>

          {/* Error Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Whoops! This Page got
          </h2>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Lost in conversion
          </h2>

          <p className="text-gray-600 text-sm mb-8 px-4">
            It looks like nothing was found at this location. Maybe try one of the links below or a search?
          </p>

          {/* Back to Home Button */}
          <Button
            className="bg-primary w-5/12 text-gray-900 font-medium px-6 py-3 rounded-md shadow-md transition-colors"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
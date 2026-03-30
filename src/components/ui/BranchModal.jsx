import React from "react";

const BranchModal = ({ branch, onClose }) => {
  if (!branch) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full z-20 text-xl"
      >
        ✕
      </button>
      {/* FULL SCREEN MODAL */}
      <div className="bg-white w-full h-full md:w-[50%] md:h-[80%] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col">
        {/* MAIN CONTENT */}
        <div className="flex flex-col h-full p-8 gap-8">
          {/* FIRST ROW: Branch Details + Owner Image */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Branch Details */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-blue-600 mb-2">
                {branch.name}
              </h2>
              <p className="text-gray-600 text-lg mb-4">{branch.place}</p>
              <p className="text-gray-500 leading-relaxed">
                {branch.description}
              </p>
            </div>

            {/* Right Column: Owner Image */}
            <div className="flex justify-center md:justify-end items-start">
              <div className="w-48 aspect-[3/4] rounded-xl overflow-hidden shadow-lg border">
                <img
                  src={branch.ownerImg || "/image/default-user.png"}
                  alt="Owner"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* SECOND ROW: Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">Benefits</h4>
              <p>✔ Trusted Service</p>
              <p>✔ Fast Delivery</p>
              <p>✔ Customer Support</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">Location</h4>
              <p>{branch.place}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">Contact</h4>
              <p>{branch.mobile}</p>
              <p>{branch.email}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">Open Hours</h4>
              <p>Mon - Fri</p>
              <p>9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchModal;

import React from "react";

const BranchModal = ({ branch, onClose }) => {
  if (!branch) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center">

      {/* FULL HEIGHT MODAL */}
      <div className="bg-white w-[95%] md:w-[900px] h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full z-10"
        >
          ✕
        </button>

        {/* TOP SECTION */}
        <div className="grid grid-cols-3 gap-6 p-6 items-center">

          {/* LEFT CONTENT */}
          <div className="col-span-2">
            <h2 className="text-3xl font-bold text-blue-600">
              {branch.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {branch.place}
            </p>

            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
             {branch.description}
            </p>
          </div>

          {/* RIGHT OWNER IMAGE (3:4 RATIO) */}
          <div className="flex justify-end">
            <div className="w-40 aspect-[3/4] rounded-xl overflow-hidden shadow-lg border">
              <img
                src={branch.ownerImg || "/image/default-user.png"}
                alt="Owner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t"></div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {/* BENEFITS */}
            <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">
                Benefits
              </h4>
              <p>✔ Trusted Service</p>
              <p>✔ Fast Delivery</p>
              <p>✔ Customer Support</p>
            </div>

            {/* LOCATION */}
            <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">
                Location
              </h4>
              <p>{branch.place}</p>
            </div>

            {/* CONTACT */}
            <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">
                Contact
              </h4>
              <p>{branch.mobile}</p>
              <p>{branch.email}</p>
            </div>

            {/* OPEN HOURS */}
            <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">
                Open Hours
              </h4>
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
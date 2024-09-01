import { StoreIcon } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 text-center">
      {/* <h3 className="mb-10 text-2xl font-semibold tracking-tight">SOL STORE</h3> */}

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        SOL STORE
      </h1>

      <p className="leading-7 [&:not(:first-child)]:mt-1">
        We only accept payments in SOL.
      </p>

      <div className="mt-8">
        {/* <Booking
          onNewBooking={handleNewBooking}
          allBookings={bookings}
          roomData={roomData}
          roomCostData={roomCostData}
        /> */}
      </div>
      <div className="">
        {/* <Table
          refreshKey={refreshTableKey}
          bookings={bookings}
          roomData={roomData}
          onEditBooking={handleEditBooking}
          roomCostData={roomCostData}
        /> */}
      </div>
    </div>
  );
}

export default Header;

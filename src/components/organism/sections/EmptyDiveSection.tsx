"use client";

import React from "react";

export default function EmptyDiveSection() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* 
        This section is intentionally empty. 
        The BlackHole component will scale up to 7x in the background 
        while this section is active.
      */}
    </div>
  );
}
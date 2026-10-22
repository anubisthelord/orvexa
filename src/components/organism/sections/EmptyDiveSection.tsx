"use client";


export default function EmptyDiveSection() {
  return (
    <div className="absolute inset-0 w-full h-[12vh] pointer-events-none">
      {/* 
        Intentionally empty. This gives the BlackHole space to 
        scale up completely without text overlapping it.
      */}
    </div>
  );
}
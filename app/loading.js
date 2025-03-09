export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center relative bg-white">
      <div className="absolute w-16 h-16 bg-purple-600 rounded-full animate-[mid_1s_linear_infinite]" />

      <div className="absolute w-24 h-24 border-4 border-t-purple-600 border-b-purple-600 rounded-full animate-[spin_1.5s_linear_infinite] animate-delay-[0.1s]" />

      <div className="absolute w-28 h-28 border-4 border-t-purple-600 border-b-purple-600 rounded-full animate-[spin_1.5s_linear_infinite] animate-delay-[0.2s]" />

      <div className="absolute w-32 h-32 border-4 border-t-purple-600 border-b-purple-600 rounded-full animate-[spin_1.5s_linear_infinite] animate-delay-[0.3s]" />

      <div className="absolute w-36 h-36 border-4 border-t-purple-600 border-b-purple-600 rounded-full animate-[spin_1.5s_linear_infinite] animate-delay-[0.4s]" />
    </div>
  );
}

import { Category } from "./modules/constant/Category";
import { HeroSection } from "./modules/constant/HeroSection";
import { PopularTools } from "./modules/constant/Polulartools";
import ContactUs from "./modules/tools/ContactUs";

export default function Home() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <PopularTools />
      <Category />
      <ContactUs />
    </div>
  );
}

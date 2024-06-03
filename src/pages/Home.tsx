import HeroSection from "@/components/home/HeroSection";
import PromotionalSection from "@/components/home/PromotionalSection";
import MainContentSection from "@/components/home/MainContentSection";
import AlphaPackSection from "@/components/home/AlphaPackSection";
import MarketplaceSection from "@/components/home/MarketplaceSection";
import NFTCardsList from "@/components/NFTCardsList";
import PropheciesSection from "@/components/home/PropheciesSection";
import SubscribeSection from "@/components/home/SubscribeSection";
import FooterSection from "@/components/home/FooterSection";

const Home = () => {
  return (
    <div className="grid">
      <HeroSection />
      <PromotionalSection />
      <MainContentSection />
      <AlphaPackSection />
      <MarketplaceSection />
      <div className="mt-60">
        <NFTCardsList />
      </div>
      <PropheciesSection />
      <SubscribeSection />
      <FooterSection />
    </div>
  );
};

export default Home;

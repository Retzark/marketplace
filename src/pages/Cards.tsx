import { useParams, Navigate } from "react-router-dom";
import CollectionCardsList from "@/components/CollectionCardsList";
import useUserStore from "@/store/userStore";

const Cards = () => {
  const { username } = useParams<{ username: string }>();
  const user = useUserStore((state) => state.user);

  if (!user || user.username !== username) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="row">
        <div
          className="relative flex justify-center text-white text-center bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/marketplace-hero.webp')`,
            height: "70vh",
          }}
        >
          <div
            className="text-5xl sm:text-6xl md:text-8xl text-white items-center justify-center mt-24 sm:mt-32 md:mt-48"
            style={{ fontFamily: '"CCElephantmenTall Regular"' }}
          >
            Collections
          </div>
        </div>
      </div>

      <CollectionCardsList username={username} />
    </div>
  );
};

export default Cards;

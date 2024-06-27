import React, { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import Cookies from "js-cookie";

interface Affiliate {
  id: string;
  name: string;
  avatar: string;
}

interface UserProfile {
  avatar: string;
  username: string;
  email: string;
  bio: string;
  affiliates: Affiliate[];
}

const ProfilePage: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [affiliateLink, setAffiliateLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        try {
          // Dummy user data
          const userData = {
            username: user.username,
            email: "john.doe@example.com",
            bio: "Hive Developer",
            affiliates: [
              {
                id: "1",
                name: "Jane Smith",
                avatar: "https://via.placeholder.com/150",
              },
              {
                id: "2",
                name: "Bob Johnson",
                avatar: "https://via.placeholder.com/150",
              },
              {
                id: "3",
                name: "Alice Williams",
                avatar: "https://via.placeholder.com/150",
              },
            ],
          };
          const avatarUrl = `https://images.hive.blog/u/${user.username}/avatar`;
          setProfile({
            avatar: avatarUrl,
            username: userData.username,
            email: userData.email,
            bio: userData.bio,
            affiliates: userData.affiliates,
          });

          // Generate the affiliate link
          const link = `${window.location.origin}/packs?ref=${userData.username}`;
          setAffiliateLink(link);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [user]);

  const handleCopyLink = () => {
    if (affiliateLink) {
      navigator.clipboard.writeText(affiliateLink);
      alert("Affiliate link copied to clipboard!");
    }
  };

  const handleAffiliateLinkClick = () => {
    if (profile) {
      Cookies.set("affiliate", JSON.stringify(profile), { expires: 7 }); // Save user data in cookies for 7 days
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative w-full h-64 md:h-80 bg-no-repeat bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('https://via.placeholder.com/1920x600')`,
        }}
      >
        <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Welcome to Your Profile
          </h1>
          <p className="text-base md:text-lg">
            Manage your account and view your affiliates
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="col-span-1 flex flex-col items-center bg-gray-800 p-6 rounded-lg">
            <div className="w-32 h-32 mb-4">
              <img
                className="rounded-full w-full h-full object-cover"
                src={profile.avatar}
                alt="User Avatar"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
            <p className="text-xl text-gray-400 mb-4">@{profile.username}</p>
            <p className="text-center max-w-xs text-gray-300 mb-8">
              {profile.bio}
            </p>
            <div className="bg-gray-700 text-white px-4 py-2 rounded-md mb-2">
              {profile.email}
            </div>
          </div>

          {/* Affiliates Section */}
          <div className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Affiliates</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 text-white rounded-lg">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="py-2 px-4">Avatar</th>
                    <th className="py-2 px-4">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.affiliates.map((affiliate) => (
                    <tr key={affiliate.id} className="border-t border-gray-600">
                      <td className="py-2 px-4">
                        <img
                          className="rounded-full w-12 h-12 object-cover"
                          src={affiliate.avatar}
                          alt={affiliate.name}
                        />
                      </td>
                      <td className="py-2 px-4">{affiliate.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Affiliate Link Section */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-center bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Your Affiliate Link</h2>
            {affiliateLink && (
              <div className="w-full mb-4">
                <input
                  type="text"
                  readOnly
                  value={affiliateLink}
                  className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white mb-2"
                />
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out w-full"
                  onClick={handleCopyLink}
                >
                  Copy Link
                </button>
                <a
                  href={affiliateLink}
                  onClick={handleAffiliateLinkClick}
                  className="block mt-2 text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-150 ease-in-out w-full"
                >
                  Open Affiliate Link
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

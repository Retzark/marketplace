const FooterSection = () => {
  return (
    <div className="bg-black w-full overflow-hidden">
      <div className="text-center text-white mt-36 px-4">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elephantmen">
          FIND RETZARK ON:
        </div>
        <div className="flex flex-wrap justify-center mt-5 mb-12 gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
          >
            Instagram
          </a>
          <a
            href="https://twitch.tv"
            target="_blank"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Twitch
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            YouTube
          </a>
        </div>
        <div className="text-sm">
          Copyright © 2024 | Retzark Website | All Rights Reserved | Content
          Protected
        </div>
      </div>
    </div>
  );
};

export default FooterSection;

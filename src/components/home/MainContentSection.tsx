const MainContentSection = () => {
  return (
    <div className="grid gap-10 md:grid-cols-2 items-center px-5 md:px-10">
      <div>
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-elephantmen text-white">
          THE RUNDOWN
        </div>
        <br />
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elephantmen text-secondary">
          COLLECT, SELECT, BATTLE!
        </div>
        <br />
        <div
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-poppins text-white"
          style={{ lineHeight: "1.8" }}
        >
          RETZARK lets you experience the ever expanding world of Arondaze in
          the form of a fast-paced, tactical card battler. Carefully craft your
          team from a full roster of characters unique to the story, then head
          into the arena to duke it out with like-minded adversaries to see who
          can deal the most damage to their base— all in just a couple of
          minutes.
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src="/images/game-board-home.webp"
          alt="Game Board"
          className="h-auto max-w-full"
        />
      </div>
    </div>
  );
};

export default MainContentSection;

import { useLocation } from "react-router-dom";

const CardDetails = () => {
  const location = useLocation();
  const card = location.state?.card;

  return (
    <div>
      <div className="row">
        <div
          className="relative flex justify-center text-white text-center bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/marketplace-hero.webp')`,
            height: "70vh",
          }}
        ></div>
      </div>
      <div className="flex flex-wrap -mx-1">
        <div className="w-full md:w-9/12 px-1">
          <a
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={`https://cdn.tribaldex.com/packmanager/DATA/${card.grouping.edition}_${card.grouping.type}_${card.grouping.foil}.png`}
              alt="Card Image"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="text-muted">ID:</span> {card.grouping.type}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
            </div>
          </a>
        </div>
        <div className="w-full md:w-3/12 px-1">
          <a
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src={`https://cdn.tribaldex.com/packmanager/DATA/${card.grouping.edition}_${card.grouping.type}_${card.grouping.foil}.png`}
              alt="Card Image"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                More Acquisitions in 2021
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Additional notable technology acquisitions details.
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;

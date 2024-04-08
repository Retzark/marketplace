import useTestSidechainApiCall from "../hooks/useTestSidechainApiCall.jsx";

const Open = () => {
  const { data, isLoading, error } = useTestSidechainApiCall();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className="relative py-96"
      style={{
        backgroundImage: `url('/images/open_cards.png')`,
      }}
    ></div>
  );
};

export default Open;

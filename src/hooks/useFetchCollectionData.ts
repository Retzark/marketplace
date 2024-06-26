import { useEffect } from "react";
import useCardStore from "@/store/useCardStore";

const useFetchCollectionData = () => {
  const { data, isLoading, error, fetchCollection } = useCardStore();

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return { data, isLoading, error };
};

export default useFetchCollectionData;

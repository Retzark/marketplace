import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import usePacksStore from "@/store/usePacksStore";
import useTransactionStore from "@/store/useTransactionStore";
import useAppStore from "@/store/useAppStore";
import { ChakraDialog } from "../chakra";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

interface OpenPackProps {
  isOpen: boolean;
  onClose: () => void;
  onCardsOpened: (cards: any) => void;
  setIsOpenPackModalOpen: (value: boolean) => void;
  selectedQty: number;
}

const OpenPack: React.FC<OpenPackProps> = ({
  isOpen,
  selectedQty,
  onClose,
  onCardsOpened,
  setIsOpenPackModalOpen,
}) => {
  const [number, setNumber] = useState<number>(1);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const requestOpenPacks = usePacksStore((state) => state.requestOpenPacks);
  const fetchAndValidateTransaction = useTransactionStore(
    (state) => state.fetchAndValidateTransaction
  );

  const { settings, settingsReady, error, fetchSettings } = useAppStore(
    (state) => ({
      settings: state.settings,
      settingsReady: state.settingsReady,
      error: state.error,
      fetchSettings: state.fetchSettings,
    })
  );

  useEffect(() => {
    setNumber(selectedQty);
  }, [selectedQty]);

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setNumber(value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      alert("Please enter a valid number of packs.");
      return;
    }
    setLoading(true);
    try {
      const transactionId = await requestOpenPacks({
        packSymbol: settings.nft_symbol,
        packs: number,
      });

      const newCards = await fetchAndValidateTransaction(transactionId);
      onCardsOpened(newCards); // Pass the new cards to the parent component
    } catch (error) {
      console.error("Failed to open packs:", error);
      alert("Failed to open packs. Please try again.");
    } finally {
      setLoading(false);
      setIsOpenPackModalOpen(false);
    }
  };

  return (
    <>
      <ChakraDialog
        title="Enter Number of Packs"
        txtSubmit="Submit"
        isOpen={isOpen}
        hideFooter={true}
        bgColor={"#282C34"}
        labelColor={"white"}
        onClose={() => {
          setIsOpenPackModalOpen(false);
        }}
        onSubmit={() => {}}
      >
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel
              fontFamily="Poppins"
              fontWeight="semibold"
              fontSize="14px"
              fontStyle="normal"
              alignItems="center"
              display="inline-flex"
              color="white"
            >
              Number of Packs:&nbsp;
              <Text as="span" color="red">
                *
              </Text>
            </FormLabel>
            <Input
              type="number"
              min="1"
              id="numberInput"
              background="#3A3F49"
              color="white"
              fontSize="14px"
              borderColor="transparent"
              placeholder="Enter quantity ..."
              defaultValue={selectedQty}
              onChange={handleChange}
              disabled={loading}
            />
          </FormControl>
          <Divider my="4" />
          <Box display="flex" justifyContent="end" gap="2" mb="2">
            <Button
              bgColor="#A5112C"
              color="white"
              _hover={{
                bgColor: "#930C24",
              }}
              isDisabled={loading}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              bgColor="#12BFA0"
              color="white"
              _hover={{
                bgColor: "#0d856f",
              }}
              type="submit"
              isDisabled={!isValid || loading}
            >
              {loading ? "Opening..." : "Submit"}
            </Button>
          </Box>
        </form>
      </ChakraDialog>
    </>
  );
};

export default OpenPack;

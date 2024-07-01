import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import useAppStore from "@/store/useAppStore";

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  nftId: number | null;
  onSubmit: (nftId: number, price: string, priceSymbol: string) => void;
}

const SellModal: React.FC<SellModalProps> = ({
  isOpen,
  onClose,
  nftId,
  onSubmit,
}) => {
  const [price, setPrice] = useState("");
  const { currency } = useAppStore.getState().settings;

  const handleSubmit = () => {
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Swal.fire({
        title: "Invalid Input",
        text: "Please enter a valid number greater than 0.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    if (nftId !== null) {
      onSubmit(nftId, price, currency);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#282C34" color="white" borderRadius="md">
        <ModalHeader>Sell NFT</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="price" isRequired>
            <FormLabel>Price</FormLabel>
            <Flex>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                bg="#3A3F49"
                borderColor="transparent"
                color="white"
                _placeholder={{ color: "gray.400" }}
                flex="1"
                required
              />
              <Button
                bg="#3A3F49"
                borderColor="transparent"
                color="white"
                marginLeft="2"
                _hover={{ bg: "#3A3F49" }}
                disabled
              >
                ZARK
              </Button>
            </Flex>
            <Text fontSize="sm" color="gray.400" mt="2">
              Enter the amount you want to sell your NFT for
            </Text>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Sell
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SellModal;

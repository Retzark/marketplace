import React, { useState, useEffect, Fragment } from "react";
import { SellBookEntry } from "@/types";
import Loading from "@/components/Loading";
import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";

interface ListingsTableProps {
  entries: SellBookEntry[];
  isLoading: boolean;
  onSelect: (entry: SellBookEntry, isSelected: boolean) => void;
}

const ListingsTable: React.FC<ListingsTableProps> = ({
  entries,
  isLoading,
  onSelect,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    if (selectAll) {
      const newSelectedEntries = new Set(entries.map((entry) => entry.nft_id));
      setSelectedEntries(newSelectedEntries);
      entries.forEach((entry) => onSelect(entry, true));
    } else {
      setSelectedEntries(new Set());
      entries.forEach((entry) => onSelect(entry, false));
    }
  }, [selectAll, entries]);

  const handleSelect = (entry: SellBookEntry, isSelected: boolean) => {
    const newSelectedEntries = new Set(selectedEntries);

    if (isSelected) {
      newSelectedEntries.add(entry.nft_id);
    } else {
      newSelectedEntries.delete(entry.nft_id);
    }
    setSelectedEntries(newSelectedEntries);
    onSelect(entry, isSelected);
  };

  const handleEntryCheckboxChange = (entry: SellBookEntry) => {
    const isSelected = selectedEntries.has(entry.nft_id);
    handleSelect(entry, !isSelected);
  };

  useEffect(() => {
    if (selectedEntries.size === entries.length) {
      setSelectAll(true);
    } else if (selectedEntries.size === 0) {
      setSelectAll(false);
    }
  }, [selectedEntries, entries.length]);

  return (
    <>
      <Box bgColor="#282C34" borderRadius="lg" p="6">
        <Text
          mt="-6px"
          fontFamily="Poppins"
          fontSize="22px"
          fontWeight="bold"
          color="white"
        >
          LISTINGS
        </Text>
        {isLoading ? (
          <div className="text-center py-4">
            <Loading />
          </div>
        ) : (
          <Box display="flex" mt="4">
            <Box
              w="100%"
              bgColor="#3A3F49"
              borderRadius="lg"
              flexDirection="column"
              p="2"
              display={{
                base: "none",
                sm: "none",
                md: "none",
                lg: "flex",
                xl: "flex",
                "2xl": "flex",
              }}
            >
              <Box
                display="flex"
                w="100%"
                bgColor="#3A3F49"
                borderRadius="lg"
                alignItems="center"
              >
                <Box display="flex" w="10%" p="5" justifyContent="center">
                  <Checkbox
                    size="lg"
                    bgColor="white"
                    colorScheme="green"
                    isChecked={selectAll}
                    onChange={(e) => setSelectAll(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                  />
                </Box>
                <Box w="22.5%" p="5">
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontSize="20px"
                    fontWeight="400"
                    color="white"
                  >
                    PRICE
                  </Text>
                </Box>
                <Box w="22.5%" p="5">
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontSize="20px"
                    fontWeight="400"
                    color="white"
                  >
                    ASC LVL
                  </Text>
                </Box>
                <Box w="22.5%" p="5">
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontSize="20px"
                    fontWeight="400"
                    color="white"
                  >
                    CARD ID
                  </Text>
                </Box>
                <Box w="22.5%" p="5">
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontSize="20px"
                    fontWeight="400"
                    color="white"
                  >
                    SELLER
                  </Text>
                </Box>
              </Box>

              {entries.map((entry, index) => {
                return (
                  <Fragment key={entry.nft_id}>
                    <Box
                      display="flex"
                      w="100%"
                      bgColor={index % 2 === 0 ? "#090909" : "transparent"}
                      alignItems="center"
                    >
                      <Box display="flex" w="10%" p="5" justifyContent="center">
                        <Checkbox
                          bgColor="white"
                          size="lg"
                          colorScheme="green"
                          isChecked={selectedEntries.has(entry.nft_id)}
                          onChange={() => handleEntryCheckboxChange(entry)}
                          className="form-checkbox h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                        />
                      </Box>
                      <Box w="22.5%" p="5">
                        <Text
                          fontFamily="Poppins"
                          fontSize="16px"
                          fontWeight="400"
                          color="white"
                          display="flex"
                          gap="2"
                        >
                          <Image
                            src="/images/ZARK-TOKEN_1.png"
                            objectFit="contain"
                            className="h-5"
                          />
                          {entry.price} {entry.priceSymbol}
                        </Text>
                      </Box>
                      <Box w="22.5%" p="5" display="flex" gap="1">
                        <Image
                          src="/images/asc_lvl_gray.svg"
                          objectFit="contain"
                        />
                        <Image
                          src="/images/asc_lvl_gray.svg"
                          objectFit="contain"
                        />
                        <Image
                          src="/images/asc_lvl_red.svg"
                          objectFit="contain"
                        />
                      </Box>
                      <Box w="22.5%" p="5">
                        <Text
                          fontFamily="Poppins"
                          fontSize="16px"
                          fontWeight="400"
                          color="white"
                        >
                          #{entry.nft_id}
                        </Text>
                      </Box>
                      <Box w="22.5%" p="5">
                        <Text
                          fontFamily="Poppins"
                          fontSize="16px"
                          fontWeight="400"
                          color="white"
                        >
                          @{entry.account}
                        </Text>
                      </Box>
                    </Box>
                  </Fragment>
                );
              })}
            </Box>
            <Box
              w="100%"
              bgColor="#3A3F49"
              borderRadius="lg"
              flexDirection="column"
              p="2"
              display={{
                base: "flex",
                sm: "flex",
                md: "flex",
                lg: "none",
                xl: "none",
                "2xl": "none",
              }}
            >
              {entries.map((entry, index) => {
                return (
                  <Fragment key={entry.nft_id}>
                    <Box display="flex" px="3" py="1">
                      <Checkbox
                        size="md"
                        bgColor="white"
                        colorScheme="green"
                        isChecked={selectedEntries.has(entry.nft_id)}
                        onChange={() => handleEntryCheckboxChange(entry)}
                        className="form-checkbox  text-green-500 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                      />
                    </Box>
                    <Grid
                      templateColumns={{
                        base: "repeat(2, 1fr)",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                      }}
                      gap="2"
                      w="100%"
                      p={{
                        base: "1",
                        sm: "1",
                        md: "2",
                      }}
                    >
                      <Box p="2">
                        <Text
                          fontFamily="Poppins"
                          fontSize={{
                            base: "12px",
                            sm: "12px",
                            md: "14px",
                          }}
                          fontWeight="600"
                          color="white"
                          display="flex"
                          gap="2"
                        >
                          PRICE
                        </Text>
                        <Text
                          mt="2"
                          fontFamily="Poppins"
                          fontSize={{
                            base: "10px",
                            sm: "10px",
                            md: "12px",
                          }}
                          fontWeight="400"
                          color="white"
                          display="flex"
                          gap="2"
                        >
                          <Image
                            src="/images/currency_logo.svg"
                            objectFit="contain"
                            w="14px"
                          />
                          {entry.price} {entry.priceSymbol}
                        </Text>
                      </Box>
                      <Box p="2">
                        <Text
                          fontFamily="Poppins"
                          fontSize={{
                            base: "12px",
                            sm: "12px",
                            md: "14px",
                          }}
                          fontWeight="600"
                          color="white"
                          display="flex"
                          gap="2"
                        >
                          ASC LVL
                        </Text>
                        <Box display="flex" gap="1" mt="2">
                          <Image
                            src="/images/asc_lvl_gray.svg"
                            objectFit="contain"
                            w={{
                              base: "10px",
                              sm: "10px",
                              md: "12px",
                            }}
                          />
                          <Image
                            src="/images/asc_lvl_gray.svg"
                            objectFit="contain"
                            w={{
                              base: "10px",
                              sm: "10px",
                              md: "12px",
                            }}
                          />
                          <Image
                            src="/images/asc_lvl_red.svg"
                            objectFit="contain"
                            w={{
                              base: "10px",
                              sm: "10px",
                              md: "12px",
                            }}
                          />
                        </Box>
                      </Box>
                      <Box p="2">
                        <Text
                          fontFamily="Poppins"
                          fontSize={{
                            base: "12px",
                            sm: "12px",
                            md: "14px",
                          }}
                          fontWeight="600"
                          color="white"
                          display="flex"
                          gap="2"
                        >
                          CARD ID
                        </Text>
                        <Text
                          mt="2"
                          fontFamily="Poppins"
                          fontSize={{
                            base: "10px",
                            sm: "10px",
                            md: "12px",
                          }}
                          fontWeight="400"
                          color="white"
                          display="flex"
                          gap="2"
                        >
                          #{entry.nft_id}
                        </Text>
                      </Box>
                      <Box p="2">
                        <Text
                          fontFamily="Poppins"
                          fontSize={{
                            base: "12px",
                            sm: "12px",
                            md: "14px",
                          }}
                          fontWeight="600"
                          color="white"
                          display="flex"
                          gap="2"
                        >
                          SELLER
                        </Text>
                        <Text
                          mt="2"
                          fontFamily="Poppins"
                          fontSize={{
                            base: "10px",
                            sm: "10px",
                            md: "12px",
                          }}
                          fontWeight="400"
                          color="white"
                          display="flex"
                          gap="2"
                        >
                          @{entry.account}
                        </Text>
                      </Box>
                    </Grid>
                    {entries.length !== index + 1 && <Divider mb="2" />}
                  </Fragment>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ListingsTable;

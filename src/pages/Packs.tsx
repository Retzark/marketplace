import { useState, useEffect } from "react";
import BuyPacksModal from "@/components/modals/BuyPacks";
import Cookies from "js-cookie";
import useAppStore from "@/store/useAppStore";
import { Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";

const Packs = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [affiliate, setAffiliate] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const { settings, settingsReady, error, fetchSettings } = useAppStore(
    (state) => ({
      settings: state.settings,
      settingsReady: state.settingsReady,
      error: state.error,
      fetchSettings: state.fetchSettings,
    })
  );

  useEffect(() => {
    const affiliateData = Cookies.get("affiliate");
    if (affiliateData) {
      setAffiliate(JSON.parse(affiliateData));
    }
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectPack = (pack: string) => {
    setSelectedPack(pack);
    setQuantity(parseInt(pack, 10));
  };

  return (
    <>
      <Box
        position="relative"
        width="full"
        height={{
          base: "195px",
          xs: "195px",
          sm: "183px",
          md: "310px",
          lg: "350px",
          xl: "520px",
          "2xl": "520px",
        }}
        overflow="hidden"
      >
        <Image
          src="./images/BANNER-ALPHA-PACK.webp" // Replace with your image path
          alt="Blended Image"
          objectFit="cover"
          width="full"
          height={{
            base: "28vh",
            xxs: "28vh",
            xs: "28vh",
            sm: "22vh",
            md: "83vh",
            lg: "54vh",
            xl: "76vh",
            "2xl": "76vh",
          }}
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="full"
          height="16%"
          bgGradient={`linear(to-b, rgba(0,0,0,0), #090909)`}
        />
        <Flex
          position="absolute"
          top="0"
          left="0"
          width="full"
          height="full"
          align="center"
          justify="center"
          pointerEvents="none" // This ensures the text doesn't interfere with any click events
          flexDirection="column"
        >
          <Text
            fontWeight="regular"
            color="white"
            textAlign="center"
            fontSize={{
              base: "30px",
              sm: "30px",
              md: "60px",
              lg: "80px",
              xl: "100px",
              "2xl": "100px",
            }}
            fontFamily="CCElephantmenTall Regular"
          >
            THE ALPHA PACK
          </Text>
          <Text
            fontFamily="Poppins"
            fontWeight="500"
            fontStyle="italic"
            textAlign="center"
            color="#14C2A3"
            fontSize={{
              base: "14px",
              sm: "14px",
              md: "25px",
              lg: "25px",
              xl: "25px",
              "2xl": "25px",
            }}
          >
            5 CARDS, YOURS TO KEEP
          </Text>
          <Flex
            w={{
              base: "100%",
              sm: "100%",
              md: "100%",
              lg: "50%",
              xl: "50%",
              "2xl": "50%",
            }}
            textAlign="justify"
          >
            <Text
              mt={{
                base: "40px",
                sm: "40px",
                md: "85px",
                lg: "85px",
                xl: "85px",
                "2xl": "85px",
              }}
              px="4"
              fontFamily="Poppins"
              fontWeight="400"
              textAlign="center"
              color="white"
              fontSize={{
                base: "12px",
                sm: "12px",
                md: "14px",
                lg: "14px",
                xl: "14px",
                "2xl": "14px",
              }}
            >
              The Retzark Alpha card deck is a collection of 161 unique cards.
              Each pack contains 5 random cards from the Retzark Alpha card set.
            </Text>
          </Flex>
        </Flex>
      </Box>

      {/* Packs Section */}
      <Flex
        width="100%"
        gap="4"
        p="8"
        pb="120px"
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
          "2xl": "row",
        }}
      >
        <Flex
          p="6"
          bgColor="#282C34"
          borderRadius="lg"
          width={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "70%",
            xl: "70%",
            "2xl": "70%",
          }}
          gap="10"
          flexDirection={{
            base: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
            "2xl": "row",
          }}
        >
          <Flex justifyContent="center">
            <Image
              src="./images/alpha-pack.webp"
              objectFit="contain"
              w={{
                base: "180px",
                sm: "180px",
                md: "auto",
                lg: "auto",
                xl: "auto",
                "2xl": "auto",
              }}
            />
          </Flex>
          <Flex flexDirection="column" alignItems="start" w="100%">
            <Text
              fontFamily="Poppins"
              fontWeight="600"
              textAlign="center"
              color="white"
              fontSize={{
                base: "16px",
                sm: "16px",
                md: "20px",
                lg: "20px",
                xl: "25px",
                "2xl": "25px",
              }}
            >
              ALPHA PACK
            </Text>
            <Box bgColor="#3A3F49" px="4" py="2" borderRadius="10px" mt="2">
              <Text
                fontFamily="CCElephantmenTall Regular"
                fontWeight="400"
                textAlign="center"
                color="white"
                fontSize={{
                  base: "12px",
                  sm: "12px",
                  md: "14px",
                  lg: "14px",
                  xl: "14px",
                  "2xl": "14px",
                }}
                letterSpacing="1px"
              >
                {settings?.packs?.[0].remaining.toLocaleString()} PACKS
                REMAINING
              </Text>
            </Box>
            <Divider borderColor="#3A3F49" my="6" />
            <Flex alignItems="start" flexDirection="column" gap="4">
              <Text
                fontFamily="Poppins"
                fontWeight="thin"
                color="white"
                fontSize={{
                  base: "10px",
                  sm: "10px",
                  md: "12px",
                  lg: "12px",
                  xl: "14px",
                  "2xl": "14px",
                }}
              >
                The ALPHA PACK set is now available!
              </Text>
              <Text
                fontFamily="Poppins"
                fontWeight="thin"
                color="white"
                fontSize={{
                  base: "10px",
                  sm: "10px",
                  md: "12px",
                  lg: "12px",
                  xl: "14px",
                  "2xl": "14px",
                }}
              >
                Each pack contains 5 random cards from the Retzark Alpha card
                set.
              </Text>
              <Text
                fontFamily="Poppins"
                fontWeight="semibold"
                color="white"
                fontSize={{
                  base: "10px",
                  sm: "10px",
                  md: "12px",
                  lg: "12px",
                  xl: "14px",
                  "2xl": "14px",
                }}
              >
                Guaranteed to contain at least one card that is EPIC or better!
              </Text>
            </Flex>
            <Flex alignItems="start" flexDirection="column" gap="4" mt="6">
              <Text
                fontFamily="Poppins"
                fontWeight="semibold"
                textAlign="center"
                color="white"
                fontSize={{
                  base: "10px",
                  sm: "10px",
                  md: "12px",
                  lg: "12px",
                  xl: "14px",
                  "2xl": "14px",
                }}
              >
                Drop Rates:
              </Text>
              <Flex gap="2" flexWrap="wrap">
                <Flex
                  bgColor="#3A3F49"
                  px="3"
                  py="1"
                  borderRadius="10px"
                  gap="2"
                  alignItems="center"
                >
                  <Image
                    src="./images/legendary-badge.svg"
                    objectFit="contain"
                    w={{
                      base: "10px",
                      sm: "10px",
                      md: "10px",
                      lg: "10px",
                      xl: "12px",
                      "2xl": "12px",
                    }}
                  />
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontWeight="regular"
                    textAlign="center"
                    color="#FF4D4D"
                    fontSize={{
                      base: "10px",
                      xxs: "8px",
                      xs: "10px",
                      sm: "10px",
                      md: "12px",
                      lg: "12px",
                      xl: "14px",
                      "2xl": "14px",
                    }}
                    letterSpacing="1px"
                  >
                    LEGENDARY:&nbsp;
                    <Text as="span" color="white">
                      0.25%
                    </Text>
                  </Text>
                </Flex>
                <Flex
                  bgColor="#3A3F49"
                  px="3"
                  py="1"
                  borderRadius="10px"
                  gap="2"
                  alignItems="center"
                >
                  <Image
                    src="./images/epic-badge.svg"
                    objectFit="contain"
                    w={{
                      base: "10px",
                      sm: "10px",
                      md: "10px",
                      lg: "10px",
                      xl: "12px",
                      "2xl": "12px",
                    }}
                  />
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontWeight="regular"
                    textAlign="center"
                    color="#FF9104"
                    fontSize={{
                      base: "10px",
                      xxs: "8px",
                      xs: "10px",
                      sm: "10px",
                      md: "12px",
                      lg: "12px",
                      xl: "14px",
                      "2xl": "14px",
                    }}
                    letterSpacing="1px"
                  >
                    EPIC:&nbsp;
                    <Text as="span" color="white">
                      0.5.75%
                    </Text>
                  </Text>
                </Flex>
                <Flex
                  bgColor="#3A3F49"
                  px="3"
                  py="1"
                  borderRadius="10px"
                  gap="2"
                  alignItems="center"
                >
                  <Image
                    src="./images/rare-badge.svg"
                    objectFit="contain"
                    w={{
                      base: "10px",
                      sm: "10px",
                      md: "10px",
                      lg: "10px",
                      xl: "12px",
                      "2xl": "12px",
                    }}
                  />
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontWeight="regular"
                    textAlign="center"
                    color="#B5B5B5"
                    fontSize={{
                      base: "10px",
                      xxs: "8px",
                      xs: "10px",
                      sm: "10px",
                      md: "12px",
                      lg: "12px",
                      xl: "14px",
                      "2xl": "14px",
                    }}
                    letterSpacing="1px"
                  >
                    RARE:&nbsp;
                    <Text as="span" color="white">
                      34%
                    </Text>
                  </Text>
                </Flex>
                <Flex
                  bgColor="#3A3F49"
                  px="3"
                  py="1"
                  borderRadius="10px"
                  gap="2"
                  alignItems="center"
                >
                  <Image
                    src="./images/common-badge.svg"
                    objectFit="contain"
                    w={{
                      base: "10px",
                      sm: "10px",
                      md: "10px",
                      lg: "10px",
                      xl: "12px",
                      "2xl": "12px",
                    }}
                  />
                  <Text
                    fontFamily="CCElephantmenTall Regular"
                    fontWeight="regular"
                    textAlign="center"
                    color="#DA9466"
                    fontSize={{
                      base: "10px",
                      xxs: "8px",
                      xs: "10px",
                      sm: "10px",
                      md: "12px",
                      lg: "12px",
                      xl: "14px",
                      "2xl": "14px",
                    }}
                    letterSpacing="1px"
                  >
                    COMMON:&nbsp;
                    <Text as="span" color="white">
                      60%
                    </Text>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          p="6"
          bgColor="#282C34"
          borderRadius="lg"
          width={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "30%",
            xl: "30%",
            "2xl": "30%",
          }}
          gap="10"
        >
          <Flex flexDirection="column" alignItems="start" w="100%">
            <Text
              fontFamily="Poppins"
              fontWeight="600"
              color="white"
              fontSize={{
                base: "20px",
                sm: "20px",
                md: "20px",
                lg: "20px",
                xl: "25px",
                "2xl": "25px",
              }}
            >
              BUY ALPHA PACKS
            </Text>
            <Flex mt="4" gap="2" flexWrap="wrap">
              <Button
                size="xs"
                px="4"
                py="2"
                fontFamily="CCElephantmenTall Regular"
                fontWeight="400"
                textAlign="center"
                color="white"
                bgColor={selectedPack === "10" ? "#12BFA0" : "#3A3F49"}
                borderRadius="10px"
                fontSize={{
                  base: "12px",
                  sm: "12px",
                  md: "12px",
                  lg: "12px",
                  xl: "14px",
                  "2xl": "14px",
                }}
                _hover={{
                  bgColor: "#12BFA0",
                }}
                onClick={() => handleSelectPack("10")}
              >
                BUY 10 PACKS
              </Button>
              <Button
                size="xs"
                px="4"
                py="2"
                fontFamily="CCElephantmenTall Regular"
                fontWeight="400"
                textAlign="center"
                color="white"
                bgColor={selectedPack === "100" ? "#12BFA0" : "#3A3F49"}
                borderRadius="10px"
                fontSize={{
                  base: "12px",
                  sm: "12px",
                  md: "12px",
                  lg: "12px",
                  xl: "14px",
                  "2xl": "14px",
                }}
                _hover={{
                  bgColor: "#12BFA0",
                }}
                onClick={() => handleSelectPack("100")}
              >
                BUY 100 PACKS
              </Button>
              <Button
                size="xs"
                px="4"
                py="2"
                fontFamily="CCElephantmenTall Regular"
                fontWeight="400"
                textAlign="center"
                color="white"
                bgColor={selectedPack === "500" ? "#12BFA0" : "#3A3F49"}
                borderRadius="10px"
                fontSize={{
                  base: "12px",
                  sm: "12px",
                  md: "12px",
                  lg: "12px",
                  xl: "14px",
                  "2xl": "14px",
                }}
                _hover={{
                  bgColor: "#12BFA0",
                }}
                onClick={() => handleSelectPack("500")}
              >
                BUY 500 PACKS
              </Button>
            </Flex>
            <Flex mt="4" gap="2" flexWrap="wrap">
              <Box
                px="4"
                py="2px"
                fontFamily="CCElephantmenTall Regular"
                fontWeight="400"
                textAlign="center"
                color="#959595"
                bgColor="white"
                borderRadius="10px"
                fontSize={{
                  base: "12px",
                  sm: "12px",
                  md: "12px",
                  lg: "12px",
                  xl: "14px",
                  "2xl": "14px",
                }}
              >
                QTY:&nbsp;
                <Text as="span" color="#090909">
                  {selectedPack ? selectedPack : "1"}
                </Text>
              </Box>
            </Flex>
            <Divider borderColor="#3A3F49" my="8" />
            <Box w="full">
              <Text
                fontFamily="Poppins"
                fontWeight="thin"
                color="white"
                fontSize={{
                  base: "12px",
                  sm: "12px",
                  md: "12px",
                  lg: "12px",
                  xl: "14px",
                  "2xl": "14px",
                }}
              >
                TOTAL PRICE
              </Text>
              <Flex alignItems="center" gap="1">
                <Image
                  src="./images/currency_logo.svg"
                  alt="currency"
                  objectFit="contain"
                  mt="-3px"
                  w={{
                    base: "25px",
                    sm: "25px",
                    md: "25px",
                    lg: "22px",
                    xl: "28px",
                    "2xl": "28px",
                  }}
                />
                <Text
                  fontFamily="Poppins"
                  fontWeight="bold"
                  color="white"
                  fontSize={{
                    base: "28px",
                    sm: "28px",
                    md: "28px",
                    lg: "28px",
                    xl: "30px",
                    "2xl": "30px",
                  }}
                >
                  0.083745
                </Text>
              </Flex>
              <Button
                w="full"
                mt="8"
                bgColor="#12BFA0"
                fontFamily="CCElephantmenTall Regular"
                fontWeight="regular"
                color="white"
                fontSize={{
                  base: "20px",
                  sm: "20px",
                  md: "20px",
                  lg: "20px",
                  xl: "20px",
                  "2xl": "20px",
                }}
                h="50px"
                _hover={{ bgColor: "#0d977e" }}
                onClick={handleOpenModal}
              >
                <Image
                  src="./images/buy-now.svg"
                  w={{
                    base: "20px",
                    sm: "20px",
                    md: "20px",
                    lg: "20px",
                    xl: "20px",
                    "2xl": "20px",
                  }}
                />
                &nbsp; BUY NOW
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {showModal && (
        <BuyPacksModal
          showModal={showModal}
          onClose={handleCloseModal}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      )}
    </>
  );
};

export default Packs;

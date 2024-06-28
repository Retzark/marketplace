import { useParams, Navigate } from "react-router-dom";
import CollectionCardsList from "@/components/CollectionCardsList";
import useUserStore from "@/store/userStore";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

const Cards = () => {
  const { username } = useParams<{ username: string }>();
  const user = useUserStore((state) => state.user);

  if (!user || user.username !== username) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Box
        position="relative"
        width="full"
        height={{
          base: "145px",
          sm: "183px",
          md: "255px",
          lg: "350px",
          xl: "520px",
          "2xl": "520px",
        }}
        overflow="hidden"
      >
        <Image
          src="/images/marketplace-hero.webp" // Replace with your image path
          alt="Blended Image"
          objectFit="cover"
          width="full"
          height={{
            base: "17vh",
            sm: "22vh",
            md: "40vh",
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
            className="font-elephantmen"
          >
            COLLECTION
          </Text>
        </Flex>
      </Box>

      <CollectionCardsList username={username} />
    </>
  );
};

export default Cards;

import { Box, Button, Icon } from "@chakra-ui/react";
import React from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const renderPageNumbers = () => {
    const adjacentPages = 2;
    const pages = [];

    let startPage = Math.max(1, currentPage - adjacentPages);
    let endPage = Math.min(totalPages, currentPage + adjacentPages);

    if (
      currentPage > adjacentPages + 1 &&
      currentPage < totalPages - adjacentPages
    ) {
      startPage = currentPage - adjacentPages;
      endPage = currentPage + adjacentPages;
    }

    if (startPage > 1) {
      pages.push(
        <Button
          key={1}
          fontSize={{
            base: "10px",
            sm: "10px",
            md: "12px",
            lg: "12px",
            xl: "12px",
            "2xl": "12px",
          }}
          onClick={() => onPageChange(1)}
          bgColor="transparent"
          color="white"
          _hover={{ bgColor: "transparent", color: "#12BFA0" }}
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(
          <Button
            fontSize={{
              base: "10px",
              sm: "10px",
              md: "12px",
              lg: "12px",
              xl: "12px",
              "2xl": "12px",
            }}
            key="ellipsis1"
            bgColor="transparent"
            border="none"
            color="white"
            _hover={{
              bgColor: "transparent",
              color: "white",
            }}
          >
            ...
          </Button>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          fontSize={{
            base: "10px",
            sm: "10px",
            md: "12px",
            lg: "12px",
            xl: "12px",
            "2xl": "12px",
          }}
          key={i}
          onClick={() => onPageChange(i)}
          bgColor="transparent"
          color={currentPage === i ? "#12BFA0" : "white"}
          _hover={{
            bgColor: "transparent",
            color: "#12BFA0",
          }}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <Button
            fontSize={{
              base: "10px",
              sm: "10px",
              md: "12px",
              lg: "12px",
              xl: "12px",
              "2xl": "12px",
            }}
            key="ellipsis2"
            bgColor="transparent"
            border="none"
            color="white"
            _hover={{
              bgColor: "transparent",
              color: "white",
            }}
          >
            ...
          </Button>
        );
      }
      pages.push(
        <Button
          fontSize={{
            base: "10px",
            sm: "10px",
            md: "12px",
            lg: "12px",
            xl: "12px",
            "2xl": "12px",
          }}
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          bgColor="transparent"
          color="white"
          _hover={{ bgColor: "transparent", color: "#12BFA0" }}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <Box
      className="flex justify-center mt-10 mb-10 bg-[#090909] text-white"
      flexWrap="wrap"
      p="2"
    >
      <Box
        display="flex"
        gap="1"
        flexWrap="wrap"
        justifyContent="center"
        className="justify-center"
      >
        <Button
          fontSize={{
            base: "10px",
            sm: "10px",
            md: "12px",
            lg: "12px",
            xl: "12px",
            "2xl": "12px",
          }}
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          bgColor="transparent"
          border="2px solid #282C34"
          color="white"
          _hover={{
            bgColor: "transparent",
            border: currentPage === 1 ? "" : "2px solid #12BFA0",
          }}
        >
          <Icon as={MdArrowBack} />
        </Button>
        {renderPageNumbers()}
        <Button
          fontSize={{
            base: "10px",
            sm: "10px",
            md: "12px",
            lg: "12px",
            xl: "12px",
            "2xl": "12px",
          }}
          onClick={() => onPageChange(currentPage + 1)}
          bgColor="transparent"
          border="2px solid #282C34"
          color="white"
          isDisabled={currentPage === totalPages}
          _hover={{
            bgColor: "transparent",
            border: currentPage === totalPages ? "" : "2px solid #12BFA0",
          }}
        >
          <Icon as={MdArrowForward} />
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;

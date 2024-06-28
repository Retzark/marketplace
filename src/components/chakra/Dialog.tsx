import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  UseDisclosureProps,
  Button,
  Divider,
  Box,
} from "@chakra-ui/react";
import { FC, ReactNode, useRef } from "react";

interface Props extends UseDisclosureProps {
  title: string;
  txtSubmit: string;
  cancelColor?: string;
  isOpen?: boolean;
  cancelTxt?: string;
  colorScheme?: string;
  onClose: () => void;
  onSubmit: () => void;
  alertDialogProps?: AlertDialogProps;
  hideFooter?: boolean;
  isLoading?: boolean;
  isShowSubmitBtn?: boolean;
  hasInfoIcon?: boolean;
  infoIconContent?: string;
  children?: ReactNode;
  bgColor: string;
  labelColor: string;
}

const ChakraDialog: FC<Props> = (props) => {
  const {
    title,
    txtSubmit,
    bgColor = "white",
    labelColor = "black",
    cancelColor = "gray",
    cancelTxt = "Cancel",
    isOpen = false,
    onClose,
    onSubmit,
    alertDialogProps,
    hideFooter,
    children,
    isLoading = false,
    colorScheme = "red",
    isShowSubmitBtn = true,
  } = props;
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      closeOnOverlayClick={false}
      onClose={onClose}
      isCentered
      {...alertDialogProps}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bgColor={bgColor} fontFamily="Poppins">
          <AlertDialogHeader fontSize="md" fontWeight="bold" pb={0}>
            <Box display="flex" color={labelColor}>
              {title}
            </Box>
          </AlertDialogHeader>
          <Divider my={2} />
          <AlertDialogBody>{children}</AlertDialogBody>

          {!hideFooter && (
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                variant="outline"
                colorScheme={cancelColor}
              >
                {cancelTxt}
              </Button>
              {isShowSubmitBtn && (
                <Button
                  isLoading={isLoading}
                  loadingText="Processing"
                  colorScheme={colorScheme}
                  onClick={onSubmit}
                  ml={3}
                >
                  {txtSubmit}
                </Button>
              )}
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ChakraDialog;

import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function AppointmentModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };
  return <p>hello</p>;
}

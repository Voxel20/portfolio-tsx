// @ts-nocheck
import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { FaGithub, FaDiscord, FaLinkedin } from 'react-icons/fa';
import useMediaQuery from '../hook/useMediaQuery';
import { useColorMode } from '@chakra-ui/react';
import { Form, Field, useField } from 'react-final-form';
import validate from './Validate';
import { FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

const onSubmit = async (values) => {
  console.log(values);
  fetch('/api/contact', {
    method: 'post',
    body: JSON.stringify(values)
  });
};

export default function ContactRawForm() {
  const { colorMode } = useColorMode();
  const isLargerThan800 = useMediaQuery(800);
  const isLargerThan400 = useMediaQuery(400);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior] = React.useState('inside');

  const btnRef = React.useRef(null);
  // const [fullName, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        leftIcon={<FaEnvelope />}
        transition="0.3s"
        position="relative"
        size={isLargerThan800 ? 'md' : 'sm'}
        mr={isLargerThan400 ? 0 : 2}
        mb={isLargerThan400 ? 0 : 2}
      >
        Email
      </Button>
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
        size={isLargerThan800 ? 'lg' : 'sm'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={'100%'} p={4} m="10px auto">
              <Link href="/mail">
                <Box as="p" textAlign="center">
                  aidensmith20@gmail.com
                </Box>
              </Link>
              <Form
                onSubmit={onSubmit}
                validate={validate}
                color={colorMode === 'light' ? '#2A4365' : '#90CDF4'}
                render={({
                  handleSubmit,
                  form,
                  errors,
                  submitting,
                  pristine,
                  values
                }) => (
                  <Box
                    as="form"
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="1px 1px 3px rgba(0,0,0,0.3)"
                    onSubmit={handleSubmit}
                  >
                    <Box as="p" textAlign="center"></Box>
                    <InputControl
                      name="fullName"
                      label="Full Name"
                      labelName="Full Name"
                    />
                    <InputControl
                      name="email"
                      label="Your Email"
                      labelName="Your Email"
                    />
                    <TextareaControl name="message" label="Message" />
                    <ButtonGroup spacing={4}>
                      <Button
                        isLoading={submitting}
                        loadingText="Submitting"
                        variantColor="teal"
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Button
                        variantColor="teal"
                        variant="outline"
                        onClick={form.reset}
                        isDisabled={submitting || pristine}
                      >
                        Reset
                      </Button>
                    </ButtonGroup>
                    <br />
                    <br />
                    {/* <Box
                      as="pre"
                      style={{
                        wordBreak: 'break-all',
                        width: '100%',
                        overflow: 'auto'
                      }}
                      my={10}
                    >
                      {JSON.stringify(values, 0, 2)}
                    </Box> */}
                    <Box spacing={5} display="flex" justifyContent="center">
                      <Link href="/github" isExternal>
                        <Button
                          position="static"
                          size={isLargerThan800 ? 'md' : 'sm'}
                          backgroundColor={
                            colorMode === 'light' ? '#ffffff' : '#111111'
                          }
                        >
                          <FaGithub />
                        </Button>
                      </Link>
                      <Link href="/linkedin" isExternal>
                        <Button
                          position="static"
                          size={isLargerThan800 ? 'md' : 'sm'}
                          backgroundColor={
                            colorMode === 'light' ? '#ffffff' : '#111111'
                          }
                        >
                          <FaLinkedin />
                        </Button>
                      </Link>
                      <Link href="/discord" isExternal>
                        <Button
                          position="static"
                          size={isLargerThan800 ? 'md' : 'sm'}
                          backgroundColor={
                            colorMode === 'light' ? '#ffffff' : '#111111'
                          }
                        >
                          <FaDiscord />
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                )}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const AdaptedTextarea = ({ input, meta, ...rest }) => (
  <Textarea {...input} {...rest} isInvalid={meta.error && meta.touched} />
);

const Control = ({ name, ...rest }) => {
  const {
    meta: { error, touched }
  } = useField(name, { subscription: { touched: true, error: true } });
  return <FormControl {...rest} isInvalid={error && touched} />;
};

const Error = ({ name }) => {
  const {
    meta: { error }
  } = useField(name, { subscription: { error: true } });
  return <FormErrorMessage>{error}</FormErrorMessage>;
};

const InputControl = ({ name, label, labelName }) => {
  const { input, meta } = useField(name);
  return (
    <Control name={name} my={4}>
      <FormLabel htmlFor={name}>{labelName}</FormLabel>
      <Input
        {...input}
        isInvalid={meta.error && meta.touched}
        id={name}
        placeholder={label}
      />
      <Error name={name} />
    </Control>
  );
};

const TextareaControl = ({ name, label }) => (
  <Control name={name} my={4}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Field
      name={name}
      component={AdaptedTextarea}
      placeholder={label}
      id={name}
    />
    <Error name={name} />
  </Control>
);

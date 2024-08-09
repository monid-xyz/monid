import {
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Link,
  useToast,
  Center,
  Spinner,
  Switch,
  Box,
  SimpleGrid,
  Avatar,
} from "@chakra-ui/react";
import DomainAbi from "abi/Domain.abi.json";
import { LinkIcon } from "components/logos";
import {
  avatarAtom,
  claimingNameAtom,
  connectedAccountAtom,
  isConnectedAtom,
  openRegisterAtom,
  pathAtom,
  primaryNameAtom,
  rootContractAtom,
  secretAtom,
  signDateAtom,
  signHashAtom,
  signMessageAtom,
  venomProviderAtom,
} from "core/atoms";
import {
  DOMAIN_REGISTER_FEE,
  ETHERSCAN_ADDRESS,
  METADATA_URL,
  SIGN_MESSAGE,
  SITE_PROFILE_URL,
  TLD,
} from "core/utils/constants";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Message } from "types";
import ClaimModal from "./ClaimModal";
import { useTranslate } from "core/lib/hooks/use-translate";
import { getCurrentDateUnix, isValidSignHash, sumUint128 } from "core/utils";
import {
  ETHRegistrarController,
  PriceOracle,
  Resolver,
} from "core/utils/contracts";
import {
  estimateGasCost,
  prepareContractCall,
  prepareTransaction,
  readContract,
  stringToBytes,
  toWei,
} from "thirdweb";
import {
  makeCommitment,
  rentPrice,
} from "contracts/421614/0x89c108a78ef261a9f9e977e566b310cb3518e714";
import { toEther } from "thirdweb/utils";
import { latestAnswer } from "contracts/421614/0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165";
import { EditAvatar, ManageWallets, TitleInput } from "components/manage";
import CropAvatar from "components/manage/CropAvatar";
import AddModal from "components/manage/AddModal";
import TextIcon from "components/features/TextIcon";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getRandomBytes32 } from "core/utils/stringUtils";
import { BigNumber } from "ethers";
import { generateRecordCallArray, namehash } from "@monadid/monjs/utils";
import ImageBox from "./ImageBox";

export default function RegisterModal() {
  const { colorMode } = useColorMode();
  const [isPrimary, setIsPrimary] = useState<boolean>(false);
  const [_open, _setOpen] = useAtom(openRegisterAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useAtom(claimingNameAtom);
  const connected = useAtomValue(isConnectedAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const setSignMessage = useSetAtom(signMessageAtom);
  const provider = useAtomValue(venomProviderAtom);
  const lightMode = useColorMode().colorMode === "light";
  const [year, setYear] = useState<number>(1);
  const [step, setStep] = useState<number>(1);
  const [fee, setFee] = useState<bigint | null>(null);
  const [gas, setGas] = useState<bigint | Number | string | null>(null);
  const [usdFee, setUsdFee] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [totalFee, setTotalFee] = useState<number | null>(null);
  const [cmHash, setCmHash] = useState<`0x${string}`>("0x");
  const [registeredTx, setRegisteredTx] = useState<string | undefined>();
  const [recordsData, setRecordsData] = useState<`0x${string}`[]>();
  const [notMobile] = useMediaQuery("(min-width: 768px)");
  const rootContract = useAtomValue(rootContractAtom);
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [timerPassed, setTimerPassed] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [message, setMessage] = useState<Message>({
    type: "",
    title: "",
    msg: "",
    link: "",
  });
  const [claimedName, setClaimedName] = useState("");
  const setPath = useSetAtom(pathAtom);
  const avatar = useAtomValue(avatarAtom);
  const toast = useToast();
  const { t } = useTranslate();
  const minFee: number = 2000000000;
  const address = useActiveAccount()?.address;
  const [secret, setSecret] = useAtom(secretAtom);

  async function prepare() {
    const _secret = getRandomBytes32();
    console.log(_secret);
    console.log(address);
    console.log(BigNumber.from(new Uint8Array(8).fill(255)).toString());
    setSecret(_secret);

    let _texts = [];
    let _coins = [];
    if (avatar) {
      _texts.push({ key: "avatar", value: avatar });
    }

    if (isPrimary) {
      _coins.push({ coin: "ETH", value: address! });
    }

    const options = {
      texts: _texts,
      coins: _coins,
      clearRecords: false,
    };

    console.log(options);

    const hash = namehash(name);
    console.log(hash);

    const data =
      _texts.length > 0
        ? generateRecordCallArray({ namehash: hash, ...options })
        : [];

    console.log(data);

    setRecordsData(data);

    const commitmentHash: any = await makeCommitment({
      contract: ETHRegistrarController,
      name: name,
      owner: address!,
      secret: _secret,
      duration: BigInt(365 * 24 * 60 * 60 * year),
      resolver: Resolver.address,
      reverseRecord: isPrimary,
      fuses: 0,
      data: data,
      wrapperExpiry: BigInt(
        BigNumber.from(new Uint8Array(8).fill(255)).toString()
      ),
    });
    console.log(commitmentHash);
    setCmHash(commitmentHash);

    const commitTx = prepareContractCall({
      contract: ETHRegistrarController,
      method: "commit",
      params: [commitmentHash],
    });

    //const gas = await estimateGas({ transaction: _makeCommitmentTx });
    const gasCost = await estimateGasCost({ transaction: commitTx });
    setGas(Number(gasCost.ether).toFixed(5));
  }

  async function saveAvatar() {
    await prepare();
  }

  useEffect(() => {
    if (_open) {
      onOpen();
      setYear(1);
    } else {
      onClose();
    }
  }, [_open]);

  useEffect(() => {
    setFee(null);
    async function getFee() {
      console.log("getting fee");
      //@ts-ignore: Unreachable code error
      const _fee: any = await rentPrice({
        name: name,
        duration: BigInt(365 * 24 * 60 * 60 * year),
        contract: ETHRegistrarController,
      });

      console.log(_fee);

      setFee(_fee.base);

      const _ethPrice = await latestAnswer({ contract: PriceOracle });
      const _usdFee =
        ((Number(toEther(_fee.base)) + Number(gas)) * Number(_ethPrice)) / 1e8;
      setEthPrice(Number(_ethPrice));
      setUsdFee(_usdFee);

      setTotalFee(Number(toEther(_fee.base)) + Number(gas));
    }

    if (isOpen) {
      getFee();
      prepare();
    }
  }, [year, rootContract, connected, isOpen]);

  async function claimVid() {
    // setIsMinting(true);
    // if (!isValidSignHash(signHash, signDate)) {
    //   setSignMessage(
    //     primaryName && primaryName?.name !== ''
    //       ? `Hey there ${primaryName.name}, ${SIGN_MESSAGE} ${getCurrentDateUnix()}`
    //       : `${SIGN_MESSAGE} ${getCurrentDateUnix()}`
    //   );
    //   // console.log('need to sign');
    //   setIsMinting(false);
    //   return;
    // }
    // setMessage({ type: '', title: '', msg: '' });
    // const certificateAddr = await rootContract.methods
    //   .resolve({ path: `${name}.${TLD}`, answerId: 0 })
    //   .call({ responsible: true });
    // console.log(certificateAddr);
    // const domainContract = new provider.Contract(DomainAbi, certificateAddr.certificate);
    // console.log(domainContract);
    // try {
    //   // @ts-ignore: Unreachable code error
    //   let result: { status: string | number } = await domainContract.methods
    //     .getStatus({ answerId: 0 })
    //     .call();
    //   setNameExists(result ? true : false);
    //   toast.closeAll();
    //   toast({
    //     status: 'error',
    //     title: 'Already Registered',
    //     colorScheme: colorMode === 'dark' ? 'light' : 'dark',
    //     description: `Unfortunately ${name}.${TLD} is already registered! Please try another name`,
    //     duration: null,
    //     isClosable: true
    //   });
    //   setIsMinting(false);
    //   _setOpen(false);
    //   return;
    // } catch (e) {
    //   setNameExists(false);
    // }
    // if (
    //   provider &&
    //   provider?.isInitialized &&
    //   rootContract &&
    //   rootContract.methods !== undefined &&
    //   !nameExists &&
    //   connectedAccount.length > 60
    // ) {
    //   toast.closeAll();
    //   // toast({
    //   //   status: 'loading',
    //   //   colorScheme: colorMode === 'dark' ? 'light' : 'dark',
    //   //   title: t('minting'),
    //   //   description: t('confirmInWallet'),
    //   //   duration: null,
    //   // });
    //   // const activate = await rootContract.methods.activate()
    //   //   .send({
    //   //     from: new Address(connectedAccount),
    //   //     amount: String((2e9)),
    //   //     bounce: true,
    //   //   })
    //   //   console.log(activate);
    //   //   return;
    //   // if(!fee) return;
    //   const { payload } = await rootContract.methods
    //     .buildRegisterPayload({
    //       name: `${name}`,
    //       answerId: 22,
    //     })
    //     .call({ responsible: true });
    //   console.log(payload);
    //   // @ts-ignore: Unreachable code error
    //   const mintTx = await rootContract.methods
    //     .register({
    //       payload: payload,
    //     })
    //     .send({
    //       from: new Address(connectedAccount),
    //       amount: String(totalFee),
    //       bounce: true,
    //     })
    //     .catch((e: any) => {
    //       if (e.code === 3) {
    //         // rejected by a user
    //         setIsMinting(false);
    //         toast.closeAll();
    //         return Promise.resolve(null);
    //       } else {
    //         setIsMinting(false);
    //         // console.log(e);
    //         toast.closeAll();
    //         return Promise.reject(e);
    //       }
    //     });
    //   if (mintTx) {
    //     toast.closeAll();
    //     toast({
    //       status: 'loading',
    //       title: t('confirming'),
    //       colorScheme: colorMode === 'dark' ? 'light' : 'dark',
    //       description: t('confirmingTx'),
    //       duration: null,
    //     });
    //     //// console.log('mint tx : ', mintTx);
    //     setIsConfirming(true);
    //     let receiptTx: Transaction | undefined;
    //     const subscriber = provider && new provider.Subscriber();
    //     if (subscriber)
    //       await subscriber
    //         .trace(mintTx)
    //         .tap((tx_in_tree: any) => {
    //           //console.log('tx_in_tree : ', tx_in_tree);
    //           if (tx_in_tree.account.equals(rootContract.address)) {
    //             receiptTx = tx_in_tree;
    //           }
    //         })
    //         .finished();
    //     let events = await rootContract.decodeTransactionEvents({
    //       transaction: receiptTx as Transaction,
    //     });
    //     console.log(events);
    //     if (events.length !== 1 || events[0].event !== 'NftCreated') {
    //       toast.closeAll();
    //       toast({
    //         status: 'error',
    //         title: t('error'),
    //         description: t('commonErrorMsg'),
    //         isClosable: true,
    //       });
    //     } else {
    //       // @ts-ignore: Unreachable code error
    //       const nftAddress = String(events[0].data?.nft && events[0].data?.nft?._address);
    //       setClaimedName(name);
    //       toast.closeAll();
    //       setMessage({
    //         type: 'success',
    //         title: t('mintSuccess'),
    //         msg: t('mintSuccessMsg'),
    //         link: nftAddress,
    //       });
    //       setPath('');
    //       if (primaryName?.name === '') {
    //         setPrimaryName({ name: `${name}.${TLD}`, nftAddress: nftAddress });
    //       }
    //     }
    //     setIsMinting(false);
    //     setIsConfirming(false);
    //     _setOpen(false);
    //   } else {
    //     toast.closeAll();
    //     toast({
    //       status: 'error',
    //       title: t('error'),
    //       description: t('commonErrorMsg'),
    //       isClosable: true,
    //     });
    //     setIsMinting(false);
    //     setIsConfirming(false);
    //   }
    // } else {
    //   toast.closeAll();
    //   setIsMinting(false);
    // }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => _setOpen(false)}
        size={["full", "full", "3xl"]}
        isCentered
      >
        <ModalOverlay
          bg="blackAlpha.700"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent
          bg={
            isMinting || isConfirming
              ? lightMode
                ? "var(--base0)"
                : "var(--base2)"
              : colorMode === "dark"
              ? "var(--dark1)"
              : "var(--white)"
          }
          transition={"all ease 1s"}
        >
          <ModalHeader
            display={"flex"}
            fontSize={["xl", "2xl"]}
            justifyContent={"center"}
            gap={1}
            fontWeight={"normal"}
            cursor={"default"}
          >
            Registering Domain
          </ModalHeader>
          {notMobile && <ModalCloseButton />}
          <ModalBody as={Flex} direction={"column"} justify={"center"}>
            {step === 1 && (
              <Flex gap={10} direction={"column"} justify={"center"}>
                <Flex
                  fontWeight={"light"}
                  fontSize={["xl", "2xl", "3xl"]}
                  gap={1}
                  justify={"center"}
                >
                  <Text>
                    {name}.{TLD}
                  </Text>
                </Flex>
                <Flex gap={2} align={"center"}>
                  <Button
                    height={"68px"}
                    rounded={"full"}
                    fontSize={"4xl"}
                    variant={"border"}
                    isDisabled={year === 1}
                    colorScheme="venom"
                    size={"lg"}
                    onClick={() => setYear((y) => (y > 1 ? y - 1 : 1))}
                  >
                    -
                  </Button>
                  <Text
                    fontSize={["xl", "2xl", "3xl"]}
                    flexGrow={1}
                    textAlign={"center"}
                  >
                    {year} {year > 1 ? "years" : "year"}
                  </Text>
                  <Button
                    height={"68px"}
                    colorScheme="venom"
                    variant={"border"}
                    px={5}
                    fontSize={"4xl"}
                    rounded={"full"}
                    isDisabled={year === 10}
                    size={"lg"}
                    onClick={() => setYear((y) => y + 1)}
                  >
                    +
                  </Button>
                </Flex>
                <Flex
                  align={"center"}
                  bg={
                    colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"
                  }
                  p={4}
                  direction={"column"}
                  gap={2}
                  rounded={"lg"}
                  fontSize={["md", "lg"]}
                >
                  <Flex justify={"space-between"} w={"100%"}>
                    <Text>
                      {year} {year > 1 ? "years" : "year"} registration
                    </Text>

                    <Center gap={2}>
                      <Text textAlign={"right"}>
                        {fee
                          ? `${Number(toEther(fee)).toFixed(5)} ETH `
                          : "Calculating..."}
                      </Text>
                    </Center>
                  </Flex>
                  <Flex justify={"space-between"} w={"100%"}>
                    <Text>Est. network fee</Text>
                    <Text>{`${gas} ETH`}</Text>
                  </Flex>

                  <Flex
                    justify={"space-between"}
                    w={"100%"}
                    fontSize={["lg", "xl"]}
                    fontWeight={"bold"}
                  >
                    <Text>Estimated Total fee</Text>
                    <Stack>
                      <Text textAlign={"right"}>
                        {totalFee?.toFixed(5)} ETH
                      </Text>
                      <Text textAlign={"right"} fontSize={"md"}>
                        {fee ? ` $${usdFee?.toFixed(0)} USD ` : ``}
                      </Text>
                    </Stack>
                  </Flex>
                </Flex>
                <Flex
                  align={"center"}
                  bg={
                    colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"
                  }
                  p={4}
                  direction={"column"}
                  gap={2}
                  rounded={"lg"}
                  fontSize={["lg", "xl"]}
                >
                  <Flex justify={"space-between"} w={"100%"}>
                    <Stack>
                      <Text fontSize={"xl"} fontWeight={"bold"}>
                        Set As Primary
                      </Text>
                      <Text fontSize={"small"}>
                        This links your address to this name, allowing dApps to
                        display it as your profile when connected to them. You
                        can only have one primary name per address.
                      </Text>
                    </Stack>
                    <Switch
                      colorScheme="venom"
                      size={"lg"}
                      isChecked={isPrimary}
                      onChange={() => setIsPrimary((s) => !s)}
                    ></Switch>
                  </Flex>
                </Flex>
              </Flex>
            )}
            {step === 2 && (
              <Flex gap={10} direction={"column"} justify={"center"}>
                <Flex
                  fontWeight={"light"}
                  fontSize={["xl", "2xl"]}
                  gap={1}
                  justify={"center"}
                >
                  <Text>Create Your Profile</Text>
                </Flex>

                <EditAvatar onClick={saveAvatar} />
                <CropAvatar />
                <AddModal type="full" />
                {/* <ManageWallets json={{}} /> */}
              </Flex>
            )}
            {step === 3 && (
              <Flex gap={6} direction={"column"} justify={"center"}>
                <SimpleGrid columns={[1, 3]} gap={4}>
                  <TextIcon
                    text="Complete a transaction to begin the timer"
                    icon={
                      <Center
                        rounded="full"
                        bgColor={"var(--base0)"}
                        w={"50px"}
                        h={"50px"}
                        fontWeight={"bold"}
                        fontSize={"2xl"}
                      >
                        1
                      </Center>
                    }
                  />
                  <TextIcon
                    text="Wait 10 seconds for the timer to complete"
                    icon={
                      <Center
                        rounded="full"
                        bgColor={"var(--base0)"}
                        w={"50px"}
                        h={"50px"}
                        fontWeight={"bold"}
                        fontSize={"2xl"}
                      >
                        2
                      </Center>
                    }
                  />
                  <TextIcon
                    text="Complete a second transaction to secure your name"
                    icon={
                      <Center
                        rounded="full"
                        bgColor={"var(--base0)"}
                        w={"50px"}
                        h={"50px"}
                        fontWeight={"bold"}
                        fontSize={"2xl"}
                      >
                        3
                      </Center>
                    }
                  />
                </SimpleGrid>

                <Flex
                  align={"center"}
                  bg={
                    colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"
                  }
                  p={4}
                  direction={"column"}
                  gap={2}
                  rounded={"lg"}
                  fontSize={["md", "lg"]}
                >
                  <Flex justify={"space-between"} w={"100%"}>
                    <Text>
                      {year} {year > 1 ? "years" : "year"} registration
                    </Text>

                    <Center gap={2}>
                      <Text textAlign={"right"}>
                        {fee
                          ? `${Number(toEther(fee)).toFixed(5)} ETH `
                          : "Calculating..."}
                      </Text>
                    </Center>
                  </Flex>
                  <Flex justify={"space-between"} w={"100%"}>
                    <Text>Est. network fee</Text>
                    <Text>{`${gas} ETH`}</Text>
                  </Flex>

                  <Flex
                    justify={"space-between"}
                    w={"100%"}
                    fontSize={["lg", "xl"]}
                    fontWeight={"bold"}
                  >
                    <Text>Estimated Total fee</Text>
                    <Stack>
                      <Text textAlign={"right"}>
                        {totalFee?.toFixed(5)} ETH
                      </Text>
                      <Text textAlign={"right"} fontSize={"md"}>
                        {fee ? ` $${usdFee?.toFixed(0)} USD ` : ``}
                      </Text>
                    </Stack>
                  </Flex>
                </Flex>
              </Flex>
            )}
            {step === 4 && (
              <>
                <Flex gap={6} direction={"column"} justify={"center"}>
                  {(isMinting || isConfirming) && (
                    <Center minH={246} flexDirection={"column"} gap={6}>
                      {isMinting && (
                        <Text
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          textAlign={"center"}
                        >
                          {loadingText}
                        </Text>
                      )}
                      <Spinner size={"xl"} />
                    </Center>
                  )}
                  {!isMinting && !isConfirming && (
                    <>
                      <Center flexDirection={"column"} gap={4}>
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                          Confirm Details
                        </Text>
                        <Text textAlign={"center"}>
                          Double check these details before confirming in your
                          wallet
                        </Text>
                      </Center>
                      <Flex
                        align={"center"}
                        bg={
                          colorMode === "light"
                            ? "blackAlpha.100"
                            : "whiteAlpha.100"
                        }
                        p={4}
                        direction={"column"}
                        gap={2}
                        rounded={"lg"}
                        fontSize={["lg", "xl"]}
                      >
                        <Flex justify={"space-between"} w={"100%"}>
                          <Text fontWeight={"bold"}>Name</Text>

                          <Text>{`${name}.mon`} </Text>
                        </Flex>
                        <Flex justify={"space-between"} w={"100%"}>
                          <Text fontWeight={"bold"}>Duration</Text>

                          <Text>
                            {year} {year > 1 ? "years" : "year"}{" "}
                          </Text>
                        </Flex>
                        <Flex
                          justify={"space-between"}
                          w={"100%"}
                          fontSize={["lg", "xl"]}
                          fontWeight={"bold"}
                        >
                          <Text>est. Total fee</Text>
                          <Stack>
                            <Text textAlign={"right"}>
                              {totalFee?.toFixed(5)} ETH
                            </Text>
                            <Text textAlign={"right"} fontSize={"md"}>
                              {fee ? ` $${usdFee?.toFixed(0)} USD ` : ``}
                            </Text>
                          </Stack>
                        </Flex>
                      </Flex>
                    </>
                  )}
                </Flex>
              </>
            )}

            {step === 5 && (
              <>
                <Flex gap={6} direction={"column"} justify={"center"}>
                  {(isMinting || isConfirming) && (
                    <Center minH={246} flexDirection={"column"} gap={6}>
                      {isMinting && (
                        <Text
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          textAlign={"center"}
                        >
                          {loadingText}
                        </Text>
                      )}
                      <Spinner size={"xl"} />
                    </Center>
                  )}
                  {!isMinting && !isConfirming && (
                    <>
                      <Center flexDirection={"column"} gap={8}>
                        {!timerPassed ? (
                          <>
                            <Text fontSize={"xl"} fontWeight={"bold"}>
                              Timer Started
                            </Text>
                            <Text textAlign={"center"}>
                              Wait 10 seconds and Complete the second
                              transaction
                            </Text>
                            <CountdownCircleTimer
                              isPlaying
                              duration={10}
                              colors={[
                                "#c1aaff",
                                "#946eff",
                                "#7951e9",
                                "#6343bb",
                              ]}
                              colorsTime={[10, 6, 3, 0]}
                              onComplete={() => {
                                setTimerPassed(true);
                                return { shouldRepeat: false, delay: 1 };
                              }}
                            >
                              {({ remainingTime }) => remainingTime}
                            </CountdownCircleTimer>
                          </>
                        ) : (
                          <>
                            <Text fontSize={"xl"} fontWeight={"bold"}>
                              Last Step
                            </Text>
                            <Text textAlign={"center"}>
                              Complete a second transaction to secure your name
                            </Text>
                          </>
                        )}
                      </Center>
                    </>
                  )}
                </Flex>
              </>
            )}

            {step === 6 && (
              <>
                <Flex gap={6} direction={"column"} justify={"center"}>
                  {!isMinting && !isConfirming && (
                    <>
                      <Center flexDirection={"column"} gap={4}>
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                          Name Registered!
                        </Text>
                        <ImageBox
                          size={["100%", "xs"]}
                          srcUrl={`${METADATA_URL}preview/${name}.mon`}
                          rounded={"xl"}
                        />
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                          {name}.mon
                        </Text>
                        <Button
                          w={["100%", "xs"]}
                          as={Link}
                          href={SITE_PROFILE_URL + name + ".mon"}
                          target="_blank"
                          size={"lg"}
                        >
                          View Profile!
                        </Button>
                        <Button
                          w={["100%", "xs"]}
                          as={Link}
                          href={ETHERSCAN_ADDRESS + registeredTx}
                          target="_blank"
                          size={"lg"}
                        >
                          View TX On Arbiscan!
                        </Button>
                      </Center>
                    </>
                  )}
                </Flex>
              </>
            )}
          </ModalBody>
          <ModalFooter py={8}>
            <Flex justify={step === 6 ? "center" : "space-between"} w={"100%"}>
              <Button
                rounded={"full"}
                height={["58px"]}
                isDisabled={isMinting || isConfirming}
                size="lg"
                variant={"border"}
                onClick={() => {
                  switch (step) {
                    case 1:
                      _setOpen(false);
                      break;

                    case 6:
                      _setOpen(false);
                      setStep(1);
                      break;
                    case 3:
                      setStep((s) => s - 2);
                        break;

                    default:
                      setStep((s) => s - 1);
                      break;
                  }
                }}
              >
                {step === 1 || step === 6 ? "Close" : "Back"}
              </Button>

              {step === 1 && (
                <Button
                  colorScheme="venom"
                  rounded={"full"}
                  size="lg"
                  fontSize={"xl"}
                  variant={"border"}
                  height={["58px"]}
                  isDisabled={!fee || isMinting || isConfirming}
                  // isLoading={feeIsLoading || isMinting}
                  // loadingText={
                  //   isMinting && !isConfirming
                  //     ? 'Claiming ...'
                  //     : isMinting && isConfirming
                  //     ? t('confirming')
                  //     : ''
                  // }
                  onClick={() => setStep(3)}
                >
                  Confirm
                </Button>
              )}
              {step === 2 && (
                <Button
                  colorScheme="venom"
                  rounded={"full"}
                  size="lg"
                  fontSize={"xl"}
                  variant={"border"}
                  height={["58px"]}
                  isDisabled={!fee || isMinting || isConfirming}
                  // isLoading={feeIsLoading || isMinting}
                  // loadingText={
                  //   isMinting && !isConfirming
                  //     ? 'Claiming ...'
                  //     : isMinting && isConfirming
                  //     ? t('confirming')
                  //     : ''
                  // }
                  onClick={() => setStep(3)}
                >
                  {avatar ? "Next" : "Skip Profile"}
                </Button>
              )}
              {step === 3 && (
                <Button
                  colorScheme="venom"
                  rounded={"full"}
                  size="lg"
                  fontSize={"xl"}
                  variant={"border"}
                  height={["58px"]}
                  isDisabled={!fee || isMinting || isConfirming}
                  // isLoading={feeIsLoading || isMinting}
                  // loadingText={
                  //   isMinting && !isConfirming
                  //     ? 'Claiming ...'
                  //     : isMinting && isConfirming
                  //     ? t('confirming')
                  //     : ''
                  // }
                  onClick={() => setStep(4)}
                >
                  {"Begin"}
                </Button>
              )}

              {step === 4 && (
                <TransactionButton
                  style={{ borderRadius: "54px" }}
                  transaction={() => {
                    setLoadingText(t("confirmInWallet"));
                    const tx = prepareContractCall({
                      contract: ETHRegistrarController,
                      method: "commit",
                      params: [cmHash],
                    });
                    return tx;
                  }}
                  onTransactionSent={(result) => {
                    setLoadingText(t("submitedTransaction"));
                    console.log(
                      "Transaction submitted",
                      result.transactionHash
                    );
                    console.log(result);
                  }}
                  onTransactionConfirmed={(receipt) => {
                    console.log(
                      "Transaction confirmed",
                      receipt.transactionHash
                    );
                    console.log(receipt);
                    setIsMinting(false);
                    setTimerPassed(false);
                    setStep(5);
                  }}
                  onError={(error) => {
                    console.error("Transaction error", error);
                    setIsMinting(false);
                  }}
                  onClick={() => setIsMinting(true)}
                >
                  Open Wallet
                </TransactionButton>
              )}

              {step === 5 && timerPassed && (
                <TransactionButton
                  style={{ borderRadius: "54px" }}
                  transaction={() => {
                    setLoadingText(t("confirmInWallet"));
                    const tx = prepareContractCall({
                      contract: ETHRegistrarController,
                      method: "register",
                      value: toWei(String(totalFee! + totalFee! * 0.1)),
                      params: [
                        name,
                        address!,
                        BigInt(365 * 24 * 60 * 60 * year),
                        secret,
                        Resolver.address,
                        recordsData ?? [],
                        isPrimary,
                        0,
                        BigInt(
                          BigNumber.from(new Uint8Array(8).fill(255)).toString()
                        ),
                      ],
                    });
                    console.log(tx);
                    return tx;
                  }}
                  onTransactionSent={(result) => {
                    setLoadingText(t("submitedTransaction"));
                    console.log(
                      "Transaction submitted",
                      result.transactionHash
                    );
                    console.log(result);
                  }}
                  onTransactionConfirmed={(receipt) => {
                    console.log(
                      "Transaction confirmed",
                      receipt.transactionHash
                    );
                    setRegisteredTx(receipt.transactionHash);
                    console.log(receipt);
                    setIsMinting(false);
                    setStep(6);
                  }}
                  onError={(error) => {
                    console.error("Transaction error", error);
                    setIsMinting(false);
                  }}
                  disabled={!timerPassed}
                  onClick={() => setIsMinting(true)}
                >
                  Open Wallet
                </TransactionButton>
              )}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ClaimModal claimedName={claimedName} message={message} />
    </>
  );
}

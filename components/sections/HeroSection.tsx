import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Center,
  SimpleGrid,
  HStack,
  Grid,
  GridItem,
  useColorMode,
  Flex,
  Link,
  Badge,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
  textDecoration,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslate } from "core/lib/hooks/use-translate";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  AVATAR_API_URL,
  BG_COLORS,
  OASIS_COLLECTION,
  RAFFLE_CONTRACT_ADDRESS,
  SITE_PROFILE_URL,
} from "core/utils/constants";
import { motion } from "framer-motion";
import { LinkIcon, Logo, LogoIcon } from "components/logos";
import {
  ECOSYSTEM_APPS,
  ECOSYSTEM_CATEGORIES,
  EcosystemAppType,
} from "core/utils/ecosystem";
import { useEffect, useState } from "react";
import ImageBox from "components/claiming/ImageBox";
import DomainTag from "components/features/DomainTag";
import Canvas3DText from "components/ui/Canvas";
import BouncingButton from "components/ui/BouncingButton";

export default function HeroSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery("(min-width: 1200px)");
  const { colorMode } = useColorMode();
  const lightMode = colorMode === "light";

  return (
    <motion.div key={"hero"}>
      <Container
        maxW="container.xl"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH={"80vh"}
      >
        <Canvas3DText
          boxSize={notMobile ? 15 : 5}
          shadowColor={lightMode ? "#c1aaff" : "#282354"}
          colors={lightMode ? "#6343bb" : "#c1aaff"}
          bgColor={lightMode ? ["#f9f7ff", "#d6d1e6"] : ["#6343bb", "#31225e"]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: -1, // Set behind other content
            pointerEvents: 'auto',
          }}
        />
        <Stack px={[0, 4, 6]} align={"center"}>
          <Center
            flexDirection={"column"}
            p={[4, 6, 8, 16]}
            py={[8,8,12,16]}
            rounded={"2xl"}
            gap={8}
            w={"100%"}
          >
            <Heading
              pointerEvents={"none"}
              fontSize={["3xl", "4xl"]}
              fontWeight={"bolder"}
              pt={24}
              textAlign={"center"}
            >
              Your Web3 Profile
            </Heading>
            <Text pointerEvents={"none"} fontSize={["lg","2xl"]} textAlign={"center"}>
              Unleash your unified digital identity and Curate your presence in
              your own style
            </Text>
            <Center flexDirection={["column", "column", "row"]} gap={6}>
              <NextLink href={"/app"} passHref>
                <Button size={"lg"} colorScheme={"venom"}>
                  {t("Register Your Name")}
                </Button>
              </NextLink>
              <Button size={"lg"}>Developer Docs (Soon)</Button>
            </Center>
            <BouncingButton
              as={Link}
              // @ts-ignore
              href="#what"
              size={"lg"}
              variant={"ghost"}
            >
              <LinkIcon type="RiArrowDownDoubleLine" />
            </BouncingButton>
          </Center>
        </Stack>
      </Container>
    </motion.div>
  );
}

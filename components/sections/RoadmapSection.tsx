import {
  Button,
  useColorMode,
  Container,
  Heading,
  Text,
  useMediaQuery,
  Box,
  Center,
  Checkbox,
  Img,
  Stack,
  Flex,
  Progress,
  LightMode,
} from "@chakra-ui/react";
import { LinkIcon } from "components/logos";
import { useTranslate } from "core/lib/hooks/use-translate";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default function RoadmapSection() {
  const { t } = useTranslate();
  const { colorMode } = useColorMode();
  const lightMode = colorMode === 'light';
  const [notMobile] = useMediaQuery("(min-width: 769px)");
  return (
    <Box id="roadmap">
      <Container
        as="main"
        maxW="100%"
        width={"100%"}
        px={0}
        minH="100vh"
        py={10}
      >
        <Flex w={'100%'} direction={'column'} gap={8}>

        <Box gap={4} my={10} width={'100%'}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={"center"}
            >
              <Heading fontWeight="bold" fontSize="5xl" textAlign={"center"}>
                {t("roadmap")}
              </Heading>
              <Text
                fontWeight="bold"
                fontSize={notMobile ? "3xl" : "2xl"}
                my={6}
                textAlign={"center"}
              >
                {t("roadmapDescription")}
              </Text>
            </Box>
          </Box>
        <>
          {/* @ts-ignore */}
          <VerticalTimeline lineColor={lightMode ? 'var(--base)' : 'var(--base000)'}>
            {/* @ts-ignore */}
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: lightMode ? "var(--base000)" : "var(--base0)", color: lightMode ? "#000" : "#fff" }}
              contentArrowStyle={{
                borderRight: `7px solid #946eff77`,
              }}
              date="2024 - 3rd Q - present"
              iconStyle={{ background: "var(--base)", color: "#fff" }}
              icon={<LinkIcon type="RiNumber1" />}
            >
              <Flex flexDirection={"column"} width={"100%"} p={2} gap={4}>
                <Text
                  fontWeight="bold"
                  fontSize={notMobile ? "3xl" : "2xl"}
                  mb={4}
                  textAlign={"center"}
                >
                  {t("roadmapPhase1")}
                </Text>
                <Progress
                  boxShadow={"base"}
                  height={"2px"}
                  value={65}
                  max={100}
                  sx={{
                    "& > div:first-of-type": {
                      transitionProperty: "width",
                      background:
                        "linear-gradient(to right, #503aa1 10%, #503aa1 90%)",
                    },
                  }}
                  mx={-8}
                  mb={8}
                />
                <Checkbox
                  fontWeight="bold"
                  size="lg"
                  defaultChecked
                  colorScheme={"purple"}
                  isReadOnly
                >
                  {t("roadmapPhase11")}
                </Checkbox>
                <Checkbox
                  fontWeight="bold"
                  colorScheme={"purple"}
                  mt={1}
                  size="lg"
                  defaultChecked
                  isReadOnly
                >
                  {t("roadmapPhase12")}
                </Checkbox>
                <Checkbox
                  fontWeight="bold"
                  colorScheme={"purple"}
                  mt={1}
                  size="lg"
                  defaultChecked
                  isReadOnly
                >
                  {t("roadmapPhase13")}
                </Checkbox>
                <Checkbox
                  fontWeight="bold"
                  mt={1}
                  colorScheme={"purple"}
                  size="lg"
                  defaultChecked
                  isReadOnly
                >
                  {t("roadmapPhase14")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase15")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase16")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase17")}
                </Checkbox>
              </Flex>
            </VerticalTimelineElement>
            {/* @ts-ignore */}
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2024 - 4th Q"
              iconStyle={{ background: "var(--base)", color: "#fff" }}
              icon={<LinkIcon type="RiNumber2" />}
            >
              <LightMode>
              <Flex direction={"column"} w={"100%"} gap={2} p={2} color={'#111'}>
                <Text
                  fontWeight="bold"
                  fontSize={notMobile ? "3xl" : "2xl"}
                  mb={4}
                  textAlign={"center"}
                >
                  {t("roadmapPhase2")}
                </Text>
                <Progress
                  boxShadow={"base"}
                  height={"2px"}
                  value={0}
                  colorScheme={"green"}
                  mx={-8}
                  mb={8}
                />
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase21")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase22")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase23")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase24")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase25")}
                </Checkbox>
                
              </Flex></LightMode>
            </VerticalTimelineElement>
            {/* @ts-ignore */}
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2025 - 1st Q"
              iconStyle={{ background: "var(--base)", color: "#fff" }}
              icon={<LinkIcon type="RiNumber3" />}
            >
              <LightMode>
              <Flex direction={"column"} w={"100%"} gap={2} p={2} color={'#111'}>
                <Text
                  fontWeight="bold"
                  fontSize={notMobile ? "3xl" : "2xl"}
                  mb={4}
                  textAlign={"center"}
                >
                  {t("roadmapPhase3")}
                </Text>
                <Progress
                  boxShadow={"base"}
                  height={"2px"}
                  value={0}
                  colorScheme={"green"}
                  mx={-8}
                  mb={8}
                />
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase31")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase32")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase33")}
                </Checkbox>
                
              </Flex></LightMode>
            </VerticalTimelineElement>
            {/* @ts-ignore */}
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2025 - 2nd Q"
              iconStyle={{ background: "var(--base)", color: "#fff" }}
              icon={<LinkIcon type="RiNumber4" />}
            >
              <LightMode>
              <Flex direction={"column"} w={"100%"} gap={2} p={2} color={'#111'}>
                <Text
                  fontWeight="bold"
                  fontSize={notMobile ? "3xl" : "2xl"}
                  mb={4}
                  textAlign={"center"}
                >
                  {t("roadmapPhase4")}
                </Text>
                <Progress
                  boxShadow={"base"}
                  height={"2px"}
                  value={0}
                  colorScheme={"green"}
                  mx={-8}
                  mb={8}
                />
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase41")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase42")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase43")}
                </Checkbox>
                <Checkbox fontWeight="bold" mt={1} size="lg" isReadOnly>
                  {t("roadmapPhase44")}
                </Checkbox>
              </Flex></LightMode>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </>
        <Stack my={12} w={'100%'} textAlign={'center'}>
              <Text fontWeight={'bold'} fontSize={'md'}>
                {t('roadmapNote')}
              </Text>

              </Stack>
        </Flex>
      </Container>
    </Box>
  );
}

import { Box, Flex, Stack } from "@radix-ui/react-layout";
import { Button } from "components";

interface MenuLayoutProps {
  items: { id: number; label: string; url: string }[];
}

const MenuLayout = ({ items }: MenuLayoutProps) => (
  <Box
    as="nav"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="space-between"
    py={4}
    px={6}
  >
    <Flex flexWrap="wrap" justifyContent="space-between">
      {items.map((item, index) => (
        <Stack key={index} spacing={2}>
          <Button as="a" href={item.url} target="_blank">
            {item.label}
          </Button>
        </Stack>
      ))}
    </Flex>
  </Box>
);

export default MenuLayout;
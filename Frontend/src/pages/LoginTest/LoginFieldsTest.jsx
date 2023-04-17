import { TextInput, PasswordInput, Tooltip, Center, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export function EmailFieldTest({ email, setEmail }) {
  const rightSection = (
    <Tooltip
      label="We store your data securely"
      position="top-end"
      withArrow
      transitionProps={{ transition: "pop-bottom-right" }}
    >
      <Text color="dimmed" sx={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle size="1.1rem" stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  );

  return (
    <TextInput
      rightSection={rightSection}
      label="Email"
      placeholder="Enter your email"
      value={email}
      onChange={(event) => setEmail(event.currentTarget.value)}
    />
  );
}

export function PasswordFieldTest({ password, setPassword }) {
  return (
    <PasswordInput
      label="Password"
      required
      placeholder="Enter your password"
      mt="md"
      value={password}
      onChange={(event) => setPassword(event.currentTarget.value)}
    />
  );
}

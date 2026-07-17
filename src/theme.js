import { createTheme, rem } from "@mantine/core";

export const appTheme = createTheme({
  fontFamily: "Inter, Segoe UI, sans-serif",
  defaultRadius: "md",
  colors: {
    brand: [
      "#eef4ff",
      "#dceaff",
      "#bdd6ff",
      "#8fb8ff",
      "#5b92ff",
      "#2f73f1",
      "#1f5ed7",
      "#1748a8",
      "#123a88",
      "#0d2d66",
    ],
  },
  primaryColor: "brand",
  shadows: {
    md: "0 10px 30px rgba(15, 23, 42, 0.12)",
    xl: "0 24px 60px rgba(15, 23, 42, 0.18)",
  },
  components: {
    Card: {
      defaultProps: {
        radius: "lg",
        padding: "lg",
      },
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
          boxShadow: theme.shadows.md,
          transition: "all 180ms ease",
        },
      }),
    },
    Paper: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        },
      }),
    },
    Table: {
      styles: (theme) => ({
        table: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        },
        th: {
          color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
          fontWeight: 700,
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
        },
        td: {
          color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[8],
        },
      }),
    },
    Modal: {
      styles: (theme) => ({
        content: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        },
        header: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        },
        body: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        },
      }),
    },
    NavLink: {
      styles: (theme) => ({
        root: {
          borderRadius: rem(10),
          color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[8],
        },
      }),
    },
  },
});

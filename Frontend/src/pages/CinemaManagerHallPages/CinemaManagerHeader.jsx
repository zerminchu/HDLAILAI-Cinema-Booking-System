import {
  createStyles,
  Header,
  Group,
  Box,
  rem,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const CinemaManagerHeader = () => {
  const { classes, theme } = useStyles();

  return (
    <Box pb={20}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group sx={{ height: '100%' }} spacing={50} className={classes.hiddenMobile}>
            <a href="#" className={classes.link}>
              Halls
            </a>
            <a href="#" className={classes.link}>
              Movies
            </a>
            <a href="#" className={classes.link}>
              F&B
            </a>
          </Group>
        </Group>
      </Header>
    </Box>
  );
}

export default CinemaManagerHeader;
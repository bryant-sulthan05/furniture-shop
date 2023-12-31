import * as React from 'react';
// function
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Logout, reset } from "../../features/authSlice"
// mui.component
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Grid from '@mui/material/Unstable_Grid2'
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Tooltip, Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar'
// icon.component
import { BsBox2Fill, BsCartFill } from 'react-icons/bs'
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import ListAlt from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    background: '#122D42',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({ children }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openProfile = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // cek sudah login atau belum
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    // logout
    const logout = () => {
        dispatch(Logout());
        dispatch(reset());
        navigate("/home");
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ background: '#122D42' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ mr: 'auto', color: '#FFC436', fontFamily: 'Lato', fontWeight: 'bold' }}>
                        DekorKita
                    </Typography>
                    <Box>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={openProfile ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openProfile ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
                {/* Responsive */}
                <Toolbar sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Grid xs={2}>
                                <Typography
                                    component='a'
                                    href='/home'
                                    sx={{
                                        display: { xs: 'flex', md: 'flex' },
                                        justifyContent: { xs: 'center', md: 'space-between' },
                                        color: '#FFFDE3'
                                    }}>
                                    <Home />
                                </Typography>
                            </Grid>
                            <Grid xs={2}>
                                <Typography
                                    component='a'
                                    href='/list-produk'
                                    sx={{
                                        display: { xs: 'flex', md: 'flex' },
                                        justifyContent: { xs: 'center', md: 'space-between' },
                                        color: '#FFFDE3',
                                        mt: 0.5
                                    }}>
                                    <BsBox2Fill />
                                </Typography>
                            </Grid>
                            <Grid xs={2}>
                                <Typography
                                    component='a'
                                    href='/list-kategori'
                                    sx={{
                                        display: { xs: 'flex', md: 'flex' },
                                        justifyContent: { xs: 'center', md: 'space-between' },
                                        color: '#FFFDE3'
                                    }}>
                                    <ListAlt />
                                </Typography>
                            </Grid>
                            <Grid xs={2}>
                                <Typography
                                    component='a'
                                    href='/list-user'
                                    sx={{
                                        display: { xs: 'flex', md: 'flex' },
                                        justifyContent: { xs: 'center', md: 'space-between' },
                                        color: '#FFFDE3'
                                    }}>
                                    <Person />
                                </Typography>
                            </Grid>
                            <Grid xs={2}>
                                <Typography
                                    component='a'
                                    href='/daftar-transaksi'
                                    sx={{
                                        display: { xs: 'flex', md: 'flex' },
                                        justifyContent: { xs: 'center', md: 'space-between' },
                                        color: '#FFFDE3',
                                        mt: 0.5
                                    }}>
                                    <BsCartFill />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box >
                </Toolbar >
                {/* End Responsive */}
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openProfile}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            width: 150,
                            height: { xs: 125, md: 93 },
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            background: '#F5F5F5',
                            '& .MuiAvatar-root': {
                                width: 28,
                                height: 28,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                background: '#F5F5F5',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                    }
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {user && user.role === "admin" && (
                        <div>
                            <Typography component='a' href='/profile' sx={{ textDecoration: 'none', color: '#61677A' }}>
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> Profil
                                </MenuItem>
                            </Typography>
                            <Divider />
                            <Typography component='a' onClick={logout} sx={{ textDecoration: 'none', color: '#61677A' }}>
                                <MenuItem onClick={handleClose}>
                                    <LogoutIcon />&nbsp;
                                    Logout
                                </MenuItem>
                            </Typography>
                        </div>
                    )}
                </Menu>
            </AppBar >
            <Drawer variant="permanent" open={open} sx={{ display: { xs: 'none', md: 'flex' } }}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon sx={{ color: '#fff' }} /> : <ChevronLeftIcon sx={{ color: '#fff' }} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Typography variant="body1" component='a' href='/home' sx={{ color: '#61677A', textDecoration: 'none' }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Home></Home>
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Typography>
                    <Typography variant="body1" component='a' href='/list-produk' sx={{ color: '#61677A', textDecoration: 'none' }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3.5 : 1,
                                        ml: open ? 0.5 : 1,
                                        justifyContent: 'center',
                                    }}
                                >
                                    <BsBox2Fill></BsBox2Fill>
                                </ListItemIcon>
                                <ListItemText primary={'Produk'} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Typography>
                    <Typography variant="body1" component='a' href='/list-kategori' sx={{ color: '#61677A', textDecoration: 'none' }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <ListAlt></ListAlt>
                                </ListItemIcon>
                                <ListItemText primary={'Kategori'} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Typography>
                    <Typography variant="body1" component='a' href='/list-user' sx={{ color: '#61677A', textDecoration: 'none' }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Person></Person>
                                </ListItemIcon>
                                <ListItemText primary={'User'} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Typography>
                </List>
                <Divider />
                <List>
                    <Typography variant="body1" component='a' href='/daftar-transaksi' sx={{ color: '#61677A', textDecoration: 'none' }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <BsCartFill />
                                </ListItemIcon>
                                <ListItemText primary={'Daftar Transaksi'} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Typography>
                </List>
            </Drawer>
            <main style={{ background: '#F5F5F5', minHeight: '100vh', minWidth: open ? '84.2%' : '95.7%' }}>
                {children}
            </main>
        </Box >
    );
}
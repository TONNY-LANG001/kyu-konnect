// Modularized, creative, large, Kirinyaga-rich, professional, fully featured main Home page.
// 100% ready to split into modules.
// All logic for: large creative slider, floating toggle, left toggle/drawer, registration, sections (Marketplace, Sellers, Buyers), footer, Google sign-in, guest, etc.

import React, { useState, useRef, useEffect } from "react";
import {
  Box, Typography, Avatar, Snackbar, Alert, useMediaQuery, Drawer,
  Button, Slide, Card, Stack, Paper, Divider, List,
  ListItem, ListItemButton, ListItemIcon, ListItemText, InputAdornment,
  TextField, ToggleButton, ToggleButtonGroup, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid, Fab, Tooltip
} from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import StoreIcon from "@mui/icons-material/Store";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VerifiedIcon from "@mui/icons-material/Verified";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

// --- Kirinyaga Color Palette ---
const COLORS = {
  green: "#00843D",         // Kirinyaga deep green
  yellow: "#FFD100",        // Kirinyaga bright yellow
  red: "#D72631",           // Kirinyaga red
  navy: "#1A2340",          // Kirinyaga navy blue
  beige: "#ffecd2",         // creamy white
  white: "#fff",
  sky: "#e8f6ef",
  dark: "#222",
  overlay: "#00843D99",
  toggleFab: "#FFD100",
  toggleFabShadow: "#D7263144",
};

// --- Dummy Data (for Marketplace, Sellers, Buyers) ---
// Replace these with backend fetches for production.
const DUMMY_MARKETPLACE = [
  {
    name: "Kutus Smart Electronics",
    desc: "Phones, laptops, repairs. Best deals in town.",
    services: ["Phones", "Laptops", "Repairs"],
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mwea Paddy Rice Centre",
    desc: "Fresh rice, maize, and farm produce direct from fields.",
    services: ["Rice", "Maize", "Produce"],
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kerugoya Boda Delivery",
    desc: "Fast delivery and errands countywide.",
    services: ["Delivery", "Errands"],
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kagio Fresh Mart",
    desc: "Groceries, fresh produce delivered to your door.",
    services: ["Groceries", "Delivery", "Fruits"],
    img: "https://images.unsplash.com/photo-1514512364185-4c2b678deab3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Wangu Beauty & Salon",
    desc: "Trusted salon and kinyozi for all.",
    services: ["Salon", "Kinyozi", "Styling"],
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
  },
];

const DUMMY_BUYERS = [
  {
    name: "KyU Students",
    desc: "Top buyers of electronics, food, and campus services.",
    img: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Rice Wholesalers",
    desc: "Bulk Mwea rice buyers for Kenyan market.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "County Businesses",
    desc: "Institutions sourcing goods and services from locals.",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Online Shoppers",
    desc: "Locals buying online from Kirinyaga sellers.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
  },
];

// --- Slider Cards Data ---
const SLIDER_CARDS = [
  {
    label: "Explore Kutus Hostels",
    desc: "Comfort and security. Affordable hostels for students.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    icon: HomeWorkIcon,
    color: COLORS.green,
    bg: COLORS.white,
  },
  {
    label: "Mwea Paddy Rice",
    desc: "Order fresh rice. Support local farmers.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    icon: StoreIcon,
    color: COLORS.yellow,
    bg: COLORS.beige,
  },
  {
    label: "Groceries Delivered",
    desc: "Bodas and grocers deliver across Kirinyaga.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
    icon: BusinessIcon,
    color: COLORS.red,
    bg: COLORS.white,
  },
  {
    label: "Verified Local Shops",
    desc: "Trusted businesses, rated by the community.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
    icon: VerifiedIcon,
    color: COLORS.navy,
    bg: COLORS.beige,
  },
  {
    label: "Best Eateries",
    desc: "Great meals, snacks, and discounts for students.",
    image: "https://images.unsplash.com/photo-1514512364185-4c2b678deab3?auto=format&fit=crop&w=1600&q=80",
    icon: RestaurantIcon,
    color: COLORS.red,
    bg: COLORS.white,
  },
];

// --- Search Suggestions ---
const SUGGESTIONS = [
  { text: "Hostels", icon: HomeWorkIcon },
  { text: "Eateries", icon: RestaurantIcon },
  { text: "Second hand", icon: StoreIcon },
  { text: "Verified Businesses", icon: VerifiedIcon },
  { text: "Phone dealers", icon: StoreIcon },
  { text: "Laptop sellers", icon: StoreIcon },
  { text: "Local delivery", icon: BusinessIcon },
  { text: "Study groups", icon: PeopleIcon },
  { text: "Rice buyers", icon: StoreIcon },
  { text: "Student clubs", icon: PeopleIcon },
];

// --- LocalStorage Helpers for Google Emails (if needed) ---
function getSavedGoogleEmails() {
  try {
    const emails = localStorage.getItem("saved_google_emails");
    if (!emails) return [];
    return JSON.parse(emails);
  } catch {
    return [];
  }
}
function saveGoogleEmail(email) {
  try {
    let emails = getSavedGoogleEmails();
    if (!emails.includes(email)) emails = [email, ...emails].slice(0, 5);
    localStorage.setItem("saved_google_emails", JSON.stringify(emails));
  } catch {}
}
function removeGoogleEmail(email) {
  try {
    let emails = getSavedGoogleEmails();
    emails = emails.filter((e) => e !== email);
    localStorage.setItem("saved_google_emails", JSON.stringify(emails));
  } catch {}
}

// --- Google G (SVG) modern icon for Google sign-in buttons ---
const GoogleSvgIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <g>
      <path
        fill="#4285F4"
        d="M43.611 20.083h-1.861V20H24v8h11.299C33.964 32.542 29.407 35 24 35c-6.065 0-11.262-4.06-13.112-9.643H9.79v6.054C13.078 37.214 18.154 41 24 41c6.627 0 12.316-4.382 14.334-10.392 1.008-2.857 1.008-5.898 0-8.855z"
      />
      <path
        fill="#34A853"
        d="M10.888 25.357A10.954 10.954 0 0 1 10 24c0-1.164.197-2.289.555-3.357v-6.055H9.79A16.984 16.984 0 0 0 7 24c0 2.679.66 5.217 1.79 7.357l2.098-6z"
      />
      <path
        fill="#FBBC05"
        d="M24 13c3.274 0 6.23 1.125 8.551 2.985l6.412-6.412C34.316 6.377 29.402 4 24 4c-5.846 0-10.922 3.786-13.21 9.643l6.098 4.719C16.738 14.06 21.935 10 24 10c.523 0 1.039.035 1.545.1C24.703 10.07 24.353 10 24 10z"
      />
      <path
        fill="#EA4335"
        d="M43.611 20.083c0-.693-.062-1.366-.176-2.022H24v8h11.299c-.494 1.458-1.334 2.785-2.403 3.826l7.158 5.568C41.769 33.619 43.611 27.919 43.611 20.083z"
      />
    </g>
  </svg>
);

// --- Section: Header ---
function Header({ isMobile }) {
  return (
    <Box sx={{
      pt: isMobile ? 2.8 : 4.5,
      pb: 0,
      px: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100vw",
    }}>
      <Avatar
        sx={{
          width: 90,
          height: 90,
          mb: 1,
          bgcolor: COLORS.yellow,
          color: COLORS.green,
          fontWeight: 900,
          fontSize: 52,
          boxShadow: "0 4px 22px #FFD10044",
          border: `6px solid ${COLORS.green}`,
        }}
      >
        <HomeWorkIcon fontSize="inherit" />
      </Avatar>
      <Typography
        variant={isMobile ? "h3" : "h2"}
        sx={{
          fontWeight: 900,
          color: COLORS.green,
          letterSpacing: 2,
          mb: 0.5,
          textAlign: "center",
          textShadow: "0 2px 18px #FFD10022",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        KyU Konnect
      </Typography>
      <Typography
        variant={isMobile ? "body1" : "h5"}
        sx={{
          color: COLORS.red,
          fontWeight: 700,
          mb: 0.5,
          textAlign: "center",
          fontSize: isMobile ? "1.14rem" : "1.22rem",
          fontFamily: "Montserrat, sans-serif",
          letterSpacing: 1,
        }}
      >
        Kirinyaga's trusted marketplace for students and businesses.
      </Typography>
    </Box>
  );
}

// --- Section: Drawer (Buyer/Seller, Registration, Google, Guest) ---
function SideDrawer({
  isMobile, open, onClose, role, setRole, onRegister, onGuest, onGoogle
}) {
  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? 260 : 340,
          bgcolor: COLORS.white,
          p: 2.5,
          boxShadow: `4px 0 28px ${COLORS.yellow}44`,
        },
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 900, color: COLORS.green, mb: 2 }}>
          Who are you?
        </Typography>
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={(e, val) => val && setRole(val)}
          sx={{
            gap: 3,
            ".Mui-selected": {
              bgcolor: `${COLORS.yellow} !important`,
              color: `${COLORS.green} !important`,
              fontWeight: 900,
              border: "none",
            },
          }}
        >
          <ToggleButton
            value="buyer"
            sx={{ px: 4, py: 1.2, fontSize: "1.08rem", fontWeight: 700 }}
          >
            <PeopleIcon sx={{ mr: 1 }} />
            Buyer
          </ToggleButton>
          <ToggleButton
            value="seller"
            sx={{ px: 4, py: 1.2, fontSize: "1.08rem", fontWeight: 700 }}
          >
            <BusinessIcon sx={{ mr: 1 }} />
            Seller
          </ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: COLORS.green,
              color: COLORS.white,
              fontWeight: 900,
              py: 1.1,
              fontSize: "1.12rem",
              borderRadius: 2,
            }}
            onClick={onRegister}
          >
            Create Account
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 1,
              borderColor: COLORS.yellow,
              color: COLORS.red,
              fontWeight: 800,
              fontSize: "1.06rem",
              borderRadius: 2,
            }}
            onClick={onGuest}
          >
            Sign in as Guest
          </Button>
          <Button
            fullWidth
            startIcon={<GoogleSvgIcon size={22} />}
            variant="outlined"
            sx={{
              mt: 1,
              borderColor: COLORS.green,
              color: COLORS.green,
              fontWeight: 800,
              fontSize: "1.06rem",
              borderRadius: 2,
            }}
            onClick={onGoogle}
          >
            Sign in via Google
          </Button>
        </Box>
        <Divider sx={{ my: 1.7 }} />
        <Typography
          variant="body2"
          sx={{
            color: COLORS.red,
            fontWeight: 800,
            mb: 0.5,
            textAlign: "center",
          }}
        >
          {role === "seller"
            ? "Sellers must create an account for safety and promotion."
            : "Buyers can sign in for more features or browse as guest."}
        </Typography>
      </Box>
      <Box sx={{ position: "absolute", bottom: 16, left: 18, width: "90%" }}>
        <InfoOutlinedIcon sx={{ color: COLORS.yellow, mr: 1 }} />
        <Typography variant="caption" sx={{ color: COLORS.green }}>
          Your data is safe. Powered by KyU Konnect.
        </Typography>
      </Box>
    </Drawer>
  );
}

// --- Section: Floating FAB ---
function FloatingToggleFAB({ isMobile, onClick, show }) {
  if (!show) return null;
  return (
    <Tooltip title="Switch Buyer/Seller">
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: isMobile ? 22 : 38,
          right: isMobile ? 22 : 38,
          bgcolor: COLORS.toggleFab,
          color: COLORS.red,
          boxShadow: `0 6px 24px ${COLORS.toggleFabShadow}`,
          zIndex: 1500,
          fontSize: 28,
          width: 70,
          height: 70,
          border: `4px solid ${COLORS.green}`,
          transition: "all 0.3s cubic-bezier(.4,2,.4,1)",
          "&:hover": { bgcolor: COLORS.green, color: COLORS.yellow }
        }}
        onClick={onClick}
      >
        <SwapHorizIcon fontSize="inherit" />
      </Fab>
    </Tooltip>
  );
}

// --- Section: Section Toggles (Featured/Marketplace/Sellers/Buyers) ---
function SectionToggles({ showSection, setShowSection, isMobile }) {
  const sections = [
    { key: "featured", label: "Featured" },
    { key: "marketplace", label: "Marketplace" },
    { key: "sellers", label: "Recognized Sellers" },
    { key: "buyers", label: "Recognized Buyers" },
  ];
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        mt: isMobile ? 1.2 : 2.3,
        alignSelf: "center",
        zIndex: 1,
        justifyContent: "center",
      }}
    >
      {sections.map(sec => (
        <Button
          key={sec.key}
          variant={showSection === sec.key ? "contained" : "outlined"}
          onClick={() => setShowSection(sec.key)}
          sx={{
            bgcolor: showSection === sec.key ? COLORS.green : COLORS.white,
            color: showSection === sec.key ? COLORS.white : COLORS.green,
            fontWeight: 900,
            borderRadius: 2,
            borderColor: COLORS.green,
            boxShadow: showSection === sec.key ? "0 2px 8px #00843D22" : undefined,
          }}
        >
          {sec.label}
        </Button>
      ))}
    </Stack>
  );
}

// --- Section: Search Bar with Suggestions ---
function SearchBar({ search, setSearch, showSuggestions, setShowSuggestions, isMobile }) {
  const filteredSuggestions = search
    ? SUGGESTIONS.filter((s) =>
        s.text.toLowerCase().includes(search.toLowerCase())
      )
    : SUGGESTIONS;
  return (
    <Box
      sx={{
        px: isMobile ? 1 : 4,
        position: "relative",
        width: "100vw",
        maxWidth: isMobile ? "100vw" : 540,
        mx: "auto",
        mt: isMobile ? 1.5 : 2,
      }}
    >
      <TextField
        fullWidth
        placeholder="Search hostels, eateries, businesses, deals..."
        variant="outlined"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
          sx: {
            bgcolor: COLORS.white,
            borderRadius: 2,
            fontSize: isMobile ? "1.09rem" : "1.19rem",
          },
        }}
      />
      {showSuggestions && (
        <Paper
          sx={{
            position: "absolute",
            top: "56px",
            left: 0,
            right: 0,
            maxHeight: 320,
            overflowY: "auto",
            zIndex: 1299,
            borderRadius: 2,
            boxShadow: `0 6px 26px ${COLORS.green}66`,
            mt: 1,
            bgcolor: COLORS.white,
            width: "100%",
          }}
        >
          <List>
            {filteredSuggestions.length === 0 ? (
              <ListItem>
                <ListItemText primary="No matches found." />
              </ListItem>
            ) : (
              filteredSuggestions
                .slice(0, 15)
                .map((suggestion, idx) => {
                  const SuggestionIcon = suggestion.icon || HomeWorkIcon;
                  return (
                    <ListItemButton
                      key={suggestion.text + idx}
                      onClick={() => {
                        setSearch(suggestion.text);
                        setShowSuggestions(false);
                      }}
                      sx={{
                        py: isMobile ? 0.5 : 1,
                        px: isMobile ? 1 : 2,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 34 }}>
                        <SuggestionIcon sx={{ color: COLORS.yellow }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={suggestion.text}
                        primaryTypographyProps={{
                          fontSize: isMobile ? "1rem" : "1.14rem",
                          fontWeight: 500,
                        }}
                      />
                    </ListItemButton>
                  );
                })
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
}

// --- Section: Slider (Large, Creative, Auto) ---
function LargeSlider({ isMobile, sliderIdx, slideIn }) {
  return (
    <Box
      sx={{
        mt: isMobile ? 2 : 4,
        mx: "auto",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: isMobile ? 300 : 500,
      }}
    >
      <Slide direction="left" in={slideIn} mountOnEnter unmountOnExit>
        <Card
          sx={{
            width: isMobile ? "98vw" : "90vw",
            maxWidth: isMobile ? "100vw" : 1600,
            minHeight: isMobile ? 260 : 520,
            maxHeight: isMobile ? 380 : 800,
            borderRadius: 10,
            boxShadow: `0 4px 32px ${SLIDER_CARDS[sliderIdx].color}44`,
            display: "flex",
            alignItems: "center",
            px: isMobile ? 2 : 10,
            py: isMobile ? 1 : 8,
            bgcolor: SLIDER_CARDS[sliderIdx].bg,
            position: "relative",
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: isMobile ? 150 : 340,
              height: isMobile ? 150 : 340,
              mr: isMobile ? 2 : 10,
              borderRadius: 6,
              background: `url(${SLIDER_CARDS[sliderIdx].image}) center/cover`,
              boxShadow: `0 1px 28px ${SLIDER_CARDS[sliderIdx].color}55`,
              flexShrink: 0,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: isMobile ? 20 : 120,
                top: isMobile ? 50 : 180,
                bgcolor: `${SLIDER_CARDS[sliderIdx].color}99`,
                borderRadius: "50%",
                p: isMobile ? 2.9 : 7.6,
                display: "flex",
                alignItems: "center",
                boxShadow: `0 2px 18px ${SLIDER_CARDS[sliderIdx].color}44`,
              }}
            >
              {React.createElement(SLIDER_CARDS[sliderIdx].icon, {
                sx: {
                  color: SLIDER_CARDS[sliderIdx].color,
                  fontSize: isMobile ? 60 : 170,
                },
              })}
            </Box>
          </Box>
          <Box>
            <Typography
              variant={isMobile ? "h4" : "h2"}
              sx={{ fontWeight: 900, color: SLIDER_CARDS[sliderIdx].color, fontFamily: "Montserrat, sans-serif" }}
            >
              {SLIDER_CARDS[sliderIdx].label}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: COLORS.red,
                fontWeight: 700,
                mt: 3,
                fontSize: isMobile ? "1.16rem" : "1.42rem",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {SLIDER_CARDS[sliderIdx].desc}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 4,
                bgcolor: SLIDER_CARDS[sliderIdx].color,
                color: COLORS.yellow,
                fontWeight: 900,
                px: 5,
                fontSize: isMobile ? "1.13rem" : "1.34rem",
                borderRadius: 2,
                boxShadow: `0 2px 8px ${SLIDER_CARDS[sliderIdx].color}22`,
              }}
              onClick={() => alert(`Explore ${SLIDER_CARDS[sliderIdx].label}`)}
            >
              Explore
            </Button>
          </Box>
        </Card>
      </Slide>
    </Box>
  );
}

// --- Section: Marketplace (All Kirinyaga) ---
function MarketplaceSection({ isMobile }) {
  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography variant={isMobile ? "h5" : "h3"} sx={{ fontWeight: 900, color: COLORS.green }}>
        Marketplace - Goods & Services (All Kirinyaga)
      </Typography>
      <Typography sx={{ mt: 2, color: COLORS.red, fontWeight: 700 }}>
        Browse goods and services from every sub-county.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {DUMMY_MARKETPLACE.concat(DUMMY_BUYERS).map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={item.name + "-market"}>
            <Card sx={{ borderRadius: 4, boxShadow: "0 2px 16px #00843D22" }}>
              <Box
                sx={{
                  height: 180,
                  background: `url(${item.img}) center/cover`,
                  borderRadius: "4px 4px 0 0",
                }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.navy }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.green }}>{item.desc}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// --- Section: Recognized Sellers ---
function SellersSection({ isMobile }) {
  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography variant={isMobile ? "h5" : "h3"} sx={{ fontWeight: 900, color: COLORS.green }}>
        Most Recognized Sellers in Kirinyaga
      </Typography>
      <Typography sx={{ mt: 2, color: COLORS.red, fontWeight: 700 }}>
        Sellers trusted by the community for quality and service.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {DUMMY_MARKETPLACE.map((seller, idx) => (
          <Grid item xs={12} sm={6} md={4} key={seller.name + "-seller"}>
            <Card sx={{ borderRadius: 4, boxShadow: "0 2px 16px #FFD10022" }}>
              <Box
                sx={{
                  height: 180,
                  background: `url(${seller.img}) center/cover`,
                  borderRadius: "4px 4px 0 0",
                }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.navy }}>
                  {seller.name}
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.green }}>{seller.desc}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// --- Section: Recognized Buyers ---
function BuyersSection({ isMobile }) {
  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography variant={isMobile ? "h5" : "h3"} sx={{ fontWeight: 900, color: COLORS.green }}>
        Most Recognized Buyers in Kirinyaga
      </Typography>
      <Typography sx={{ mt: 2, color: COLORS.yellow, fontWeight: 700 }}>
        Trusted buyers and organizations sourcing from across the county.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {DUMMY_BUYERS.map((buyer, idx) => (
          <Grid item xs={12} sm={6} md={4} key={buyer.name + "-buyer"}>
            <Card sx={{ borderRadius: 4, boxShadow: "0 2px 16px #FFD10022" }}>
              <Box
                sx={{
                  height: 180,
                  background: `url(${buyer.img}) center/cover`,
                  borderRadius: "4px 4px 0 0",
                }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: COLORS.navy }}>
                  {buyer.name}
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.green }}>{buyer.desc}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// --- Section: Register Dialog ---
function RegisterDialog({ open, onClose, onSubmit, registerData, setRegisterData, role }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: 900, color: COLORS.green }}>
        {role === "seller" ? "Register as Seller" : "Register as Buyer"}
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <TextField
              required
              label="Username"
              type="text"
              value={registerData.username}
              onChange={e => setRegisterData(v => ({ ...v, username: e.target.value }))}
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              label="Phone Number"
              type="tel"
              value={registerData.phone}
              onChange={e => setRegisterData(v => ({ ...v, phone: e.target.value }))}
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              label="Email"
              type="email"
              value={registerData.email}
              onChange={e => setRegisterData(v => ({ ...v, email: e.target.value }))}
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              label="Password"
              type="password"
              value={registerData.password}
              onChange={e => setRegisterData(v => ({ ...v, password: e.target.value }))}
              fullWidth
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={onClose} color="secondary" sx={{ color: COLORS.red, fontWeight: 900, fontSize: "1.03rem" }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ bgcolor: COLORS.green, color: COLORS.white, fontWeight: 900, fontSize: "1.03rem" }}>
            Register
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

// --- Section: Footer ---
function AppFooter({ isMobile }) {
  return (
    <Box
      sx={{
        mt: isMobile ? 2 : 4,
        py: isMobile ? 1 : 2,
        px: isMobile ? 1 : 2,
        bgcolor: COLORS.white,
        textAlign: "center",
        borderRadius: 2,
        fontSize: "1.02rem",
        color: COLORS.green,
        boxShadow: `0 2px 8px ${COLORS.green}22`,
        mx: "auto",
        width: "100vw",
        maxWidth: isMobile ? "100vw" : 1200,
        fontWeight: 600,
      }}
    >
      <InfoOutlinedIcon sx={{ mr: 1, color: COLORS.yellow }} fontSize="small" />
      All data is securely transmitted. Professional UI powered by KyU Konnect.
      <br />
      <Typography variant="caption" sx={{ color: COLORS.green, mt: 1, fontWeight: 900 }}>
        Build: v2.0.0
      </Typography>
    </Box>
  );
}

// --- Main HomeScreen ---
export default function HomeScreen() {
  // --- State ---
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [role, setRole] = useState("buyer");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sliderIdx, setSliderIdx] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerData, setRegisterData] = useState({ username: "", phone: "", email: "", password: "" });
  const [user, setUser] = useState(null);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [landingRedirect, setLandingRedirect] = useState(false);
  const [landingRole, setLandingRole] = useState("");
  const [showSection, setShowSection] = useState("featured");
  const [showFloatingToggle, setShowFloatingToggle] = useState(false);

  const isMobile = useMediaQuery("(max-width: 900px)");
  const sliderTimer = useRef(null);

  // --- Slider Auto ---
  useEffect(() => {
    sliderTimer.current = setInterval(() => {
      setSlideIn(false);
      setTimeout(() => {
        setSliderIdx((prev) => (prev + 1) % SLIDER_CARDS.length);
        setSlideIn(true);
      }, 350);
    }, 5000);
    return () => clearInterval(sliderTimer.current);
  }, []);

  // --- Welcome Toast ---
  useEffect(() => {
    if (user && user.username) {
      setWelcomeOpen(true);
      const timer = setTimeout(() => setWelcomeOpen(false), 2200);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // --- Floating Toggle on Scroll ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) setShowFloatingToggle(true);
      else setShowFloatingToggle(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Register Handlers ---
  function handleRegisterOpen() {
    setRegisterOpen(true);
    setRegisterData({ username: "", phone: "", email: "", password: "" });
  }
  function handleRegisterSubmit(e) {
    e.preventDefault();
    setUser({ username: registerData.username, role });
    setRegisterOpen(false);
    setLandingRole(role);
    setLandingRedirect(true);
  }
  function handleSignInGoogle() {
    // TODO: Replace with actual Google OAuth URL in production
    window.location.href = "http://localhost:3000/auth/google";
  }

  // --- LANDING REDIRECT ---
  if (landingRedirect) {
    if (landingRole === "buyer") {
      return (
        <Box sx={{ p: 4, minHeight: "100vh", bgcolor: COLORS.beige }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: COLORS.green, mb: 2 }}>
            Welcome, {user?.username || "Guest"}! (Buyer)
          </Typography>
          <Typography sx={{ color: COLORS.yellow, fontWeight: 900, mb: 2 }}>
            You are browsing as a guest buyer. Browse everything uploaded by sellers county-wide!
          </Typography>
          <MarketplaceSection isMobile={isMobile} />
          <AppFooter isMobile={isMobile} />
        </Box>
      );
    }
    if (landingRole === "seller") {
      return (
        <Box sx={{ p: 4, minHeight: "100vh", bgcolor: COLORS.beige }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: COLORS.green, mb: 2 }}>
            Welcome, {user?.username || "Guest"}! (Seller)
          </Typography>
          <Typography sx={{ color: COLORS.red, fontWeight: 900, mb: 2 }}>
            Message: As a seller, everything you've uploaded appears here. Manage your listings and communicate with buyers!
          </Typography>
          <SellersSection isMobile={isMobile} />
          <AppFooter isMobile={isMobile} />
        </Box>
      );
    }
  }

  // --- Main Render ---
  return (
    <Box sx={{
      minHeight: "100dvh",
      bgcolor: COLORS.beige,
      width: "100vw",
      maxWidth: "100vw",
      p: 0,
      m: 0,
      overflowX: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>
      {/* Welcome Snackbar */}
      <Snackbar
        open={welcomeOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: isMobile ? 1 : 3, zIndex: 1401 }}
        onClose={() => setWelcomeOpen(false)}
        autoHideDuration={2200}
      >
        <Alert
          severity="success"
          sx={{
            fontWeight: 800,
            fontSize: isMobile ? "1.11rem" : "1.33rem",
            bgcolor: COLORS.yellow,
            color: COLORS.green,
          }}
          icon={false}
        >
          Welcome, {user?.username || "User"}!
        </Alert>
      </Snackbar>

      {/* HEADER */}
      <Header isMobile={isMobile} />

      {/* DRAWER LEFT */}
      <SideDrawer
        isMobile={isMobile}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        role={role}
        setRole={setRole}
        onRegister={handleRegisterOpen}
        onGuest={() => {
          setLandingRole(role);
          setLandingRedirect(true);
        }}
        onGoogle={handleSignInGoogle}
      />

      {/* Drawer toggle button (top left) */}
      <Box sx={{ position: "fixed", left: 0, top: isMobile ? 5 : 18, zIndex: 1400 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: COLORS.yellow,
            color: COLORS.green,
            fontWeight: 900,
            borderRadius: "0 18px 18px 0",
            boxShadow: "2px 2px 16px #FFD10022",
            pl: 1.7,
            pr: 2.6,
            py: 1.1,
            minWidth: 0,
            fontSize: isMobile ? "0.92rem" : "1.09rem",
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <PeopleIcon sx={{ mr: 1 }} />
          {role === "seller" ? "Seller" : "Buyer"}
        </Button>
      </Box>

      {/* Floating toggle FAB */}
      <FloatingToggleFAB isMobile={isMobile} onClick={() => setDrawerOpen(true)} show={showFloatingToggle} />

      {/* Section toggles */}
      <SectionToggles showSection={showSection} setShowSection={setShowSection} isMobile={isMobile} />

      {/* Search bar */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        isMobile={isMobile}
      />

      {/* Section switcher */}
      <Box sx={{ width: "100vw", minHeight: 350, mt: isMobile ? 2 : 3 }}>
        {showSection === "featured" && (
          <LargeSlider isMobile={isMobile} sliderIdx={sliderIdx} slideIn={slideIn} />
        )}
        {showSection === "marketplace" && (
          <MarketplaceSection isMobile={isMobile} />
        )}
        {showSection === "sellers" && (
          <SellersSection isMobile={isMobile} />
        )}
        {showSection === "buyers" && (
          <BuyersSection isMobile={isMobile} />
        )}
      </Box>

      {/* Registration dialog */}
      <RegisterDialog
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSubmit={handleRegisterSubmit}
        registerData={registerData}
        setRegisterData={setRegisterData}
        role={role}
      />

      {/* Footer */}
      <AppFooter isMobile={isMobile} />
    </Box>
  );
}      

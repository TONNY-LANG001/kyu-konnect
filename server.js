import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Divider,
  Button,
  Stack,
  Slide,
  IconButton,
  Tooltip,
  Avatar,
  CircularProgress,
  Fade,
  Grow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ComputerIcon from "@mui/icons-material/Computer";
import StoreIcon from "@mui/icons-material/Store";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BusinessIcon from "@mui/icons-material/Business";
import VerifiedIcon from "@mui/icons-material/Verified";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import WifiIcon from "@mui/icons-material/Wifi";
import StarIcon from "@mui/icons-material/Star";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import PrintIcon from "@mui/icons-material/Print";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ChairIcon from "@mui/icons-material/Chair";

// 30+ suggestions with icons & avatars
const DEFAULT_SUGGESTIONS = [
  { text: "Search for hostels", icon: HomeWorkIcon, avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
  { text: "Search for cybercafés", icon: ComputerIcon, avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
  { text: "Search for second hand dealers", icon: StoreIcon, avatar: "https://randomuser.me/api/portraits/men/13.jpg" },
  { text: "Search for eateries", icon: RestaurantIcon, avatar: "https://randomuser.me/api/portraits/women/14.jpg" },
  { text: "Search for kinyozi", icon: PeopleIcon, avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
  { text: "Search for salons", icon: BusinessIcon, avatar: "https://randomuser.me/api/portraits/women/16.jpg" },
  { text: "Search for phone dealers", icon: VerifiedIcon, avatar: "https://randomuser.me/api/portraits/men/17.jpg" },
  { text: "Search for laptop dealers", icon: ComputerIcon, avatar: "https://randomuser.me/api/portraits/women/18.jpg" },
  { text: "Search for bookshops", icon: ChairIcon, avatar: "https://randomuser.me/api/portraits/men/19.jpg" },
  { text: "Search for supermarkets", icon: LocalGroceryStoreIcon, avatar: "https://randomuser.me/api/portraits/women/20.jpg" },
  { text: "Search for fast food", icon: RestaurantIcon, avatar: "https://randomuser.me/api/portraits/men/21.jpg" },
  { text: "Search for freshers guide", icon: PrintIcon, avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
  { text: "Search for electronics", icon: StoreIcon, avatar: "https://randomuser.me/api/portraits/men/23.jpg" },
  { text: "Search for university staff", icon: PeopleIcon, avatar: "https://randomuser.me/api/portraits/women/24.jpg" },
  { text: "Search for lost & found", icon: VerifiedIcon, avatar: "https://randomuser.me/api/portraits/men/25.jpg" },
  { text: "Search for events", icon: PrintIcon, avatar: "https://randomuser.me/api/portraits/women/26.jpg" },
  { text: "Search for parties", icon: StarIcon, avatar: "https://randomuser.me/api/portraits/men/27.jpg" },
  { text: "Search for local businesses", icon: BusinessIcon, avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
  { text: "Search for market days", icon: LocalGroceryStoreIcon, avatar: "https://randomuser.me/api/portraits/men/29.jpg" },
  { text: "Search for study groups", icon: ChairIcon, avatar: "https://randomuser.me/api/portraits/women/30.jpg" },
  { text: "Search for tutors", icon: PeopleIcon, avatar: "https://randomuser.me/api/portraits/men/31.jpg" },
  { text: "Search for sports clubs", icon: StarIcon, avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
  { text: "Search for accommodation", icon: HomeWorkIcon, avatar: "https://randomuser.me/api/portraits/men/33.jpg" },
  { text: "Search for roommates", icon: PeopleIcon, avatar: "https://randomuser.me/api/portraits/women/34.jpg" },
  { text: "Search for deals", icon: StoreIcon, avatar: "https://randomuser.me/api/portraits/men/35.jpg" },
  { text: "Search for discounts", icon: StarIcon, avatar: "https://randomuser.me/api/portraits/women/36.jpg" },
  { text: "Search for job offers", icon: BusinessIcon, avatar: "https://randomuser.me/api/portraits/men/37.jpg" },
  { text: "Search for internships", icon: VerifiedIcon, avatar: "https://randomuser.me/api/portraits/women/38.jpg" },
  { text: "Search for campus notices", icon: PrintIcon, avatar: "https://randomuser.me/api/portraits/men/39.jpg" },
  { text: "Search for campus administration", icon: PeopleIcon, avatar: "https://randomuser.me/api/portraits/women/40.jpg" },
  { text: "Search for student leaders", icon: StarIcon, avatar: "https://randomuser.me/api/portraits/men/41.jpg" }
];

// 5 demo cards
const DEFAULT_CARDS = [
  {
    label: "Find a Hostel",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    desc: "Safe & affordable hostels near KyU.",
    reason: "Accommodation for students",
    icon: HomeWorkIcon,
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    label: "Discover Cybers",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    desc: "Fast internet & printing shops.",
    reason: "Access to digital services",
    icon: ComputerIcon,
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    label: "Second Hand Deals",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    desc: "Thrift clothes, laptops, books.",
    reason: "Affordable student shopping",
    icon: StoreIcon,
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
  },
  {
    label: "Eateries & Cafés",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    desc: "Tasty meals & snacks around campus.",
    reason: "Meals for energy & fun",
    icon: RestaurantIcon,
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
  },
  {
    label: "Salon & Kinyozi",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    desc: "Style & grooming for comrades.",
    reason: "Personal care for confidence",
    icon: BusinessIcon,
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  }
];

const CARD_PRESETS = [
  [
    { icon: VerifiedIcon, label: "Verified", avatar: "https://randomuser.me/api/portraits/men/19.jpg" },
    { icon: PeopleIcon, label: "Community", avatar: "https://randomuser.me/api/portraits/women/20.jpg" },
    { icon: WifiIcon, label: "WiFi", avatar: "https://randomuser.me/api/portraits/men/21.jpg" },
    { icon: SecurityIcon, label: "Security", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { icon: StarIcon, label: "Top Rated", avatar: "https://randomuser.me/api/portraits/men/23.jpg" },
  ],
  [
    { icon: PrintIcon, label: "Printing", avatar: "https://randomuser.me/api/portraits/men/24.jpg" },
    { icon: ComputerIcon, label: "Internet", avatar: "https://randomuser.me/api/portraits/women/25.jpg" },
    { icon: BusinessIcon, label: "Professional", avatar: "https://randomuser.me/api/portraits/men/26.jpg" },
    { icon: StarIcon, label: "Best Prices", avatar: "https://randomuser.me/api/portraits/women/27.jpg" },
    { icon: VerifiedIcon, label: "Trusted", avatar: "https://randomuser.me/api/portraits/men/28.jpg" },
  ],
  [
    { icon: StoreIcon, label: "Quality", avatar: "https://randomuser.me/api/portraits/women/29.jpg" },
    { icon: LocalGroceryStoreIcon, label: "Deals", avatar: "https://randomuser.me/api/portraits/men/30.jpg" },
    { icon: ShoppingBagIcon, label: "Affordable", avatar: "https://randomuser.me/api/portraits/women/31.jpg" },
    { icon: VerifiedIcon, label: "Verified Sellers", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { icon: StarIcon, label: "Top Rated", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
  ],
  [
    { icon: PhoneAndroidIcon, label: "Phones", avatar: "https://randomuser.me/api/portraits/men/34.jpg" },
    { icon: ComputerIcon, label: "Computers", avatar: "https://randomuser.me/api/portraits/women/35.jpg" },
    { icon: StarIcon, label: "Accessories", avatar: "https://randomuser.me/api/portraits/men/36.jpg" },
    { icon: VerifiedIcon, label: "Quality", avatar: "https://randomuser.me/api/portraits/women/37.jpg" },
    { icon: LocalOfferIcon, label: "Discounts", avatar: "https://randomuser.me/api/portraits/men/38.jpg" },
  ],
  [
    { icon: RestaurantIcon, label: "Delicious", avatar: "https://randomuser.me/api/portraits/women/39.jpg" },
    { icon: LocalCafeIcon, label: "Coffee", avatar: "https://randomuser.me/api/portraits/men/40.jpg" },
    { icon: VerifiedIcon, label: "Hygiene", avatar: "https://randomuser.me/api/portraits/women/41.jpg" },
    { icon: StarIcon, label: "Rated", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
    { icon: BusinessIcon, label: "Variety", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
  ],
];

function getCardReasons(idx) {
  return CARD_PRESETS[idx % CARD_PRESETS.length];
}

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [role, setRole] = useState("buyer");
  const [cardIdx, setCardIdx] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [stormSecret, setStormSecret] = useState(false);
  const timeoutRef = useRef();
  const [cards] = useState(DEFAULT_CARDS);
  const [suggestions] = useState(DEFAULT_SUGGESTIONS);

  // Card slider auto
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIn(false);
      setTimeout(() => {
        setCardIdx((prev) => (prev + 1) % cards.length);
        setSlideIn(true);
      }, 300);
    }, 3500);
    return () => clearInterval(timer);
  }, [cards.length]);

  function injectPayload() {
    setStormSecret(true);
    setTimeout(() => setStormSecret(false), 1300);
  }

  const filteredSuggestions = suggestions.filter((s) =>
    s.text.toLowerCase().includes(search.toLowerCase())
  );

  // Card icon/avatar
  const CardIconComponent = cards[cardIdx].icon;
  const CardAvatar = cards[cardIdx].avatar;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f0f1f6", pb: 8 }}>
      {/* Header */}
      <Box sx={{ pt: 4, pb: 0, px: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Avatar src="https://randomuser.me/api/portraits/men/99.jpg" sx={{ width: 48, height: 48, mr: 2 }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#2d3a4b", letterSpacing: 1, mb: 1, textAlign: "center" }}>
            KyU Konnect
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#666", fontWeight: 500, mb: 0.5, textAlign: "center" }}>
            Find anything in Kutus | Powered by Comrades
          </Typography>
        </Box>
      </Box>

      {/* Central Search Bar */}
      <Box sx={{ px: 2, position: "relative", maxWidth: 480, mx: "auto", mt: 2 }}>
        <TextField
          fullWidth
          placeholder="Find hostels, cybers, dealers, businesses..."
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            sx: { bgcolor: "#fff", borderRadius: 2, fontSize: "1.18rem" },
          }}
        />
        {showSuggestions && (
          <Paper
            sx={{
              position: "absolute",
              top: "56px",
              left: 0,
              right: 0,
              maxHeight: 340,
              overflowY: "auto",
              zIndex: 99,
              borderRadius: 2,
              boxShadow: "0 6px 26px #aaa",
              mt: 1,
              bgcolor: "#fff",
            }}
          >
            <List>
              {filteredSuggestions.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No matches found." />
                </ListItem>
              ) : (
                filteredSuggestions.map((suggestion, idx) => {
                  const SuggestionIcon = suggestion.icon;
                  return (
                    <ListItemButton
                      key={suggestion.text + idx}
                      onClick={() => {
                        setSearch(suggestion.text);
                        setShowSuggestions(false);
                      }}
                    >
                      <ListItemIcon>
                        <SuggestionIcon sx={{ color: "#ffd700" }} />
                      </ListItemIcon>
                      <Avatar src={suggestion.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                      <ListItemText primary={suggestion.text} />
                    </ListItemButton>
                  );
                })
              )}
            </List>
          </Paper>
        )}
      </Box>

      {/* Large Card Carousel */}
      <Box sx={{ mt: 5, px: 2, maxWidth: 670, mx: "auto" }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <IconButton
            aria-label="Prev"
            onClick={() => setCardIdx((idx) => (idx - 1 + cards.length) % cards.length)}
          >
            <Tooltip title="Previous">
              <DirectionsCarIcon sx={{ fontSize: 28, color: "#bbb" }} />
            </Tooltip>
          </IconButton>
          <Slide direction={slideIn ? "left" : "right"} in={slideIn} mountOnEnter unmountOnExit>
            <Card
              sx={{
                minWidth: 340,
                maxWidth: 480,
                borderRadius: "24px",
                boxShadow: "0 10px 32px rgba(120,120,150,0.16)",
                background: "linear-gradient(135deg, #fffbe7 70%, #ffd700 100%)",
                p: 2,
                cursor: "pointer",
                userSelect: "none",
                ":active": { boxShadow: "0 2px 8px #ffd700" },
              }}
              onMouseDown={() => {
                timeoutRef.current = setTimeout(() => injectPayload(), 700);
              }}
              onMouseUp={() => {
                clearTimeout(timeoutRef.current);
              }}
              onTouchStart={() => {
                timeoutRef.current = setTimeout(() => injectPayload(), 700);
              }}
              onTouchEnd={() => {
                clearTimeout(timeoutRef.current);
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CardIconComponent sx={{ fontSize: 54, color: "#ffd700", mr: 2 }} />
                <Avatar src={CardAvatar} sx={{ width: 56, height: 56, mr: 2 }} />
                <Box sx={{ borderRadius: 2, overflow: "hidden", mr: 2 }}>
                  <img
                    src={cards[cardIdx].img}
                    alt={cards[cardIdx].label}
                    style={{
                      width: "66px",
                      height: "66px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px #ffd70055",
                      marginRight: "12px"
                    }}
                  />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#2d3a4b" }}>
                  {cards[cardIdx].label}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#7b7b7b", mb: 2, fontWeight: 500 }}>
                {cards[cardIdx].desc}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                {getCardReasons(cardIdx).map((reason, i) => {
                  const ReasonIcon = reason.icon;
                  return (
                    <Box
                      key={reason.label + i}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mx: 0.5,
                      }}
                    >
                      <Fade in timeout={500}>
                        <Avatar src={reason.avatar} sx={{ width: 36, height: 36, mb: 0.5 }} />
                      </Fade>
                      <ReasonIcon sx={{ fontSize: 32, color: "#ffd700" }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#586e85",
                          fontWeight: 600,
                          mt: 0.5,
                          textAlign: "center",
                          lineHeight: 1.1,
                        }}
                      >
                        {reason.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    background: "#fffde4",
                    color: "#e17055",
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    display: "inline-block",
                  }}
                >
                  {cards[cardIdx].reason}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  alignSelf: "flex-end",
                  borderRadius: "12px",
                  fontWeight: 700,
                  background: "#ffd700",
                  color: "#222",
                  boxShadow: "0 2px 8px rgba(120,150,200,0.08)",
                  mt: 2,
                }}
                disabled
              >
                Coming soon
              </Button>
            </Card>
          </Slide>
          <IconButton
            aria-label="Next"
            onClick={() => setCardIdx((idx) => (idx + 1) % cards.length)}
          >
            <Tooltip title="Next">
              <DirectionsCarIcon sx={{ fontSize: 28, color: "#bbb" }} />
            </Tooltip>
          </IconButton>
        </Stack>
        {/* Card Dots */}
        <Box sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "flex-end" }}>
          {cards.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: cardIdx === i ? "#ffd700" : "#eee",
                boxShadow: cardIdx === i ? "0 2px 8px #ffd70066" : "none",
                transition: "all .15s",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Role Toggle */}
      <Box
        sx={{
          mt: 7,
          px: 2,
          py: 3,
          bgcolor: "#fffbe7",
          borderRadius: "18px",
          maxWidth: 650,
          mx: "auto",
          boxShadow: "0 2px 16px #ffd70033",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#2d3a4b", mb: 2 }}
        >
          Are you a seller or buyer?
        </Typography>
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={(e, val) => val && setRole(val)}
          sx={{
            gap: 3,
            ".Mui-selected": {
              bgcolor: "#ffd700 !important",
              color: "#222 !important",
              fontWeight: 700,
              border: "none",
            },
          }}
        >
          <ToggleButton value="buyer" sx={{ px: 5, py: 2, fontSize: "1.2rem" }}>
            Buyer
          </ToggleButton>
          <ToggleButton value="seller" sx={{ px: 5, py: 2, fontSize: "1.2rem" }}>
            Seller
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography
          variant="body2"
          sx={{
            color: "#e17055",
            mt: 2,
            fontWeight: 500,
            letterSpacing: 0.3,
            mb: 0.5,
          }}
        >
          Select your role to get personalized suggestions and offers!
        </Typography>
      </Box>

      {/* Info */}
      <Box sx={{
        mt: 4,
        textAlign: "center",
        color: "#888",
        maxWidth: 400,
        fontSize: "1rem",
        mx: "auto"
      }}>
        <Typography>
          Start by searching for hostels, businesses, or anything you need in Kutus.<br />
          More features will unlock as comrades and locals join.<br />
          <span style={{ color: "#ffd700", fontWeight: 500 }}>Be among the first to connect!</span>
        </Typography>
      </Box>

      {/* Storm secrecy / payload */}
      {stormSecret && (
        <Fade in={stormSecret} timeout={700}>
          <Box
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 99,
              bgcolor: "#ffd700",
              color: "#fff",
              p: 2,
              borderRadius: 2,
              boxShadow: "0 2px 8px #ffd70055",
              fontWeight: 700,
              transition: "opacity .3s",
            }}
          >
            <SecurityIcon sx={{ mr: 1 }} /> Storm secrecy: Payload injected!
          </Box>
        </Fade>
      )}

      {/* Footer */}
      <Box
        sx={{
          mt: 5,
          py: 2,
          px: 2,
          bgcolor: "#f0f4fa",
          textAlign: "left",
          borderRadius: 2,
          fontSize: "0.92rem",
          color: "#e17055",
          boxShadow: "0 2px 8px #ffd70022",
          mx: "auto",
          maxWidth: 650,
        }}
      >
        All data is securely transmitted. Professional UI powered by KyU Konnect.
        <Button
          variant="text"
          size="small"
          sx={{ ml: 2, color: "#ffd700", fontWeight: 700 }}
          onClick={injectPayload}
        >
          Storm secrecy
        </Button>
      </Box>
    </Box>
  );
}

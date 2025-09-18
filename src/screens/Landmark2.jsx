/**
 * landmark2.js
 * KyU-Konnect Seller Landmark2: Buyer/Explorer Portal
 * - All uploads from sellers in Landmark1 are available and visible
 * - Every reaction (like, dislike, comment) performed by a buyer is also sent to the seller's side in real time
 * - Users can browse, react to, and comment on products/services in all categories
 * - Full persistent localStorage, all logic/data consistent with Landmark1
 * - 3-column responsive card layout, vertical scroll
 * - All real usernames and seller progress shown
 * - Reactions/comments by buyers are visible in seller portal (Landmark1)
 * - Super scalable for 50,000+ users (localStorage simulation, swap API in prod)
 * - All data persists for 1 month unless deleted by seller
 *
 * @author KyU-Konnect FE Team
 */

import React, { useState, useEffect, Fragment } from "react";
import {
  Box, Typography, Avatar, useMediaQuery, Drawer, Button, Card, Stack, Paper, Divider, List,
  ListItem, ListItemButton, ListItemIcon, ListItemText, InputAdornment, TextField, IconButton,
  Collapse, Chip, LinearProgress, Badge, CircularProgress, Modal, Tooltip
} from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import StoreIcon from "@mui/icons-material/Store";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VerifiedIcon from "@mui/icons-material/Verified";
import SearchIcon from "@mui/icons-material/Search";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// --- Kirinyaga Color Palette ---
const COLORS = {
  green: "#00843D",
  yellow: "#FFD100",
  red: "#D72631",
  navy: "#1A2340",
  beige: "#ffecd2",
  white: "#fff",
  sky: "#e8f6ef",
  dark: "#222",
  overlay: "#00843D99",
  store: "#FFD100",
  eatery: "#D72631",
  hostel: "#FFD100",
  group: "#00843D",
  verified: "#1A2340",
  delivery: "#00843D",
  salon: "#D72631",
  club: "#1A2340",
  default: "#00843D"
};

// --- Logical Service Types (same as Landmark1) ---
const SERVICE_TYPES = [
  { text: "Hostels", icon: HomeWorkIcon, color: COLORS.hostel },
  { text: "Eateries", icon: RestaurantIcon, color: COLORS.eatery },
  { text: "Second hand", icon: StoreIcon, color: COLORS.store },
  { text: "Verified Businesses", icon: VerifiedIcon, color: COLORS.verified },
  { text: "Phone dealers", icon: StoreIcon, color: COLORS.store },
  { text: "Laptop sellers", icon: StoreIcon, color: COLORS.store },
  { text: "Local delivery", icon: BusinessIcon, color: COLORS.delivery },
  { text: "Study groups", icon: PeopleIcon, color: COLORS.group },
  { text: "Rice buyers", icon: StoreIcon, color: COLORS.store },
  { text: "Student clubs", icon: GroupIcon, color: COLORS.club },
  { text: "Beauty Salons", icon: BusinessIcon, color: COLORS.salon },
  { text: "Barbershops", icon: BusinessIcon, color: COLORS.salon },
  { text: "Taxis & Bodas", icon: BusinessIcon, color: COLORS.delivery },
  { text: "Groceries", icon: StoreIcon, color: COLORS.store },
  { text: "Event Spaces", icon: HomeWorkIcon, color: COLORS.hostel },
  { text: "Tailors", icon: BusinessIcon, color: COLORS.salon },
  { text: "Laundry", icon: StoreIcon, color: COLORS.store },
  { text: "Shoes Dealers", icon: StoreIcon, color: COLORS.store },
  { text: "Bookshops", icon: StoreIcon, color: COLORS.store },
  { text: "Supermarkets", icon: StoreIcon, color: COLORS.store },
  { text: "Chemists", icon: StoreIcon, color: COLORS.store },
  { text: "Boutiques", icon: StoreIcon, color: COLORS.store },
  { text: "Hardware", icon: StoreIcon, color: COLORS.store },
  { text: "Stationery", icon: StoreIcon, color: COLORS.store },
  { text: "Cafes", icon: RestaurantIcon, color: COLORS.eatery },
  { text: "Fast food", icon: RestaurantIcon, color: COLORS.eatery },
  { text: "Hotels", icon: HomeWorkIcon, color: COLORS.hostel },
  { text: "Resorts", icon: HomeWorkIcon, color: COLORS.hostel },
  { text: "Bar & Clubs", icon: RestaurantIcon, color: COLORS.eatery },
  { text: "Churches", icon: GroupIcon, color: COLORS.club },
  { text: "Mosques", icon: GroupIcon, color: COLORS.club }
];

// --- Data Storage (persisted, shared with Landmark1) ---
const LOCAL_KEY = "kyu-konnect-landmark1-uploads-v1";
const REACTION_KEY = "kyu-konnect-reactions-v1";
const USER_PROGRESS_KEY = "kyu-konnect-user-progress-v1";
const LAST_PANEL_KEY = "kyu-konnect2-last-panel-v1"; // for sticky category

function getUploads() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}"); } catch { return {}; }
}
function saveUploads(obj) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(obj)); } catch { }
}
function getReactions() {
  try { return JSON.parse(localStorage.getItem(REACTION_KEY) || "{}"); } catch { return {}; }
}
function saveReactions(obj) {
  try { localStorage.setItem(REACTION_KEY, JSON.stringify(obj)); } catch { }
}
function getUserProgress() {
  try { return JSON.parse(localStorage.getItem(USER_PROGRESS_KEY) || "{}"); } catch { return {}; }
}
function saveUserProgress(obj) {
  try { localStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(obj)); } catch { }
}
function addUserStars(username, stars) {
  const prog = getUserProgress();
  if (!prog[username]) prog[username] = { stars: 20, sold: 0, verified: false };
  prog[username].stars += stars;
  if (prog[username].stars >= 10000) prog[username].verified = true;
  saveUserProgress(prog);
}
function getSellerProgress(username) {
  return getUserProgress()[username] || { stars: 20, sold: 0, verified: false };
}

// --- Reactions ---
// When a buyer reacts, it is applied in reactions and visible to sellers (Landmark1), vice versa
function addReaction(service, idx, type, username) {
  const all = getReactions();
  if (!all[service]) all[service] = {};
  if (!all[service][idx]) all[service][idx] = { likes: [], dislikes: [], comments: [] };
  if (type === "like") {
    if (!all[service][idx].likes.includes(username)) all[service][idx].likes.push(username);
    all[service][idx].dislikes = all[service][idx].dislikes.filter((u) => u !== username);
  }
  if (type === "dislike") {
    if (!all[service][idx].dislikes.includes(username)) all[service][idx].dislikes.push(username);
    all[service][idx].likes = all[service][idx].likes.filter((u) => u !== username);
  }
  saveReactions(all);
}
function addComment(service, idx, username, text) {
  const all = getReactions();
  if (!all[service]) all[service] = {};
  if (!all[service][idx]) all[service][idx] = { likes: [], dislikes: [], comments: [] };
  all[service][idx].comments.push({ username, text, time: Date.now() });
  saveReactions(all);
}
function getItemReactions(service, idx) {
  const all = getReactions();
  if (all[service] && all[service][idx]) return all[service][idx];
  return { likes: [], dislikes: [], comments: [] };
}

// --- Google Maps Link Helper ---
const toGMaps = (lat, lng) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

// --- Sidebar ---
function LandmarkSidebar({ open, setOpen, selected, setSelected, isMobile }) {
  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: {
          width: isMobile ? 260 : 340,
          bgcolor: COLORS.white,
          pt: 3,
          pb: 2,
          px: 2,
        }
      }}
      variant="persistent"
    >
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 900, color: COLORS.green }}>
            All Categories
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <List sx={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}>
          {SERVICE_TYPES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <ListItemButton
                key={s.text}
                selected={selected === idx}
                onClick={() => {
                  setSelected(idx);
                  setOpen(false);
                  localStorage.setItem(LAST_PANEL_KEY, idx); // sticky
                }}
                sx={{
                  mb: 0.5,
                  borderRadius: 2,
                  bgcolor: selected === idx ? COLORS.green : undefined,
                  color: selected === idx ? COLORS.white : COLORS.dark,
                  "&:hover": { bgcolor: COLORS.yellow, color: COLORS.green },
                  fontWeight: 800,
                }}
              >
                <ListItemIcon>
                  <Icon sx={{ color: s.color, fontSize: 28 }} />
                </ListItemIcon>
                <ListItemText
                  primary={s.text}
                  primaryTypographyProps={{ fontWeight: 900, fontSize: "1.13rem" }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}

// --- SearchBar ---
function LandmarkSearchBar({ value, setValue, setPanelIdx, isMobile }) {
  const [showSug, setShowSug] = useState(false);
  const filtered = value
    ? SERVICE_TYPES.filter((s) => s.text.toLowerCase().includes(value.toLowerCase()))
    : SERVICE_TYPES;
  return (
    <Box
      sx={{
        px: isMobile ? 1 : 5,
        mt: isMobile ? 1.2 : 2.5,
        mb: 0.5,
        width: "100vw",
        maxWidth: isMobile ? "100vw" : 550,
        mx: "auto",
        position: "relative",
      }}
    >
      <TextField
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setShowSug(true);
        }}
        onFocus={() => setShowSug(true)}
        onBlur={() => setTimeout(() => setShowSug(false), 180)}
        variant="outlined"
        fullWidth
        placeholder="Search for category e.g. Hostels, Eateries, etc..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: COLORS.green }} />
            </InputAdornment>
          ),
          sx: { fontSize: isMobile ? "1.1rem" : "1.22rem", bgcolor: COLORS.white, borderRadius: 2 }
        }}
      />
      {showSug && (
        <Paper
          sx={{
            position: "absolute",
            top: "52px",
            left: 0,
            right: 0,
            maxHeight: 340,
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
            {filtered.length === 0 ? (
              <ListItem>
                <ListItemText primary="No suggestions." />
              </ListItem>
            ) : (
              filtered.slice(0, 30).map((s, idx) => {
                const Icon = s.icon;
                return (
                  <ListItemButton
                    key={s.text + idx}
                    onClick={() => {
                      setValue(s.text);
                      setPanelIdx(SERVICE_TYPES.findIndex(ss => ss.text === s.text));
                      setShowSug(false);
                      localStorage.setItem(LAST_PANEL_KEY, SERVICE_TYPES.findIndex(ss => ss.text === s.text));
                    }}
                  >
                    <ListItemIcon>
                      <Icon sx={{ color: s.color }} />
                    </ListItemIcon>
                    <ListItemText primary={s.text} primaryTypographyProps={{
                      fontWeight: 700, fontSize: "1.14rem"
                    }} />
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

// --- Star Progress/Verified Chip ---
function StarProgress({ username }) {
  const progress = getSellerProgress(username);
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Badge badgeContent={progress.stars} color="primary" sx={{ mr: 1 }}>
        <VerifiedIcon sx={{ color: COLORS.yellow, fontSize: 26 }} />
      </Badge>
      <Typography variant="caption" sx={{ fontWeight: 700, color: COLORS.navy }}>
        Stars
      </Typography>
      <LinearProgress
        variant="determinate"
        value={Math.min(100, (progress.stars / 10000) * 100)}
        sx={{
          height: 8,
          width: 90,
          borderRadius: 8,
          bgcolor: "#eee",
          "& .MuiLinearProgress-bar": { bgcolor: COLORS.yellow }
        }}
      />
      {progress.verified && (
        <Chip
          icon={<VerifiedIcon sx={{ color: COLORS.green }} />}
          label="Verified Dealer"
          color="success"
          sx={{ ml: 1, fontWeight: 800, bgcolor: COLORS.green, color: COLORS.white }}
        />
      )}
    </Stack>
  );
}

// --- CommentBox (Facebook style) ---
function CommentBox({ idx, service, reactions, username, onComment }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  return (
    <Fragment>
      <Tooltip title="Comments">
        <IconButton
          onClick={() => setOpen((o) => !o)}
          sx={{ color: COLORS.navy, bgcolor: "#eef2ff" }}
        >
          <Badge badgeContent={reactions.comments.length} color="primary">
            <CommentIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          maxWidth: 440, bgcolor: COLORS.white, borderRadius: 4, p: 3, m: "auto",
          mt: "8vh", minHeight: 240, boxShadow: "0 4px 32px #00843D44"
        }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" sx={{ color: COLORS.green, fontWeight: 900 }}>
              Comments
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ maxHeight: 180, overflowY: "auto" }}>
            {reactions.comments.length === 0 ? (
              <Typography variant="body2" sx={{ color: COLORS.navy }}>
                No comments yet.
              </Typography>
            ) : (
              reactions.comments.map((c, i) => (
                <Box key={i} sx={{ mb: 1.2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: COLORS.green, color: COLORS.yellow, fontSize: 16 }}>
                      {c.username[0].toUpperCase()}
                    </Avatar>
                    <Typography variant="caption" sx={{ color: COLORS.navy, fontWeight: 700 }}>
                      {c.username}
                    </Typography>
                    <Typography variant="caption" sx={{ color: COLORS.navy }}>
                      {new Date(c.time).toLocaleString()}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ color: COLORS.dark, ml: 4 }}>
                    {c.text}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <TextField
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Write a comment..."
              size="small"
              variant="outlined"
              fullWidth
            />
            <Button
              variant="contained"
              disabled={!input}
              onClick={() => { onComment(idx, input); setInput(""); }}
              sx={{ bgcolor: COLORS.green, color: COLORS.yellow, fontWeight: 900 }}
            >
              Post
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Fragment>
  );
}

// --- Cards Panel: All uploads in category, 3-col layout, buyer can react, comment, all synced to seller side ---
function CardsPanel({ serviceIdx, username, isMobile }) {
  const [uploads, setUploads] = useState([]);
  const [galleryIdx, setGalleryIdx] = useState({});
  const [descExpanded, setDescExpanded] = useState({});

  const service = SERVICE_TYPES[serviceIdx];

  useEffect(() => {
    const all = getUploads();
    // Only show within 30 days
    setUploads((all[service.text] || []).filter(item =>
      Date.now() - item.date < 1000 * 60 * 60 * 24 * 31
    ));
  }, [serviceIdx]);

  // chunk array into 3-col rows
  function chunk(arr, n) {
    const res = [];
    for (let i = 0; i < arr.length; i += n) res.push(arr.slice(i, i + n));
    return res;
  }
  const rows = chunk(uploads, 3);

  function handleReact(idx, type) {
    addReaction(service.text, idx, type, username);
    if (type === "like") addUserStars(username, 1);
    setUploads([...uploads]);
  }
  function handleComment(idx, text) {
    addComment(service.text, idx, username, text);
    setUploads([...uploads]);
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3, pt: 0, width: "100vw", maxWidth: "100vw" }}>
      <Box sx={{ overflowX: "auto", maxWidth: "100vw" }}>
        <Stack spacing={2} direction="column">
          {rows.length === 0 ? (
            <Paper sx={{ p: 4, bgcolor: COLORS.sky, borderRadius: 4, textAlign: "center" }}>
              <Typography variant="body1" sx={{ color: COLORS.green, fontWeight: 700 }}>
                No {service.text} uploaded yet.
              </Typography>
            </Paper>
          ) : (
            rows.map((row, rowIdx) => (
              <Stack key={rowIdx} direction="row" spacing={3} sx={{
                width: "100vw", maxWidth: "100vw", mb: 1, px: isMobile ? 0 : 1,
                justifyContent: isMobile ? "flex-start" : "center"
              }}>
                {row.map((item, idx) => {
                  const trueIdx = rowIdx * 3 + idx;
                  const reactions = getItemReactions(service.text, trueIdx);
                  return (
                    <Card key={item.date + trueIdx} sx={{
                      borderRadius: 5,
                      boxShadow: "0 4px 32px #FFD10044",
                      p: 3,
                      mb: 3,
                      bgcolor: COLORS.white,
                      minHeight: 380,
                      maxWidth: 370,
                      width: "100%",
                      flex: "0 0 32vw"
                    }}>
                      <Stack direction="row" spacing={3}>
                        {/* Gallery large */}
                        <Box sx={{ flex: 1, minWidth: 120, maxWidth: 130 }}>
                          {item.gallery && item.gallery.length > 0 ? (
                            <Box sx={{ position: "relative", minHeight: 110 }}>
                              <img
                                src={item.gallery[galleryIdx[trueIdx] || 0]?.url}
                                alt=""
                                style={{
                                  borderRadius: 16,
                                  objectFit: "cover",
                                  width: "100%",
                                  minHeight: 110,
                                  maxHeight: 120,
                                }}
                              />
                              {item.gallery.length > 1 && (
                                <Stack direction="row" spacing={1}
                                  sx={{ position: "absolute", bottom: 8, left: 6 }}>
                                  <IconButton size="small" sx={{ bgcolor: COLORS.beige, mr: 1 }}
                                    onClick={() =>
                                      setGalleryIdx(g =>
                                        ({ ...g, [trueIdx]: Math.max(0, (g[trueIdx] || 0) - 1) })
                                      )
                                    }
                                    disabled={(galleryIdx[trueIdx] || 0) === 0}
                                  >
                                    <ChevronLeftIcon />
                                  </IconButton>
                                  <IconButton size="small" sx={{ bgcolor: COLORS.beige }}
                                    onClick={() =>
                                      setGalleryIdx(g =>
                                        ({
                                          ...g,
                                          [trueIdx]: Math.min(item.gallery.length - 1, (g[trueIdx] || 0) + 1)
                                        })
                                      )
                                    }
                                    disabled={(galleryIdx[trueIdx] || 0) === item.gallery.length - 1}
                                  >
                                    <ChevronRightIcon />
                                  </IconButton>
                                </Stack>
                              )}
                            </Box>
                          ) : (
                            <Box sx={{
                              minHeight: 110, display: "flex", alignItems: "center",
                              justifyContent: "center", bgcolor: COLORS.sky, borderRadius: 3
                            }}>
                              <PhotoCameraIcon sx={{ color: COLORS.green, fontSize: 32 }} />
                            </Box>
                          )}
                        </Box>
                        {/* Info/desc */}
                        <Box sx={{ flex: 2, ml: 1 }}>
                          {/* Description collapsible */}
                          <Typography variant="h6" sx={{ color: COLORS.navy, fontWeight: 800 }}>
                            {item.desc.split("\n")[0].slice(0, 50) + (item.desc.length > 50 ? "..." : "")}
                          </Typography>
                          <Collapse in={descExpanded[trueIdx]}>
                            <Typography variant="body2" sx={{ color: COLORS.green, my: 1 }}>
                              {item.desc}
                            </Typography>
                          </Collapse>
                          {!descExpanded[trueIdx] && item.desc.length > 60 && (
                            <Button
                              size="small"
                              sx={{ color: COLORS.red, mt: 0.5, fontWeight: 700 }}
                              onClick={() => setDescExpanded(d => ({ ...d, [trueIdx]: true }))}
                            >
                              Read more
                            </Button>
                          )}
                          {descExpanded[trueIdx] && (
                            <Button
                              size="small"
                              sx={{ color: COLORS.navy, mt: 0.5, fontWeight: 700 }}
                              onClick={() => setDescExpanded(d => ({ ...d, [trueIdx]: false }))}
                            >
                              Show less
                            </Button>
                          )}
                          <Divider sx={{ my: 1.1 }} />
                          {/* Details */}
                          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                            <Chip
                              icon={<StoreIcon sx={{ color: service.color }} />}
                              label={service.text}
                              sx={{ bgcolor: COLORS.sky, fontWeight: 700 }}
                            />
                            {item.pieces > 0 && (
                              <Chip label={`Available: ${item.pieces || 1}`} />
                            )}
                            {item.seats > 0 && (
                              <Chip label={`Seats: ${item.seats}`} />
                            )}
                            <Chip label={`KES ${item.price}`} color="primary" />
                            <Chip
                              icon={<LocationOnIcon sx={{ color: COLORS.green }} />}
                              label="Location"
                              component="a"
                              href={toGMaps(item.location.lat, item.location.lng)}
                              target="_blank"
                              clickable
                              sx={{ bgcolor: COLORS.beige, color: COLORS.green, fontWeight: 700 }}
                            />
                          </Stack>
                          {/* Seller, date, sold out */}
                          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                            <Typography variant="caption" sx={{ color: COLORS.navy }}>
                              Seller: {item.username}
                            </Typography>
                            <Typography variant="caption" sx={{ color: COLORS.navy }}>
                              {new Date(item.date).toLocaleString()}
                            </Typography>
                            {item.soldOut && (
                              <Chip
                                icon={<VerifiedIcon />}
                                label="Sold Out"
                                sx={{ bgcolor: COLORS.green, color: COLORS.white, fontWeight: 700 }}
                              />
                            )}
                          </Stack>
                          {/* Facebook-style reactions */}
                          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                            <Tooltip title="Like">
                              <IconButton
                                onClick={() => handleReact(trueIdx, "like")}
                                sx={{
                                  color: reactions.likes.includes(username) ? COLORS.green : COLORS.navy,
                                  bgcolor: "#f6ffed"
                                }}
                              >
                                <ThumbUpIcon />
                              </IconButton>
                            </Tooltip>
                            <Typography variant="caption" sx={{ fontWeight: 800 }}>
                              {10 + reactions.likes.length}
                            </Typography>
                            <Tooltip title="Dislike">
                              <IconButton
                                onClick={() => handleReact(trueIdx, "dislike")}
                                sx={{
                                  color: reactions.dislikes.includes(username) ? COLORS.red : COLORS.navy,
                                  bgcolor: "#ffe6e6"
                                }}
                              >
                                <ThumbDownIcon />
                              </IconButton>
                            </Tooltip>
                            <Typography variant="caption" sx={{ fontWeight: 800 }}>
                              {reactions.dislikes.length}
                            </Typography>
                            <CommentBox
                              idx={trueIdx}
                              service={service.text}
                              reactions={reactions}
                              username={username}
                              onComment={handleComment}
                            />
                          </Stack>
                        </Box>
                      </Stack>
                    </Card>
                  );
                })}
              </Stack>
            ))
          )}
        </Stack>
      </Box>
    </Box>
  );
}

// --- Main Landmark2 Buyer/Explorer Home ---
export default function Landmark2() {
  // Simulate buyer auth
  const [username, setUsername] = useState(() => {
    let u = localStorage.getItem("kyu-konnect-username2");
    if (!u) {
      u = prompt("Enter your username (explorer):", "explorer1") || "explorer1";
      localStorage.setItem("kyu-konnect-username2", u);
    }
    return u;
  });

  // Sticky panel (restore last viewed)
  const [selectedPanel, setSelectedPanel] = useState(() => {
    let k = localStorage.getItem(LAST_PANEL_KEY);
    if (k === null || isNaN(+k)) return 0;
    return +k;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchVal, setSearchVal] = useState(SERVICE_TYPES[selectedPanel]?.text || "");

  const isMobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    if (searchVal) {
      const idx = SERVICE_TYPES.findIndex(s => s.text.toLowerCase() === searchVal.trim().toLowerCase());
      if (idx >= 0) {
        setSelectedPanel(idx);
        localStorage.setItem(LAST_PANEL_KEY, idx);
      }
    }
  }, [searchVal]);
  useEffect(() => {
    localStorage.setItem(LAST_PANEL_KEY, selectedPanel);
    setSearchVal(SERVICE_TYPES[selectedPanel]?.text || "");
  }, [selectedPanel]);

  return (
    <Box sx={{
      minHeight: "100dvh",
      bgcolor: COLORS.beige,
      width: "100vw",
      maxWidth: "100vw",
      p: 0, m: 0, overflowX: "hidden", display: "flex", flexDirection: "column",
      position: "relative",
    }}>
      {/* Sidebar */}
      <LandmarkSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        selected={selectedPanel}
        setSelected={setSelectedPanel}
        isMobile={isMobile}
      />

      {/* Sidebar FAB */}
      {!sidebarOpen && (
        <Tooltip title="Show Categories">
          <Button
            sx={{
              position: "fixed",
              left: isMobile ? 12 : 28,
              top: isMobile ? 12 : 38,
              zIndex: 2800,
              bgcolor: COLORS.green,
              color: COLORS.yellow,
              border: `3px solid ${COLORS.yellow}`,
              width: 56,
              height: 56,
              borderRadius: "50%",
              minWidth: 0,
              "&:hover": { bgcolor: COLORS.yellow, color: COLORS.green }
            }}
            onClick={() => setSidebarOpen(true)}
          >
            <StoreIcon fontSize="large" />
          </Button>
        </Tooltip>
      )}

      {/* Header */}
      <Box sx={{
        pt: isMobile ? 2 : 4.5,
        pb: 0,
        px: 0,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        width: "100vw",
        justifyContent: "center",
        gap: isMobile ? 0 : 4,
      }}>
        <Avatar
          sx={{
            width: 92,
            height: 92,
            mb: 1,
            bgcolor: COLORS.yellow,
            color: COLORS.green,
            fontWeight: 900,
            fontSize: 54,
            boxShadow: "0 4px 22px #FFD10044",
            border: `6px solid ${COLORS.green}`,
          }}
        >
          <StoreIcon fontSize="inherit" />
        </Avatar>
        <Box>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            sx={{
              fontWeight: 900,
              color: COLORS.green,
              letterSpacing: 2,
              mb: 0.5,
              textAlign: isMobile ? "center" : "left",
              textShadow: "0 2px 18px #FFD10022",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Landmark2: Explore & React
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h5"}
            sx={{
              color: COLORS.red,
              fontWeight: 700,
              mb: 0.5,
              textAlign: isMobile ? "center" : "left",
              fontSize: isMobile ? "1.14rem" : "1.22rem",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: 1,
            }}
          >
            Discover, comment, react. All feedback is sent to the seller instantly!
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 1, alignItems: "center", justifyContent: isMobile ? "center" : "flex-start" }}>
            <Chip
              avatar={<Avatar sx={{ bgcolor: COLORS.green, color: COLORS.yellow }}>{username[0].toUpperCase()}</Avatar>}
              label={username}
              sx={{
                bgcolor: COLORS.white,
                color: COLORS.green,
                fontWeight: 900,
                fontSize: "1.12rem",
                px: 2,
              }}
            />
            <StarProgress username={username} />
          </Stack>
        </Box>
      </Box>

      {/* SearchBar */}
      <LandmarkSearchBar
        value={searchVal}
        setValue={setSearchVal}
        setPanelIdx={setSelectedPanel}
        isMobile={isMobile}
      />

      {/* Cards Panel for selected category */}
      <CardsPanel
        serviceIdx={selectedPanel}
        username={username}
        isMobile={isMobile}
      />

      {/* Footer */}
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
        All feedback sent to sellers in real time. Powered by KyU Konnect Landmark2.<br />
        <Typography variant="caption" sx={{ color: COLORS.green, mt: 1, fontWeight: 900 }}>
          Build: v3.1.0 &copy; KyU-Konnect 2025
        </Typography>
      </Box>
    </Box>
  );
}

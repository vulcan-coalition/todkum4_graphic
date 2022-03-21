import {
  Theme,
  Button,
  withStyles,
  Slider,
} from "@material-ui/core/";
import { grey } from "@material-ui/core/colors";

export const SoundButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: "50px",
    height: "60px",
    minWidth: "280px",
    fontSize: "20px",
    color: localStorage.getItem("theme") === "dark"
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    backgroundColor: localStorage.getItem("theme") === "dark"
      ? theme.palette.primary.light
      : theme.palette.secondary.light,
    '&:hover': {
      color: localStorage.getItem("theme") === "dark"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
      backgroundColor: localStorage.getItem("theme") === "dark"
        ? theme.palette.primary.dark
        : theme.palette.secondary.dark,
    },
  },
}))(Button);

export const SoundButtonOutline = withStyles((theme: Theme) => ({
  root: {
    borderColor: localStorage.getItem("theme") === "dark"
      ? theme.palette.primary.light
      : theme.palette.secondary.dark,
    borderRadius: "50px",
    height: "60px",
    minWidth: "280px",
    fontSize: "20px",
    color: localStorage.getItem("theme") === "dark"
      ? theme.palette.primary.contrastText
      : theme.palette.secondary.dark,
    '&:hover': {
      color: localStorage.getItem("theme") === "dark"
        ? theme.palette.primary.contrastText
        : theme.palette.secondary.dark,
      boxShadow: localStorage.getItem("theme") === "dark"
        ? '0 0 0 0.1rem rgba(255,255,255,.5)'
        : '0 0 0 0.1rem rgba(0,0,0,.5)',
    },

  },
}))(Button);

export const ConfirmLabelButton = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: "93%",
    marginBottom: "3%",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.getContrastText(grey[900]),
    },
    "&:disabled": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(grey[900]),
    },
  },
}))(Button);

export const LogInButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: "50px",
    fontFamily: "THSarabun",
    fontSize: "calc(18px + var(--upfont - input))",
    padding: "10px 32px",
    color: localStorage.getItem("theme") === "dark"
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
    backgroundColor: localStorage.getItem("theme") === "dark"
      ? theme.palette.primary.light
      : theme.palette.secondary.light,
    '&:hover': {
      color: localStorage.getItem("theme") === "dark"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
      backgroundColor: localStorage.getItem("theme") === "dark"
        ? theme.palette.primary.dark
        : theme.palette.secondary.dark,
    },
    width: "100%",
  },
}))(Button);

export const LabelChoiceButton = withStyles((theme: Theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "#333333",
      color: theme.palette.getContrastText(grey[900]),
    },
  },
}))(Button);

export const SoundGreenButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: "50px",
    height: "60px",
    minWidth: "280px",
    fontSize: "20px",
    color: "#FFFFFF",
    backgroundColor: "#219653",
    '&:hover': {
      backgroundColor: "#1d7d46",
    },
  },
}))(Button);

export const ContinuousSlider = withStyles((theme: Theme) => ({
  root: {
    height: 8,
    width: 250,
  },
  thumb: {
    height: 20,
    width: 20,
    border: "4px solid",
    marginTop: -7,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 1px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
}))(Slider);

export const DiscreteSlider = withStyles((theme: Theme) => ({
  root: {
    height: 8,
    width: 250,
    marginBottom: "0 !important",
  },
  thumb: {
    height: 20,
    width: 20,
    border: "4px solid",
    marginTop: -6,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 1px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
    opacity: 1,
  },
  mark: {
    height: 4,
    width: 4,
    border: "4px solid",
    marginTop: -2,
    marginLeft: -5,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
    borderRadius: "50%",
  },
  markActive: {
    opacity: 1,
  },
  markLabel: {
    color: localStorage.getItem("theme") === "dark"
    ? theme.palette.primary.main
    : theme.palette.primary.light
  },
}))(Slider);
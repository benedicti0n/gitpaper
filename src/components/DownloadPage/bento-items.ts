import { IoExtensionPuzzle } from "react-icons/io5";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { FaDesktop } from "react-icons/fa";

export const features = [
  {
    Icon: CgWebsite,
    name: "Web App",
    description: "Visit our webapp.",
    href: "#",
    cta: "View",
    className: "col-span-3 lg:col-span-1",
    background: "",
  },
  {
    Icon: IoExtensionPuzzle,
    name: "Extension",
    description: "Download the extension to use it in your browser.",
    href: "#",
    cta: "Install from Chrome Web Store",
    className: "col-span-3 lg:col-span-2",
    background: "",
  },
  {
    Icon: IoLogoGooglePlaystore,
    name: "App",
    description: "Download our app.",
    href: "#",
    cta: "Download",
    className: "col-span-3 lg:col-span-2",
    background: "",
  },
  {
    Icon: FaDesktop,
    name: "Desktop App",
    description: "Our desktop app description.",
    href: "#",
    cta: "Download Now",
    className: "col-span-3 lg:col-span-1",
    background: "",
  },
];

//webapp, extension, mobile app, desktop app

import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800"],
  variable: "--font-poppins",
  display: "swap",
});

// Black Future local font (add the actual font file into /public/fonts/BlackFuture.ttf)
const blackFuture = localFont({
  // Using relative path to the actual file in public/fonts (spaces allowed)
  src: [
    {
      path: "../../public/fonts/black future.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-black-future",
  display: "swap",
});

export const metadata = {
  title: "MLC-VITAP",
  description: "Let's revolutionize the future together!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
  className={`${geistSans.variable} ${geistMono.variable} ${blackFuture.variable} ${poppins.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

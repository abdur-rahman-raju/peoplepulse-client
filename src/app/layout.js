import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "PeoplePulse",
  description: "Organise and join social service events in your neighbourhood.",
};

// পেজ আঁকার আগেই সেভ করা theme বসিয়ে দেয়, তাই reload দিলে রঙ ঝিলিক দেয় না
const themeScript = `
  try {
    var saved = localStorage.getItem("pulse-theme");
    var theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "pulse-dark" : "pulse-light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
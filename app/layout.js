import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight : ['400' , '500' ,'600' , '700']
});

const ovo = Ovo({
  subsets: ["latin"], weight : ['400']
});

export const metadata = {
  title: "Yeasin Munshi | MERN Stack Developer",
  description: "Portfolio of Yeasin Munshi, a MERN Stack Developer based in Dhaka, Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = saved ? saved === 'dark' : prefersDark;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-[#11001F] dark:text-white">{children}</body>
    </html>
  );
}

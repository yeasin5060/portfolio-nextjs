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
      <body className="min-h-full flex flex-col text-gray-900 dark:text-white relative">
        {/* Luminous Ambient Background Mesh for Light & Dark Modes */}
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Soft radiant pastel aura blooms in light mode */}
          <div className="absolute top-[-5%] left-[10%] w-[650px] h-[650px] bg-gradient-to-br from-cyan-400/20 via-sky-300/15 to-transparent rounded-full blur-[140px] dark:opacity-20" />
          <div className="absolute top-[28%] right-[-8%] w-[550px] h-[550px] bg-gradient-to-bl from-indigo-400/18 via-blue-300/12 to-transparent rounded-full blur-[140px] dark:opacity-25" />
          <div className="absolute top-[60%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-sky-400/16 via-teal-300/12 to-transparent rounded-full blur-[150px] dark:opacity-20" />
          <div className="absolute bottom-[-10%] right-[15%] w-[650px] h-[650px] bg-gradient-to-tl from-cyan-400/18 via-indigo-300/12 to-transparent rounded-full blur-[150px] dark:opacity-25" />
          
          {/* Ultra-fine architectural tech dot grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(2,132,199,0.14)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_65%,transparent_100%)] opacity-70 dark:opacity-25" />
        </div>
        {children}
      </body>
    </html>
  );
}

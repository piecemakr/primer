'use client';

//======= DELETE FROM HERE ======= //

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { JetBrains_Mono, IBM_Plex_Mono } from 'next/font/google';
import { useTheme } from 'next-themes';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
});

const ASCII_ART = `██████╗ ██████╗ ██╗███╗   ███╗███████╗██████╗    
██╔══██╗██╔══██╗██║████╗ ████║██╔════╝██╔══██╗   
██████╔╝██████╔╝██║██╔████╔██║█████╗  ██████╔╝   
██╔═══╝ ██╔══██╗██║██║╚██╔╝██║██╔══╝  ██╔══██╗   
██║     ██║  ██║██║██║ ╚═╝ ██║███████╗██║  ██║██╗
╚═╝     ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝`;

const GIT_COMMAND = 'git clone https://github.com/piecemkar/primer.git';

// Common animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 128, damping: 15 },
};

const fadeInUpDelayed = (delay: number) => ({
  ...fadeInUp,
  transition: { ...fadeInUp.transition, delay },
});

const logoStagger = {
  initial: { opacity: 0, y: 20, filter: 'blur(2px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { type: 'spring' as const, stiffness: 80, bounce: 0.2 },
};

const STACK_ITEMS = [
  {
    name: 'Next.js',
    icon: 'nextjs.svg',
  },
  {
    name: 'Tailwind CSS',
    icon: 'tailwindcss.svg',
  },
  {
    name: 'TypeScript',
    icon: 'typescript.svg',
  },
  {
    name: 'Sanity',
    icon: 'sanity.svg',
  },
  {
    name: 'Shadcn UI',
    icon: 'shadcn.svg',
  },
  {
    name: 'Framer Motion',
    icon: 'framer.svg',
  },
  {
    name: 'Vercel',
    icon: 'vercel.svg',
  },
  {
    name: 'Resend',
    icon: 'resend.svg',
  },
];

//======= DELETE TO HERE ======= //

export default function Page() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-background overflow-hidden select-none">
      <div className="flex flex-col items-censtartter">
        <Logo />
        <Description />
        <Stack />
        <Cli />
      </div>
    </section>
  );
}

//======= DELETE FROM HERE ======= //

function Logo() {
  const [hoveredChar, setHoveredChar] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const { theme, resolvedTheme } = useTheme();

  const getCharStyle = (row: number, col: number) => {
    if (!hoveredChar)
      return {
        scale: 1,
        color: resolvedTheme === 'dark' ? '#E1E1E1' : '#000000',
      };

    const distance = Math.sqrt(
      Math.pow((row - hoveredChar.row) * 20, 2) +
        Math.pow((col - hoveredChar.col) * 12, 2)
    );

    // Light mode colors (blue to white)
    if (resolvedTheme === 'light') {
      if (distance <= 20) return { scale: 0.7, color: '#0057FF' };
      if (distance <= 40) return { scale: 0.75, color: '#00359C' };
      if (distance <= 60) return { scale: 0.85, color: '#001744' };
      if (distance <= 80) return { scale: 1, color: '#000817' };
      if (distance <= 100) return { scale: 1, color: '#000817' };
    }

    // Dark mode colors (blue to white)
    if (resolvedTheme === 'dark') {
      if (distance <= 20) return { scale: 0.7, color: '#0057FF' };
      if (distance <= 40) return { scale: 0.75, color: '#60A5FA' };
      if (distance <= 60) return { scale: 0.85, color: '#93C5FD' };
      if (distance <= 80) return { scale: 1, color: '#DBEAFE' };
      if (distance <= 100) return { scale: 1, color: '#E1E1E1' };
    }

    return {
      scale: 1,
      color: resolvedTheme === 'dark' ? '#E1E1E1' : '#000000',
    };
  };

  return (
    <div
      className={`select-none text-primary ${jetbrainsMono.className}`}
      style={{
        fontFamily: 'monospace',
        whiteSpace: 'pre',
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.01em',
        fontSize: 'clamp(12px, 2.5vw, 24px)',
        lineHeight: 'clamp(12px, 2.5vw, 24px)',
      }}
    >
      {ASCII_ART.split('\n').map((line, rowIndex) => (
        <motion.div
          key={rowIndex}
          style={{ display: 'block', whiteSpace: 'pre' }}
          initial={logoStagger.initial}
          animate={logoStagger.animate}
          transition={{
            ...logoStagger.transition,
            delay: 0.3 + rowIndex * 0.05,
          }}
        >
          {line.split('').map((char, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="inline-block relative"
              onMouseEnter={() =>
                setHoveredChar({ row: rowIndex, col: colIndex })
              }
              onMouseLeave={() => setHoveredChar(null)}
            >
              <motion.span
                className="inline-block cursor-default"
                animate={getCharStyle(rowIndex, colIndex)}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{ transformOrigin: 'center' }}
              >
                {char}
              </motion.span>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function Description() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1,
        delay: 0.6,
      }}
      className="font-medium max-w-2xl my-8"
    >
      A modern,{' '}
      <a
        href="https://nextjs.org/"
        className="inline-flex items-center gap-1 py-px rounded-full font-bold hover:text-[#0057FF] transition-colors"
      >
        Next.js 15
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-xs"
        >
          <path
            d="M6 18L18 6M18 6H10M18 6V14"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>{' '}
      template that scaffolds your project in seconds.
    </motion.p>
  );
}

function Stack() {
  return (
    <motion.div
      className="flex flex-row gap-4 pt-12"
      initial={{ opacity: 0, y: 70, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 10,
        mass: 1,
        delay: 0.6,
      }}
    >
      <>
        <div className="flex flex-row pl-2">
          {STACK_ITEMS.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex flex-row items-center -ml-2 bg-accent rounded-full size-12 shadow-lg"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 10,
                mass: 1,
                delay: 0.6 + index * 0.05,
              }}
            >
              <Image
                src={item.icon || '/favicon.ico'}
                alt={item.name}
                width={32}
                height={32}
                className="w-6 h-6"
              />
            </motion.div>
          ))}
        </div>
      </>
    </motion.div>
  );
}

function Cli() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    console.log('Button clicked!'); // Debug log
    try {
      await navigator.clipboard.writeText(GIT_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div
      className={`${ibmPlexMono.className} mt-12 text-sm flex flex-row gap-4`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10,
          mass: 1,
          delay: 0.8,
        }}
        className="flex flex-row items-center justify-center gap-3 relative rounded-full bg-accent pl-5 pr-7 py-3 shadow-xl overflow-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            mass: 1,
            delay: 1.05,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 17L10 11L4 5M12 19H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            mass: 1,
            delay: 1.1,
          }}
          className="text-sm"
          style={{
            fontFamily: 'IBM Plex Mono',
            fontWeight: 500,
            whiteSpace: 'pre',
          }}
        >
          {GIT_COMMAND}
        </motion.p>
      </motion.div>

      <motion.button
        onClick={handleCopy}
        className="p-2 flex items-center gap-2 cursor-pointer"
        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{
          type: 'spring',
          stiffness: 60,
          damping: 25,
          mass: 0.8,
          delay: 1.2,
        }}
        whileHover={{ scale: 1.05, cursor: 'pointer' }}
        whileTap={{ scale: 0.98 }}
        title="Copy to clipboard"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>

        <span className="text-primary font-medium text-sm">
          {copied ? (
            <ScrambleText text="copied!" key="copied" />
          ) : (
            <ScrambleText text="copy" key="copy" />
          )}
        </span>
      </motion.button>
    </div>
  );
}

function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(true);

  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  React.useEffect(() => {
    // Always animate when component mounts (due to key change)
    if (isScrambling) {
      let iterations = 0;
      const maxIterations = 40;
      const targetText = text;

      const interval = setInterval(() => {
        setDisplayText((prev) => {
          if (iterations >= maxIterations) {
            clearInterval(interval);
            setIsScrambling(false);
            return targetText;
          }

          iterations++;
          return targetText
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';

              // Calculate when each letter should start resolving
              const resolveStart =
                (index / targetText.length) * (maxIterations * 0.6);
              const resolveEnd = resolveStart + maxIterations * 0.4;

              if (iterations < resolveStart) {
                // Still scrambling - random character
                return scrambleChars[
                  Math.floor(Math.random() * scrambleChars.length)
                ];
              } else if (iterations < resolveEnd) {
                // Transitioning - mix of random and target
                if (Math.random() < 0.7) {
                  return char;
                } else {
                  return scrambleChars[
                    Math.floor(Math.random() * scrambleChars.length)
                  ];
                }
              } else {
                // Fully resolved
                return char;
              }
            })
            .join('');
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [text, isScrambling]);

  return <span className={className}>{displayText}</span>;
}

//======= DELETE TO HERE ======= //

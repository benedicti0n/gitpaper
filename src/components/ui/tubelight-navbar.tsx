"use client"

import React, { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useNavStore } from "@/store" // Import Zustand store
import { ArrowRight, Briefcase, DollarSign, Home, LucideIcon, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { SignedIn, SignedOut, SignInButton, UserButton, useSession } from "@clerk/nextjs"
import { GlowEffect } from "./glow-effect"
import { usePathname } from "next/navigation"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  className?: string
}

export function NavBar({ className }: NavBarProps) {
  const { activeTab, setActiveTab } = useNavStore()
  const { isSignedIn } = useSession()
  const pathname = usePathname()

  useEffect(() => {
    const matchedItem = navItems.find((item) => item.url === pathname)
    if (matchedItem) {
      setActiveTab(matchedItem.name)
    }
    // eslint-disable-next-line
  }, [pathname, isSignedIn])

  const navItems: NavItem[] = useMemo(() => [
    { name: 'Home', url: '/', icon: Home },
    ...(isSignedIn ? [{ name: 'Dashboard', url: '/dashboard', icon: User }] : []),
    { name: 'Download', url: '/download', icon: Briefcase },
    { name: 'Pricing', url: '/pricing', icon: DollarSign },
  ], [isSignedIn])

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-20 bg-background border border-border backdrop-blur-lg py-1 px-1.5 rounded-full shadow-lg">

        <div className="flex items-center gap-1">
          {/* eslint-disable-next-line */}
          <img src="/logo.png" alt="" className="w-10" />
          <h1 className="text-sm font-semibold">GitPaper</h1>
        </div>

        <div className="flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                  "text-foreground/80 hover:text-primary",
                  isActive && "bg-muted text-primary",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>


        <div className="relative">
          <SignedOut>
            <GlowEffect
              colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
              mode='colorShift'
              blur='soft'
              duration={3}
              scale={0.9}
            />
            <SignInButton>
              <button className="relative bg-background cursor-pointer text-sm font-semibold px-6 py-2 gap-2 rounded-full flex items-center justify-center">
                <h1>SignIn</h1>
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <GlowEffect
              colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
              mode='colorShift'
              blur='soft'
              duration={3}
              scale={0.9}
            />
            <button className="relative bg-background cursor-pointer text-sm font-semibold rounded-full flex items-center justify-center">
              <UserButton />
            </button>
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

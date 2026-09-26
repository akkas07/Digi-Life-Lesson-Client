"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Dropdown, Avatar } from "@heroui/react";
import { ArrowRightFromSquare, Gear } from "@gravity-ui/icons";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Layout } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

export default function NavbarComponent({ sessionStatus }) {
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Auth & Premium states
  const isLoggedIn = !!user;
  const isPremium = user?.plan === "premium" || user?.isPremium || false;

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const navLinks = [
    { label: "Home", href: "/", show: true },
    { label: "Public Lessons", href: "/public-lessons", show: true },
    { label: "Add Lesson", href: "/dashboard/user/add-lesson", show: isLoggedIn },
    { label: "My Lessons", href: "/dashboard/user/my-lessons", show: isLoggedIn },
  ].filter((link) => link.show);

  if(pathname.includes("/dashboard")){
    return null; 
  }

  const dropdownItems = [  
    {
      id: "dashboard",
      label: "Dashboard",
      href: user?.role === "user" ? "/dashboard/user" : "/dashboard",
      href: user?.role === "admin" ? "/dashboard/admin" : "/dashboard",
      icon: <Layout className="size-3.5 text-muted-foreground" />,
    },
    {
      id: "profile",
      label: "My Profile",
      href: "/dashboard/user/profile",
      icon: <Gear className="size-3.5 text-muted-foreground" />,
    },
  ];

  const dashboardLink = {
    user: '/dashboard/user',
    admin: '/dashboard/admin',
  }

  if(user?.email){
    navLinks.push(
      {
        label: "Dashboard",
        href: dashboardLink[user?.role] || '/user',
        
      }
    )
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-divider bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Left Side: Brand Logo and Mobile Hamburger Switcher */}
        <div className="flex items-center gap-4">
          <button
            className="sm:hidden text-foreground hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Link
            href="/"
            className="font-bold text-xl flex items-center gap-2 bg-linear-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent"
          >
            ✨{" "}
            <span className="tracking-tight  bg-linear-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
              Digital Life Lessons
            </span>
          </Link>
        </div>

        {/* Center Links: Desktop View (Mapped) */}
        <ul className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors ${
                  isActive(link.href)
                    ? "text-primary font-bold"
                    : link.isWarning
                      ? "text-warning font-bold animate-pulse"
                      : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side: Theme Switcher & Authentication */}
        <div className="flex items-center gap-4">
          {isLoggedIn && !isPremium && (
            <Link href="/pricing" className="hidden sm:inline-block">
              <Button
                color="warning"
                variant="flat"
                size="sm"
                className="font-bold animate-pulse text-warning"
              >
                ⭐ Upgrade
              </Button>
            </Link>
          )}

          {isLoggedIn && isPremium && (
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-300">
              ⭐ Premium
            </span>
          )}
          <ThemeSwitcher />

          {user ? (
            <Dropdown>
              <Dropdown.Trigger className="rounded-full cursor-pointer">
                <Avatar
                  className="transition-transform ring-2 ring-offset-2 ring-offset-background"
                  style={{
                    "--tw-ring-color": isPremium
                      ? "var(--heroui-warning)"
                      : "var(--heroui-primary)",
                  }}
                >
                  <Avatar.Image
                    alt={user.name}
                    src={
                      user.image ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                    }
                  />
                  <Avatar.Fallback>
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                {/* Header User Meta Summary */}
                <div className="px-3 pt-3 pb-2 border-b border-divider min-w-50">
                  <div className="flex flex-col gap-0.5 space-y-2">
                    <p className="text-xs text-foreground/60 leading-none">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-foreground leading-normal">
                      {user.name}
                    </p>
                    <p className="text-xs text-foreground/60 leading-none">
                      {user.email}
                    </p>
                    {isPremium && (
                      <span className="text-[10px] bg-warning/20 text-warning px-1.5 py-0.5 rounded font-extrabold w-max mt-1">
                        ⭐ Premium
                      </span>
                    )}
                  </div>
                </div>

                {/* Dropdown Menu (Mapped) */}
                <Dropdown.Menu>
                  {dropdownItems.map((item) => (
                    <Dropdown.Item
                      key={item.id}
                      id={item.id}
                      textValue={item.label}
                    >
                      <Link
                        href={item.href}
                        className="flex w-full items-center justify-between gap-2 text-foreground"
                      >
                        <span>{item.label}</span>
                        {item.icon}
                      </Link>
                    </Dropdown.Item>
                  ))}

                  {/* Logout Button (Static রাখা হয়েছে কারণ এর ডিজাইন ও ভ্যারিয়েন্ট আলাদা) */}

                  <Dropdown.Item
                    key="logout"
                    className="text-danger"
                    color="danger"
                    endContent={<ArrowRightFromSquare className="size-3.5" />}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Link href="/auth/signin">
                <Button variant="light" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  className="font-semibold"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Responsive Menu (Mapped) */}
      {isMenuOpen && (
        <div className="border-t border-divider sm:hidden bg-background">
          <ul className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 rounded-lg px-3 ${
                    isActive(link.href)
                      ? link.isWarning
                        ? "bg-warning/10 text-warning font-bold"
                        : "bg-primary/10 text-primary font-bold"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {!isLoggedIn && (
              <li className="mt-2 flex flex-col gap-2 border-t border-divider pt-4 px-3">
                <Button
                  as={Link}
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  variant="bordered"
                  className="w-full"
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  color="primary"
                  className="w-full font-semibold"
                >
                  Sign Up
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

import { getSession } from "@/lib/actions/core/getSession";
import { LayoutSideContentLeft, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import { IoIosAddCircle, IoIosBook } from "react-icons/io";
import { MdFavoriteBorder, MdManageAccounts, MdOutlineDashboard, MdOutlineReportGmailerrorred } from "react-icons/md";

export async function DashboardSidebar() {

  const user = await getSession();

  const userNaveLink = [
    { icon: MdOutlineDashboard, label: "Dashboard", href: "/dashboard/user" },
    {
      icon: IoIosAddCircle,
      label: "Add Lesson",
      href: "/dashboard/user/add-lesson",
    },
    {
      icon: IoIosBook,
      label: "My Lessons",
      href: "/dashboard/user/my-lessons",
    },
    {
      icon: MdFavoriteBorder,
      label: "My Favorites",
      href: "/dashboard/user/my-favorites",
    },
    { icon: Person, label: "Profile", href: "/dashboard/user/profile" },
  ];

  const adminNaveLink = [
    {
      icon: MdOutlineDashboard,
      label: "Admin Home",
      href: "/dashboard/admin",
    },
    {
      icon: FaUsers ,
      label: "Manage Users",
      href: "/dashboard/admin/manage-users",
    },
    {
      icon: MdManageAccounts,
      label: "Manage Lessons",
      href: "/dashboard/admin/manage-lessons",
    },
    {
      icon: MdOutlineReportGmailerrorred,
      label: "Reported Lessons",
      href: "/dashboard/admin/reported-lessons",
    },
    {
      icon: Person,
      label: "Admin Profile",
      href: "/dashboard/admin/profile",
    },
  ];

  const navLinkMap = {
    user: userNaveLink,
    admin: adminNaveLink,
  };

  const navItems = navLinkMap[user?.role] || "user";

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        <div>
          <Link
            href="/"
            className="font-bold text-xl flex items-center gap-2 bg-linear-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent"
          >
            ✨{" "}
            <span className="tracking-tight  bg-linear-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
              Digital Life Lessons
            </span>
          </Link>
          <h2 className="text-lg font-semibold text-foreground text-center mt-4">
            Book of Wisdom
          </h2>
          <p className="text-muted-foreground text-sm text-center text-gray-500 mb-4">
            User Dashboard
          </p>
        </div>
        {navContent}
      </aside>

      <Drawer>
        <Button variant="secondary" className="lg:hidden">
          <LayoutSideContentLeft />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}

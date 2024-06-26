import type { IconType } from "react-icons";
import { FiHome, FiMail, FiSettings } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaCcStripe, FaUsers } from "react-icons/fa";
import { BsDpad, BsSpeedometer2, BsTicketPerforated } from "react-icons/bs";
import { BiSolidCoupon, BiSupport } from "react-icons/bi";
import { User } from "@prisma/client";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  dest: string; //destination
  target?: string; //used with external links
  children?: {
    name: string;
    icon: IconType;
    dest: string; //destination
    target?: string; //used with external links
  }[];
}

const AdminLinks: (isAdmin: boolean) => Array<LinkItemProps> = (isAdmin) => {
  return isAdmin
    ? [
        {
          name: "Admin",
          icon: MdOutlineAdminPanelSettings,
          dest: "/admin",
          children: [
            {
              name: "Utils",
              icon: BsDpad,
              dest: "/admin/utils",
            },
            {
              name: "Users",
              icon: FaUsers,
              dest: "/admin/users",
            },
            {
              name: "Mailing List",
              icon: FiMail,
              dest: "/admin/mailing-list",
            },

            {
              name: "Coupons",
              icon: BiSolidCoupon,
              dest: "/admin/coupons",
            },
            {
              name: "Stripe Products",
              icon: FaCcStripe,
              dest: "/admin/stripe-products",
            },

            {
              name: "Stripe Prices",
              icon: FaCcStripe,
              dest: "/admin/stripe-prices",
            },

            {
              name: "Usage Playground",
              icon: BsSpeedometer2,
              dest: "/admin/usage-playground",
            },
          ],
        },

        {
          name: "Support",
          icon: BiSupport,
          dest: "/support",
          children: [
            {
              name: "Tickets",
              icon: BsTicketPerforated,
              dest: "/support",
            },
          ],
        },
      ]
    : [];
};

const SupportLinks: (isSupport: boolean) => Array<LinkItemProps> = (
  isSupport,
) => {
  return isSupport
    ? [
        {
          name: "Support",
          icon: BiSupport,
          dest: "/support",
          children: [
            {
              name: "Tickets",
              icon: BsTicketPerforated,
              dest: "/support",
            },
          ],
        },
      ]
    : [];
};
export const SidebarLinks: (user: User) => Array<LinkItemProps> = (
  user: User,
) => {
  return [
    ...AdminLinks(user.role === "admin"),
    ...SupportLinks(user.role === "support"),
    { name: "Home", icon: FiHome, dest: "/home" },
    { name: "Settings", icon: FiSettings, dest: "/home/settings" },
  ];
};

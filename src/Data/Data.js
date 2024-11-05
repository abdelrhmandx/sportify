// Analytics Cards imports
import { GiWhistle, GiChampions } from "react-icons/gi";
import { RiReservedLine } from "react-icons/ri";
import { PiSwapFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { TbSoccerField } from "react-icons/tb";

// Sidebar Data
export const SidebarData = [
  {
    icon: GoHomeFill,
    heading: "Dashboard",
    path: '/dashboard'
  },
  {
    icon: FaUsers,
    heading: "Users",
    path: '/dashboard/users'
  },
  {
    icon: GiWhistle,
    heading: "Trainer",
    path: "/dashboard/trainners"
  },
  {
    icon: GiChampions,
    heading: 'Events',
    path: "/dashboard/events"
  },
  {
    icon: TbSoccerField,
    heading: 'Play Grounds',
    path: "/dashboard/playground"
  },
  {
    icon: PiSwapFill,
    heading: 'Swap',
    path: '/dashboard/swap'
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Trainer",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    path: "/dashboard/trainners", // أضف هذه الخاصية
    png: GiWhistle,
    series: [],
  },
  {
    title: "Events",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    path: "/dashboard/events", // أضف هذه الخاصية
    barValue: 70,
    value: "25,970",
    png: GiChampions,
    series: [],
  },
  {
    title: "User",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    path: "/dashboard/users", // أضف هذه الخاصية
    barValue: 70,
    value: "25,970",
    png: RiReservedLine,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "swap",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    path: "/dashboard/swap", // أضف هذه الخاصية
    barValue: 80,
    value: "14,270",
    png: PiSwapFill,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Playground",
    color: {
      backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    path: "/dashboard/playground", // أضف هذه الخاصية
    barValue: 60,
    value: "4,270",
    png: TbSoccerField,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [];

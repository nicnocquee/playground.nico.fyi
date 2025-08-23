"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Reset demo",
    href: "/use-action-state/reset",
  },
  {
    label: "Payload demo",
    href: "/use-action-state/payload",
  },
  {
    label: "Cancel Action demo",
    href: "/use-action-state/cancel-action",
  },
  {
    label: "Modify payload demo",
    href: "/use-action-state/modify-payload",
  },
];

const useCurrentTab = () => {
  const pathname = usePathname();
  const currentTab = tabs.find((tab) => tab.href === pathname);

  return {
    currentTab,
  };
};

export default function Tabs() {
  const { currentTab } = useCurrentTab();
  return (
    <div className="flex flex-row items-center justify-center space-x-4 w-full">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "text-sm text-muted-foreground",
            currentTab?.href === tab.href &&
              "text-foreground font-bold underline"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

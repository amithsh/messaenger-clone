"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface MobileItemProps {
  icon: any;
  href: string;
  onclick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  icon: Icon,
  href,
  onclick,
  active,
}) => {
  const handleClick = () => {
    if (onclick) {
      return onclick();
    }
  };
  return (
    <ul onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-white hover:bg-black",
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
      </Link>
    </ul>
  );
};

export default MobileItem;

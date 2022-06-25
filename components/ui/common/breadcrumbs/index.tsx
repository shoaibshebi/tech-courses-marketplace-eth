// @ts-nocheck
https: import React from "react";
import ActiveLink from "../link";

const BreadcrumbItem = ({ item, index }) => {
  return (
    <li
      className={`${
        index == 0 ? "pr-4" : "px-4"
      } font-medium text-gray-500 hover:text-gray-900`}
    >
      <ActiveLink href={item.href}>
        <a>{item.value}</a>
      </ActiveLink>
    </li>
  );
};

export default function Breadcrumbs({
  items,
  isAdmin,
}: {
  items: any;
  isAdmin: boolean;
}) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-turk divide-x divide-turk">
        {items.map((item: any, i: number) => (
          <React.Fragment key={item.href}>
            {!item.requireAdmin && <BreadcrumbItem item={item} index={i} />}
            {item.requireAdmin && isAdmin && (
              <BreadcrumbItem item={item} index={i} />
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Navbar = () => {
  const pathname = usePathname();

  // تقسيم ال URL لأجزاء
  const paths = pathname.split("/").filter(Boolean);

  // مثال: "/docs/components/breadcrumb"
  // => ["docs", "components", "breadcrumb"]

  return (
    <nav className="min-h-16 bg-white border-b border-gray-200 shadow shadow-sm-black/5 w-full px-4 sm:px-6 lg:px-8">
      <Breadcrumb className="container mx-auto py-4">
        <BreadcrumbList>
          {/* أول عنصر ثابت */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {paths.length > 0 && <BreadcrumbSeparator />}

          {/* توليد باقي العناصر */}
          {paths.map((segment, index) => {
            // المسار الجزئي لكل مستوى
            const href = "/" + paths.slice(0, index + 1).join("/");
            const isLast = index === paths.length - 1;

            return (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default Navbar;

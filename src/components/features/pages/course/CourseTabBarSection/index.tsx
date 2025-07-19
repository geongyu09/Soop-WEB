"use client";

import ROUTE from "@/constants/route";
import { cn } from "@/utils/cn";
import useRouteBridge from "@hooks/feature/bridge/useRouteBridge";
import useCoursesOfMountainQuery from "@hooks/feature/query/useCoursesOfMountainQuery";
import Spacing from "@shared/layout/Spacing";
import { Suspense } from "@suspensive/react";
import CourseListWithBookmarkMutate from "@widgets/CourseListWithBookmarkMutate";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { StackLink } from "@/service/StackLink";
import CourseTabBarSectionSkeleton from "./CourseTabBarSection.skeleton";

const tabTitleList = [
  { title: "내 맞춤형", sort: "my" },
  { title: "인기순", sort: "popular" },
  { title: "거리순", sort: "distance" },
  { title: "난이도순", sort: "difficulty" },
] as const;

export default Suspense.with(
  {
    name: "CourseTabSection",
    clientOnly: true,
    fallback: <CourseTabBarSectionSkeleton />,
  },
  function CourseTabSection() {
    const router = useRouter();
    const { mountainId } = useParams<{ mountainId: string }>();
    const searchParams = useSearchParams();
    const sortBy = searchParams.get("sort");
    const routeCourseDetail = useRouteBridge({
      path: "course-detail",
      routeType: "push",
    });

    const { data: courseList } = useCoursesOfMountainQuery(mountainId);

    const { courses } = courseList;

    if (!courses) {
      return <div className="text-center text-gray-500">코스가 없습니다.</div>;
    }

    return (
      <section className="flex flex-col flex-1 overflow-hidden">
        <div className="flex justify-between items-center px-6">
          {tabTitleList.map(({ title: tabTitle, sort }, index) => (
            <button
              key={`${index}-${tabTitle}`}
              onClick={() => {
                router.replace(
                  `${ROUTE.COURSE_SEARCH_RESULT({
                    mountainId,
                    sort,
                  })}`
                );
              }}
            >
              <div
                className={cn("px-3 py-1 text-white rounded-full text-sm", {
                  "bg-gray-400": sort !== sortBy,
                  "bg-main-green": sort === sortBy,
                })}
              >
                {tabTitle}
              </div>
            </button>
          ))}
        </div>
        <Spacing size={4} />
        <ul className="flex flex-col gap-4 bg-gray-200 p-6 overflow-y-auto flex-1">
          {courses.map(({ id, ...props }, index) => (
            <StackLink href={`/map/course-detail/`} key={id}>
              <div
                key={`${id}-${index}`}
                onClick={routeCourseDetail}
                role="button"
              >
                <CourseListWithBookmarkMutate id={id} {...props} />
              </div>
            </StackLink>
          ))}
        </ul>
      </section>
    );
  }
);

import Skeleton from "react-loading-skeleton";

const CardDashboardSkeleton = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <Skeleton height={120} />
        </div>
        <div className="flex-1">
          <Skeleton height={120} />
        </div>
        <div className="flex-1">
          <Skeleton height={120} />
        </div>
        <div className="flex-1">
          <Skeleton height={120} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <div className="flex-1">
          <Skeleton height={400} />
        </div>
        <div className="max-w-[420px] w-full">
          <Skeleton height={400} />
        </div>
      </div>
    </>
  );
};

export default CardDashboardSkeleton;

import type { FC } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingPageProps {
  size?: number;
}

const LoadingPage: FC<LoadingPageProps> = ({ size }) => {
  return (
    <div className="absolute right-0 top-0 flex h-screen w-screen items-center justify-center ">
      <LoadingSpinner size={size ?? 60} />
    </div>
  );
};

export default LoadingPage;

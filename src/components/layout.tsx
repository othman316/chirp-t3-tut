import type { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

export const PageLayout: FC<layoutProps> = ({ children }) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full scroll-m-0 overflow-auto border-x border-slate-400 md:max-w-2xl">
        {children}
      </div>
    </main>
  );
};

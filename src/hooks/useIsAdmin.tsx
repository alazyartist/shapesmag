import { useUser } from "@clerk/nextjs";
const useIsAdmin = () => {
  const user = useUser();

  return user?.user?.publicMetadata?.isAdmin as boolean;
};

export default useIsAdmin;

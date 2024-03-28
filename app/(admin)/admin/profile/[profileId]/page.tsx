import { currentUser } from "@/lib/auth";
import UpdateProfileForm from "./_components/update-form";
import { db } from "@/lib/db";

const ProfileIdPage = async () => {
  const user = await currentUser();

  const data = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  return (
    <>
      <UpdateProfileForm data={data} />
    </>
  );
};

export default ProfileIdPage;

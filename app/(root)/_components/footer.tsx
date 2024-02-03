import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="bottom_footer border-t border-gray-100">
        <div className="container py-2 sm:py-5 grid sm:grid-cols-3 grid-cols-1 place-items-center sm:gap-5 gap-2">
          <div>
            <p className="sm:text-[15px] text-[13px] text-black font-medium">
              ©2023 NexGeno Technology Private Limited.
            </p>
          </div>
          <div className="relative sm:w-[200px] w-[150px] sm:h-[50px] h-[37px]">
            <Image
              src="/logo.webp"
              alt="Nexgeno Logo"
              fill={true}
              className="object-contain"
            />
          </div>
          <div className="flex gap-5">
            <Link
              className="sm:text-[15px] text-[13px] hover:underline text-black font-medium"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              className="sm:text-[15px] text-[13px] hover:underline text-black font-medium"
              href="/terms-conditions"
            >
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

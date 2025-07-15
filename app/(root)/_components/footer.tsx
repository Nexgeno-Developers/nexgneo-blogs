import Image from "next/image";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
const Footer = () => {
  return (
    <>
      <div className="footer_cta bg-secondary footer_bottom pt-14 pb-10">
        <div className="container">
          <div className="lg:flex">
            <div className="lg:w-[22%] image_right">
              <Image
                src="/calltoaction.svg"
                alt="service icon"
                width={150}
                height={150}
              />
            </div>
            <div className="lg:w-[53%]">
              <div className="text-center lg:pt-9 pt-10">
                <p>
                  Let us help you evolve your business online the smart way.
                </p>
                <h4 className="font-bold text-[30px] lg:pt-3 lg:pb-0 pb-7 lg:mb-7">
                  Are You Losing The{" "}
                  <span className="text_gradient">Digital Edge?</span>
                </h4>
                <Link href="#here_section" className="btn_1">
                  Get Quick Quote 
                </Link>
              </div>
            </div>
            <div className="lg:w-[18%] text-center lg:mt-0 mt-7">
              <p className="pb-3">Call Us at</p>
              <Link href="tel:+91 9819555545" className="font-bold text-[26px]">
                +91 9819555545
              </Link>

              <p className="pb-3 pt-2">Or WhatsApp Now</p>
              <Link
                target="_blank"
                href="https://api.whatsapp.com/send?phone=++919819555545&text=Hi%2C+I+am+contacting+you+through+your+website+https%3A%2F%2Fnexgeno.in%2F"
                className="font-bold text-[26px] text-center"
              >
                <div className="text-center">
                  <BsWhatsapp
                    title="WhatsApp"
                    className="bounce_continue w-10 h-10 text-[#07d353] inline ml-3 mt-3"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

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

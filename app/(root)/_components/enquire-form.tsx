import { ContactForm } from "./contact-form";

export const EnquireForm = () => {
  return (
    <>
      <div className="bg-secondary md:p-7 p-3 rounded-md w-full mt-5">
        <h1 className="text-center text-2xl font-bold">Contact Me</h1>
        <ContactForm />
      </div>
    </>
  );
};

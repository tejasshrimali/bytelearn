import AuthButton from "./authButton";

//provides the header for the app
export default function Header() {
  return (
    <div
      className="grid grid-cols-4 grid-rows-2 row-start-1 col-span-3 row-span-1  
    rounded-lg app_header items-center  md:row-span-2 md:h-full md:row-start-2 p-5 gap-8"
    >
      <h1 className="font-extrabold text-2xl col-span-3 row-start-1">ByteLearn</h1>
      <p className="font-light text-sm col-span-3 row-start-2 text-gray-400">AI-powered learning assistant</p>

      <AuthButton />
    </div>
  );
}

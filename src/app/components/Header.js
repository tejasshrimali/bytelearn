export default function Header() {
  return (
    <div className="grid grid-cols-4 grid-rows-1 col-span-3 row-span-1 row-start-1 rounded-lg app_header items-center p-5 py-8">
      <h1 className="font-extrabold text-2xl col-span-3 row-start-1">ByteLearn</h1>
      <div className="app_register  col-start-4 row-start-1 justify-self-end w-12 h-12 rounded-full "></div>
    </div>
  );
}

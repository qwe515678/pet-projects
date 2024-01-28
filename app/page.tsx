import Link from "next/link";

const data: { route: string, name: string }[] = [
  {
    route: 'fano-task-generation',
    name: 'Генерация 4-ого задания егэ'
  }
]

export default function Home() {
  return (
    <div className="">
      <section className="h-dvh dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] border-double  relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text bg-gradient-to-b text-foreground py-8">
          Pet-Projects
        </p>
      </section>
      <section className="w-full h-dvh bg-white py-10">
        <ul className="flex flex-col ">

          {data.map((obj) => {
            return (
              <Link key={obj.route} href={obj.route} className="border max-sm:text-sm px-5 max-sm:px-1 max-sm:w-full text-center py-2 my-1 rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                {obj.name}
              </Link>
            )
          })}
        </ul>
      </section>
    </div>
  );
}

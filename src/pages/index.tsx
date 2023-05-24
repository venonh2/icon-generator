import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useMouse } from "@mantine/hooks";
import { api } from "~/utils/api";
import Image from "next/image";

import teste from "public/assets/home/isabela.jpg";
import { useEffect } from "react";
import { useMotionValue, useTransform } from "framer-motion";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { ref, x, y } = useMouse();

  const testX = useMotionValue(10);
  const testY = useTransform(testX, (value) => Math.sin(value / 10) * 50);

  useEffect(() => {
    const contianer = document.getElementById("image-trail");

    contianer?.addEventListener("mousemove", handler);
  }, []);

  function handler(event) {
    const x = event.clientX;
    const y = event.clientY;

    console.log(x, y);

    const trail = document.getElementById("eita");

    trail.style.left = x + "px";
    trail.style.top = y + "px";
  }

  return (
    <>
      <Head>
        <title>icons</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        id="image-trail"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"
      >
        <Image
          src={teste}
          alt="tesdssds"
          width={242}
          height={302}
          id="eita"
          style={{
            position: "absolute",
            right: 300,
            left: 300,
          }}
        />
      </main>
    </>
  );
}; //transform: translate(401.961px, 80.5px) rotate(-8deg) scale(0.95, 0.95)

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

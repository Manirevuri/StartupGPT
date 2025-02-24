import type {Metadata} from "next";
import "./globals.css";
import {BackgroundWave} from "@/components/background-wave";
import Link from "next/link";
import {ElevenLabsLogo, GithubLogo} from "@/components/logos";

export const metadata: Metadata = {
    title: "StartupGPT",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={"h-full w-full"}>
        <body >
            {children}
            <BackgroundWave/>
        </body>
        </html>
    );
}


/*
<nav
                className={
                    "sm:fixed w-full top-0 left-0 grid grid-cols-2 py-4 px-8"
                }
            >
                <div className={"flex"}>
                    <Link href={"/"} prefetch={true}>
                        <ElevenLabsLogo
                            className={"h-[15px] w-auto hover:text-gray-500"}
                        />
                    </Link>
                </div>

                <div className={"flex gap-4 justify-end"}>
                    <Link
                        href="https://github.com/jonatanvm/convai-demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={"py-0.5"}
                        aria-label="View source on GitHub"
                    >
                        <GithubLogo
                            className={"w-5 h-5 hover:text-gray-500 text-[#24292f]"}
                        />
                    </Link>
                </div>
            </nav>
*/
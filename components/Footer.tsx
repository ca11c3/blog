"use client";

import { ArrowUpRight, Copyright } from "lucide-react";
import MotionTextWithIcon from "./MotionTextWithIcon";

function Footer() {
    return (
        <div className="h-fit w-screen overflow-hidden bg-background py-4">
            <div className="screen-width-footer grid grid-cols-12 space-y-0">
                {/* XHS Posting */}
                <div className="col-span-3 flex items-center gap-x-5 md:col-span-3">
                    <div className="footer-item w-fit bg-t-primary p-4 py-4 text-center text-base leading-none text-background 2xl:text-2xl">
                        FPS
                        <br /> #5
                    </div>
                    <h1 className="footer-item hidden text-nowrap text-base leading-tight text-t-secondary lg:block 2xl:text-2xl">
                        Learning is fun
                        <br />
                        while Painful
                    </h1>
                </div>

                {/* Get in touch */}
                <div className="col-span-9 flex flex-col items-start justify-center md:col-span-5 md:gap-x-2">
                    <div className="footer-item hidden lg:block">
                        <div className="mt-2 hidden text-nowrap text-sm text-t-primary lg:flex 2xl:text-xl">
                            Get in touch,
                        </div>
                    </div>
                    <div className="footer-item w-full">
                        <div className="grid grid-rows-2 font-semibold lg:flex lg:gap-x-10">
                            <div className="row-span-1 flex gap-x-3 lg:gap-x-10">
                                <MotionTextWithIcon
                                    icon={
                                        <ArrowUpRight
                                            className="social-link-arrow-icon"
                                            strokeWidth={1.5}
                                        />
                                    }
                                >
                                    <div className="social-link-text">
                                        PORTFOLIO
                                    </div>
                                </MotionTextWithIcon>
                                <MotionTextWithIcon
                                    icon={
                                        <ArrowUpRight
                                            className="social-link-arrow-icon"
                                            strokeWidth={1.5}
                                        />
                                    }
                                >
                                    <div className="social-link-text">
                                        GITHUB
                                    </div>
                                </MotionTextWithIcon>
                                <MotionTextWithIcon
                                    icon={
                                        <ArrowUpRight
                                            className="social-link-arrow-icon"
                                            strokeWidth={1.5}
                                        />
                                    }
                                >
                                    <div className="social-link-text">
                                        EMAIL
                                    </div>
                                </MotionTextWithIcon>
                            </div>

                            <div className="row-span-1 flex gap-x-3 lg:gap-x-10">
                                <MotionTextWithIcon
                                    icon={
                                        <ArrowUpRight
                                            className="social-link-arrow-icon"
                                            strokeWidth={1.5}
                                        />
                                    }
                                >
                                    <div className="social-link-text">
                                        INSTAGRAM
                                    </div>
                                </MotionTextWithIcon>
                                <MotionTextWithIcon
                                    icon={
                                        <ArrowUpRight
                                            className="social-link-arrow-icon"
                                            strokeWidth={1.5}
                                        />
                                    }
                                >
                                    <div className="social-link-text">X</div>
                                </MotionTextWithIcon>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}

                <div className="footer-item col-span-12 flex h-full items-center justify-center md:col-span-4 md:justify-end md:pr-5 lg:pt-0">
                    <div className="flex-wrap text-start text-xs font-medium leading-none text-t-secondary">
                        <Copyright
                            strokeWidth={2}
                            size={14}
                            className="mb-1 mr-1 inline-block"
                        />
                        <span className="h-full text-wrap 2xl:text-xl">
                            Alice, @chaosatleast 2025.
                            <br />
                            All rights reserved.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

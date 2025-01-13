"use client";

import { ArrowUpRight, Copyright } from "lucide-react";
import React from "react";
import MotionTextWithIcon from "./MotionTextWithIcon";

function Footer() {
    return (
        <div className="screen-width-footer grid h-28 grid-cols-12">
            {/* XHS Posting */}

            <div className="col-span-2 flex items-center gap-x-2">
                <div className="bg-t-primary w-fit p-2 text-center text-base leading-tight text-background">
                    FPS
                    <br /> #5
                </div>
                <h1 className="text-base leading-tight">
                    Learning is fun
                    <br />
                    while Painful
                </h1>
            </div>

            {/* Get in touch */}
            <div className="col-span-5 flex flex-col justify-center gap-x-2">
                <div className="">
                    <div className="text-t-primary hidden text-nowrap text-sm lg:flex">
                        Get in touch,
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex gap-x-10 font-semibold">
                        <MotionTextWithIcon
                            icon={
                                <ArrowUpRight
                                    className="social-link-arrow-icon"
                                    strokeWidth={1.5}
                                />
                            }
                        >
                            <div className="social-link-text">PORTFOLIO</div>
                        </MotionTextWithIcon>
                        <MotionTextWithIcon
                            icon={
                                <ArrowUpRight
                                    className="social-link-arrow-icon"
                                    strokeWidth={1.5}
                                />
                            }
                        >
                            <div className="social-link-text">GITHUB</div>
                        </MotionTextWithIcon>
                        <MotionTextWithIcon
                            icon={
                                <ArrowUpRight
                                    className="social-link-arrow-icon"
                                    strokeWidth={1.5}
                                />
                            }
                        >
                            <div className="social-link-text">EMAIL</div>
                        </MotionTextWithIcon>

                        <MotionTextWithIcon
                            icon={
                                <ArrowUpRight
                                    className="social-link-arrow-icon"
                                    strokeWidth={1.5}
                                />
                            }
                        >
                            <div className="social-link-text">INSTAGRAM</div>
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

            {/* Copyright */}

            <div className="col-span-5 flex items-center justify-end pr-10">
                <div className="text-t-secondary text-start text-sm leading-none">
                    <Copyright
                        strokeWidth={2}
                        size={14}
                        className="mb-1 mr-1 inline-block"
                    />
                    <span className="h-full">
                        Alice, @chaosatleast 2025. <br /> All rights reserved.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Footer;

"use client";

import { ArrowUpRight, Copyright } from "lucide-react";
import React from "react";
import MotionTextWithIcon from "./MotionTextWithIcon";
import StaggerObjectSlideIn from "./StaggerObjectSlideIn";

function Footer() {
    return (
        <div className="screen-width-footer grid h-32 grid-cols-12 overflow-hidden">
            {/* XHS Posting */}

            <div className="col-span-3 flex items-center gap-x-5 lg:col-span-2">
                <div className="footer-item w-fit bg-t-primary p-4 py-4 text-center text-base leading-none text-background">
                    FPS
                    <br /> #5
                </div>
                <h1 className="footer-item hidden text-base leading-tight text-t-secondary lg:block">
                    Learning is fun
                    <br />
                    while Painful
                </h1>
            </div>

            {/* Get in touch */}
            <div className="col-span-9 flex flex-col justify-center lg:col-span-5 lg:gap-x-2">
                <div className="footer-item hidden lg:block">
                    <div className="mt-2 hidden text-nowrap text-sm text-t-primary lg:flex">
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

            <div className="footer-item col-span-12 flex items-center justify-start lg:col-span-5 lg:justify-end lg:pr-5">
                <div className="text-start text-xs font-medium leading-none text-t-secondary">
                    <Copyright
                        strokeWidth={2}
                        size={14}
                        className="mb-1 mr-1 inline-block"
                    />
                    <span className="h-full">
                        Alice, @chaosatleast 2025. All rights reserved.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Footer;

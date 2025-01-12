"use client";

import { ArrowUpRight, Copyright } from "lucide-react";
import React from "react";
import MotionTextWithIcon from "./MotionTextWithIcon";

function Footer() {
    return (
        <div className="text-t-tertiary mx-auto my-12 flex flex-col space-y-2 px-5 md:h-24 md:flex-row md:justify-between md:space-y-0 lg:max-w-7xl">
            <div className="grid grid-cols-2 md:w-2/3">
                <div className="grid grid-cols-2">
                    <div className="text-t-primary hidden text-nowrap text-sm lg:flex">
                        If you want to know my,
                    </div>
                    <div className="">
                        <MotionTextWithIcon
                            icon={
                                <ArrowUpRight
                                    className="social-link-arrow-icon"
                                    strokeWidth={2.5}
                                />
                            }
                        >
                            <div className="social-link-text">PORTFOLIO</div>
                        </MotionTextWithIcon>
                        <MotionTextWithIcon
                            icon={
                                <ArrowUpRight
                                    className="social-link-arrow-icon"
                                    strokeWidth={2.5}
                                />
                            }
                        >
                            <div className="social-link-text">GITHUB</div>
                        </MotionTextWithIcon>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="text-t-primary hidden text-nowrap text-sm lg:flex">
                        If you want to contact me,
                    </div>
                    <div className="social-link-text">
                        <MotionTextWithIcon
                            icon={
                                <ArrowUpRight
                                    className="social-link-arrow-icon"
                                    strokeWidth={2.5}
                                />
                            }
                        >
                            <div className="social-link-text">LINKEDIN</div>
                        </MotionTextWithIcon>
                        <MotionTextWithIcon
                            icon={
                                <ArrowUpRight
                                    className="social-link-arrow-icon"
                                    strokeWidth={2.5}
                                />
                            }
                        >
                            <div className="social-link-text">EMAIL</div>
                        </MotionTextWithIcon>
                        <MotionTextWithIcon
                            icon={
                                <ArrowUpRight
                                    className="social-link-arrow-icon"
                                    strokeWidth={2.5}
                                />
                            }
                        >
                            <div className="social-link-text">INSTAGRAM</div>
                        </MotionTextWithIcon>
                    </div>
                </div>
            </div>

            <div className="mt-0 flex h-full w-full items-start justify-start md:w-1/3 md:justify-end">
                <div className="text-t-secondary text-start">
                    <Copyright
                        strokeWidth={2}
                        size={14}
                        className="mb-1 mr-1 inline-block"
                    />
                    <span className="h-full">
                        Alice, @chaosatleast 2024. <br /> All rights reserved.
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Footer;

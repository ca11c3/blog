"use client";

import React from "react";

function HorizontalCard() {
    return (
        <div className="relative h-64 w-full rounded-xl bg-transparent">
            <div className="h-full w-1/3 rounded-xl bg-slate-500">GIF</div>
            <div className="absolute bottom-0 left-[30%] h-full w-1/2 rounded-xl bg-yellow-500">
                HorizontalCard
            </div>
        </div>
    );
}

export default HorizontalCard;

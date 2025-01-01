"use client";

import React from "react";

function VerticalCard() {
    return (
        <div className="relative h-96 w-1/3 rounded-xl bg-transparent">
            <div className="h-full rounded-xl bg-slate-500">GIF</div>
            <div className="absolute bottom-0 h-48 w-full rounded-xl bg-yellow-500">
                HorizontalCard
            </div>
        </div>
    );
}

export default VerticalCard;

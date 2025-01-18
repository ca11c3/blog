"use client";

import React from "react";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-typescript";

export default function PrismLoader() {
    useEffect(() => {
        Prism.highlightAll();
        Prism.hooks.add("line-numbers", function (env) {
            env.plugins = env.plugins || {};
            env.plugins.lineNumbers = true;
        });
    }, []);
    return <div className="hidden"></div>;
}

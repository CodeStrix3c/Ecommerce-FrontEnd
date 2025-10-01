import React from "react";
import SprayCard from "../components/SprayCard";
import ContentWrapper from "@/components/shared/ContentWrapper";

export const SprayPage = () => {
    return (
        <ContentWrapper>
            <div className="w-full mt-4 lg:mt-28 md:mt-8  min-h-screen bg-[var(--color-white)]  md:py-20 lg:py-16">

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--color-black)]  mb-8 ">
                    Spray Records
                </h1>
                <div className="max-w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    <SprayCard />
                    <SprayCard />
                    <SprayCard />
                    <SprayCard />
                    <SprayCard />
                    <SprayCard />
                    <SprayCard />
                    <SprayCard />
                    <SprayCard />
                    <SprayCard />
                    <SprayCard />
                    <SprayCard />
                </div>
            </div>
        </ContentWrapper>
    )
};

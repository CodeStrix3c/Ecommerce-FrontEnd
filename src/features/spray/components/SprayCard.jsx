import { Droplet, Edit2, Trash2 } from "lucide-react";

export default function SprayCard() {
    return (
        <div className="w-full">
            <div className="bg-[var(--color-white)] border border-[var(--color-gray)] rounded-2xl p-3 sm:p-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">

                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <Droplet
                            size={18}
                            className="text-[var(--color-secondary)] sm:size-6"
                        />
                        <span className="font-semibold text-sm sm:text-base md:text-lg">
                            Cap
                        </span>
                    </div>
                    <span className="bg-[var(--color-black-hover)] text-[var(--color-primary)] text-xs sm:text-sm font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                        Herbicide
                    </span>
                </div>


                <div className="mt-2 text-[var(--color-black)] text-sm sm:text-sm md:text-base">
                    <p>1 kg</p>
                    <div className="flex items-center text-sm justify-between flex-wrap gap-2">
                        <p>Date: 25 Sep 2025</p>
                        <span className="font-medium text-xs sm:text-base md:text-lg">
                            ₹5000
                        </span>
                    </div>
                </div>


                <div className="flex justify-end mt-3 gap-3">
                    <Edit2
                        size={16}
                        className="text-[var(--color-primary)] cursor-pointer hover:text-[var(--color-black)]"
                    />
                    <Trash2
                        size={16}
                        className="text-[var(--color-secondary)] cursor-pointer hover:text-[var(--color-black)]"
                    />
                </div>
            </div>
        </div>
    );
}

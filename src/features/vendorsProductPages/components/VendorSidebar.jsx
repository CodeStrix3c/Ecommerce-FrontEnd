import {
    MapPin,
    Phone,
    Mail,
    Briefcase,
    Package,
    ShieldCheck,
    CalendarDays,
    BadgeCheck,
    Store,
    Clock3,
    FileText,
} from "lucide-react";

const VendorSidebar = ({ vendor }) => {
    return (
        <aside className="xl:sticky xl:top-8 h-[calc(100vh-2rem)]">
            <div className="h-full overflow-y-auto rounded-3xl border border-[var(--color-white)] bg-[var(--color-white)] shadow-sm px-6 py-7 smooth-scroll">
                {/* Header */}
                <div className="pb-6 border-b border-[var(--color-white)]">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-black)]">
                                Vendor Details
                            </p>
                            <p className="mt-1 text-xs text-[var(--color-black)]/70">
                                Business profile & vendor overview
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--color-white)] bg-[var(--color-white)] shadow-sm">
                            <Store size={18} className="text-[var(--color-secondary)]" />
                        </div>
                    </div>

                    <div className="mt-4 h-[2px] w-14 bg-[var(--color-secondary)] rounded-full" />
                </div>

                {/* Profile */}
                <div className=" rounded-3xl border border-[var(--color-white)] bg-[var(--color-white)] px-5 py-6 shadow-sm">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative">
                            <div className="rounded-full border-4 border-[var(--color-secondary)] bg-[var(--color-white)] p-1 shadow-sm">
                                <img
                                    src="/assets/images/vendorimage.jpg"
                                    alt="Vendor Image"
                                    className="h-28 w-28 rounded-full object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-[var(--color-white)] bg-[var(--color-white)] px-3 py-1 shadow-sm">
                                <div className="flex items-center gap-1">
                                    <BadgeCheck size={12} className="text-[var(--color-secondary)]" />
                                    <span className="text-[11px] font-semibold text-[var(--color-black)]">
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-[var(--color-black)]">
                            {vendor.vendorName}
                        </h3>
                        <p className="mt-1 text-sm text-[var(--color-black)]/70">
                            {vendor.occupation}
                        </p>

                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-white)] px-3 py-1.5 text-xs font-medium text-[var(--color-black)]">
                            <Clock3 size={13} className="text-[var(--color-secondary)]" />
                            Trusted business partner
                        </div>
                    </div>
                </div>
                <div className="mt-6 border-b border-[var(--color-white)] pb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-black)]">
                        Contact Information
                    </p>

                    <div className="mt-5 space-y-4 text-sm text-[var(--color-black)]">
                        <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-white)] px-4 py-3">
                            <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--color-secondary)]" />
                            <div>
                                <p className="font-medium text-[var(--color-black)]">Address</p>
                                <p className="mt-0.5 leading-6 text-[var(--color-black)]/75">
                                    {vendor.address}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-white)] px-4 py-3">
                            <Phone size={16} className="mt-0.5 shrink-0 text-[var(--color-secondary)]" />
                            <div>
                                <p className="font-medium text-[var(--color-black)]">Phone</p>
                                <p className="mt-0.5 text-[var(--color-black)]/75">{vendor.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-white)] px-4 py-3">
                            <Mail size={16} className="mt-0.5 shrink-0 text-[var(--color-secondary)]" />
                            <div>
                                <p className="font-medium text-[var(--color-black)]">Email</p>
                                <p className="mt-0.5 break-all text-[var(--color-black)]/75">
                                    {vendor.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 border-b border-[var(--color-white)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-black)]">
                        Business Details
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-3">
                        <div className="rounded-2xl border border-[var(--color-white)] px-4 py-4">
                            <div className="flex items-center gap-3">
                                <Briefcase size={16} className="text-[var(--color-secondary)]" />
                                <span className="text-sm font-medium text-[var(--color-black)]">
                                    Occupation
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-[var(--color-black)]/75">
                                {vendor.occupation}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[var(--color-white)] px-4 py-4">
                            <div className="flex items-center gap-3">
                                <CalendarDays size={16} className="text-[var(--color-secondary)]" />
                                <span className="text-sm font-medium text-[var(--color-black)]">
                                    Vendor Since
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-[var(--color-black)]/75">
                                {vendor.vendorSince}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="py-6 border-b border-[var(--color-white)]">
                    <div className="flex items-center gap-2">
                        <FileText size={15} className="text-[var(--color-secondary)]" />
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-black)]">
                            About Vendor
                        </p>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-[var(--color-black)]/80">
                        {vendor.description}
                    </p>
                </div>

                {/* Stats */}
                <div className="pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-black)]">
                        Business Stats
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-3">
                        <div className="rounded-2xl border border-[var(--color-white)] bg-[var(--color-white)] px-4 py-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Package size={16} className="text-[var(--color-secondary)]" />
                                    <span className="text-sm font-medium text-[var(--color-black)]">
                                        Total Products
                                    </span>
                                </div>
                                <span className="text-base font-semibold text-[var(--color-black)]">
                                    {vendor.totalProducts}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[var(--color-white)] bg-[var(--color-white)] px-4 py-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={16} className="text-[var(--color-secondary)]" />
                                    <span className="text-sm font-medium text-[var(--color-black)]">
                                        Status
                                    </span>
                                </div>
                                <span className="rounded-full px-3 py-1 text-xs font-semibold text-[var(--color-black)] border border-[var(--color-white)]">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default VendorSidebar;
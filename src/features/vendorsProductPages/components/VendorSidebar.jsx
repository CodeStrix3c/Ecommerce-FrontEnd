import {
    MapPin,
    Phone,
    Mail,
    Briefcase,
    Package,
    ShieldCheck,
} from "lucide-react";

const VendorSidebar = ({ vendor }) => {
    return (
        <aside className="xl:sticky xl:top-8 h-[calc(100vh-2rem)]">
            <div className="h-full overflow-y-auto rounded-3xl border border-[var(--color-white)] bg-[var(--color-white)] shadow-sm px-6 py-7 smooth-scroll">
                <div className="pb-6 border-b border-[var(--color-white)]">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-black)]">
                        Vendor Details
                    </p>
                    <div className="mt-3 h-[2px] w-12 bg-[var(--color-secondary)]" />
                </div>

                {/* Profile Image */}
                <div className="mt-6 flex justify-center">
                    <div className="rounded-full border-4 border-[var(--color-secondary)] bg-[var(--color-white)] p-1 shadow-sm">
                        <img
                            src="/assets/images/vendorimage.jpg"
                            alt="Vendor Image"
                            className="h-28 w-28 rounded-full object-cover"
                        />
                    </div>
                </div>

                <div className="mt-6 border-b border-[var(--color-white)] pb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-black)]">
                        Basic Information
                    </p>

                    <div className="mt-5 space-y-5 text-sm text-[var(--color-black)]">
                        <div className="flex items-start gap-3">
                            <ShieldCheck size={16} className="mt-0.5 text-[var(--color-secondary)]" />
                            <div>
                                <p className="font-medium text-[var(--color-black)]">Vendor Name</p>
                                <p>{vendor.vendorName}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Briefcase size={16} className="mt-0.5 text-[var(--color-secondary)]" />
                            <div>
                                <p className="font-medium text-[var(--color-black)]">Occupation</p>
                                <p>{vendor.occupation}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin size={20} className="mt-0.5 text-[var(--color-secondary)]" />
                            <div>
                                <p className="font-medium text-[var(--color-black)]">Address</p>
                                <p>{vendor.address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Phone size={16} className="mt-0.5 text-[var(--color-secondary)]" />
                            <div>
                                <p className="font-medium text-[var(--color-black)]">Phone</p>
                                <p>{vendor.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Mail size={16} className="mt-0.5 text-[var(--color-secondary)]" />
                            <div>
                                <p className="font-medium text-[var(--color-black)]">Email</p>
                                <p>{vendor.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-6 border-b border-[var(--color-white)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-black)]">
                        About Vendor
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-black)]">
                        {vendor.description}
                    </p>
                </div>

                <div className="pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-black)]">
                        Stats
                    </p>

                    <div className="mt-5 space-y-3">
                        <div className="flex items-center justify-between rounded-2xl border border-[var(--color-white)] bg-[var(--color-white)] px-4 py-4">
                            <div className="flex items-center gap-3">
                                <Package size={16} className="text-[var(--color-black)]" />
                                <span className="text-sm font-medium text-[var(--color-black)]">Total Products</span>
                            </div>
                            <span className="text-sm font-semibold text-[var(--color-black)]">
                                {vendor.totalProducts}
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-[var(--color-white)] bg-[var(--color-white)] px-4 py-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={16} className="text-[var(--color-black)]" />
                                <span className="text-sm font-medium text-[var(--color-black)]">Vendor Since</span>
                            </div>
                            <span className="text-sm font-semibold text-[var(--color-black)]">
                                {vendor.vendorSince}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default VendorSidebar;
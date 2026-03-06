import React, { useState } from "react";
import OrderStats from "../components/OrderStats";
import OrdersFilters from "../components/OrdersFilters";
import OrdersTable from "../components/OrdersTable";
import { CarTaxiFront, ShoppingBag, ShoppingBagIcon, ShoppingBasket, ShoppingCart } from "lucide-react";
import ContentWrapper from "@/components/shared/ContentWrapper";


export default function OrdersPage() {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    return (
        <ContentWrapper>
            <div className="p-6 space-y-6">




                <div className="lg:mt-28 flex items-center justify-between">

                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-6 h-6 text-[var(--color-secondary)]" />
                        <h1 className="text-2xl font-semibold ">My Orders</h1>
                    </div>

                </div>
                <OrdersFilters
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                />



                <OrderStats />





                <OrdersTable search={search} status={status} />

            </div>
        </ContentWrapper>
    );
}
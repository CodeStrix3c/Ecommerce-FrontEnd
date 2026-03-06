import { CheckCircle, Clock, Package, Truck } from "lucide-react";

export default function OrderStats() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">


            <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <h3 className="text-2xl font-semibold">1,250</h3>
                </div>
                <div className="p-2 bg-[var(--color-secondary)] rounded-lg">
                    <Package className="w-4 h-4 text-[var(--color-white)]" />
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Pending</p>
                    <h3 className="text-2xl font-semibold text-yellow-600">210</h3>
                </div>
                <div className="p-2 bg-[var(--color-secondary)] rounded-lg">
                    <Clock className="w-4 h-4 text-[var(--color-white)]" />
                </div>
            </div>


            <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Shipped</p>
                    <h3 className="text-2xl font-semibold text-blue-600">430</h3>
                </div>
                <div className="p-2 bg-[var(--color-secondary)] rounded-lg">
                    <Truck className="w-4 h-4 text-[var(--color-white)]" />
                </div>
            </div>


            <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">Delivered</p>
                    <h3 className="text-2xl font-semibold text-green-600">610</h3>
                </div>
                <div className="p-2 bg-[var(--color-secondary)] rounded-lg">
                    <CheckCircle className="w-4 h-4 text-[var(--color-white)]" />
                </div>
            </div>

        </div>
    );
}
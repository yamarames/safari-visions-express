import { Toaster } from "sonner";
import { ProductPage } from "@/components/pdp/ProductPage";
import { CartProvider } from "@/store/cart";

export default function App() {
  return (
    <CartProvider>
      <main className="py-6">
        <ProductPage />
      </main>
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#111C2E",
            border: "1px solid #2A3547",
            color: "#E2E9F3",
          },
        }}
      />
    </CartProvider>
  );
}

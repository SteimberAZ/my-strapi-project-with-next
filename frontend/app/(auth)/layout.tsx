export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="text-center py-10 flex justify-center items-center h-screen w-screen font-mono">
        <h1 className="text-3xl font-bold mb-10"> {children} </h1>
       
        </div>;
}   
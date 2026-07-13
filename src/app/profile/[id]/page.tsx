export default async function UserProfile({ params }: any) {
    const { id } = await params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-2 px-4">
            <h1 className="text-3xl font-bold text-gray-100">Profile Page</h1>
            <hr className="w-full max-w-md border-gray-700 my-4" />
            <p className="text-xl text-gray-200">Welcome to your profile! <span className="font-semibold text-blue-300">{id}</span></p>
        </div>
    );
}
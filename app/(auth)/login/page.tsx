import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <AuthForm type="login" />
    </div>
  );
}

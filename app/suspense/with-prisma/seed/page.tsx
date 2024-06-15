import Link from "next/link";

export default function Seed() {
  return (
    <div className="flex flex-col items-center justify-start space-y-2 text-center p-4">
      <form
        method="POST"
        id="seed-form"
        action="/suspense/with-prisma/seed/api"
      >
        <input type="hidden" name="action" value="seed" />
        <button
          type="submit"
          form="seed-form"
          className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded-md disabled:bg-muted-foreground"
        >
          Add data
        </button>
      </form>

      <form
        method="POST"
        id="clear-form"
        action="/suspense/with-prisma/seed/api"
      >
        <input type="hidden" name="action" value="clear" />
        <button
          type="submit"
          form="clear-form"
          className="bg-primary text-primary-foreground hover:bg-primary/80 py-2 px-4 rounded-md disabled:bg-muted-foreground"
        >
          Delete data
        </button>
      </form>

      <Link href={`/suspense/with-prisma`} className="underline">
        Return to suspense demo
      </Link>
    </div>
  );
}

import PgBoss from "pg-boss";

let pgboss: PgBoss;

if (typeof window === "undefined" || process.env.NODE_ENV === "test") {
  if (!(global as any).pgboss) {
    console.log("Creating new PgBoss instance");
    (global as any).pgboss = new PgBoss(process.env.PGBOSS_URL!);
  }

  pgboss = (global as any).pgboss;
}

export { pgboss };

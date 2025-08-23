import { notFound } from "next/navigation";
import RedirectToLogin from "./redirect-to-login";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { VerticalSteps, StepComponent } from "../tasks-steps";
import { createSequentialProcesses } from "../tasks-steps/tasks";

export default async function CheckTransactionPage({
  params,
}: {
  params: Promise<{ transaction: string }>;
}) {
  const { transaction } = await params;

  if (!transaction || transaction.trim().length === 0) {
    notFound();
  }

  const [
    getTransactionProcess,
    createVoucherInVoucherifyProcess,
    createVoucherInDbProcess,
  ] = createSequentialProcesses(process1, process2, process3);

  return (
    <div className="flex flex-col space-y-2">
      <VerticalSteps>
        <StepComponent work={getTransactionProcess} title="Checking payment" />
        <StepComponent
          work={createVoucherInVoucherifyProcess}
          title="Creating voucher"
        />
        <StepComponent
          work={createVoucherInDbProcess}
          title="Setting up your account"
          isLast={true}
        />
      </VerticalSteps>

      <ErrorBoundary fallback={<p></p>}>
        <Suspense fallback={<></>}>
          <RedirectToLogin
            work={createVoucherInDbProcess}
            loginURL="/confirm-test/success/"
          />
        </Suspense>
      </ErrorBoundary>

      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies
        sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, mattis
        quis, molestie a, pulvinar ac, nulla. Maecenas lacinia. Nam quis lorem.
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
        Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus.
      </div>
    </div>
  );
}

const process1 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return "ok";
  // throw new Error("Payment cannot be confirmed");
};

const process2 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return "ok";
  //throw new Error("Voucher cannot be created");
};

const process3 = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // return {
  //   code: "abcd",
  //   email: "prananta@swift.ch",
  //   flavor: "ch_auto_premium",
  // };

  throw new Error("Your account cannot be created");
};

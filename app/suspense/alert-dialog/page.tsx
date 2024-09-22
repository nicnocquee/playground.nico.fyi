import { Suspense } from "react";
import { AlertDialogDemo } from "./page.client";

export default function Page() {
  const work = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });

  return (
    <div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <AlertDialogDemo work={work} />
        </Suspense>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar,
        augue at aliquam rhoncus, felis nisi adipiscing sem, sed molestie nisl
        nisl eu orci. Nullam in ullamcorper nunc. Sed eu tincidunt nisi. Donec
        at elit et nunc tristique facilisis. Sed placerat, leo eu interdum
        mattis, nunc tellus feugiat nibh, in consequat velit velit eget velit.
        Suspendisse potenti. Sed pellentesque augue sit amet leo consequat
        posuere. Nullam euismod sollicitudin libero, in molestie ligula
        vestibulum at. Nullam varius, turpis quis lobortis pretium, elit magna
        laoreet risus, vel ultricies mi nunc id metus. Sed maximus, leo eu
        convallis consectetur, nisi leo luctus diam, in gravida purus nisl at
        libero. Donec euismod, nisl eget commodo mollis, mauris diam vestibulum
        diam, ut fringilla augue orci ut leo. Nullam consectetur, leo eget
        egestas mollis, nisl arcu faucibus augue, eu eleifend nunc tellus at
        tellus. Sed at fringilla nisi. Nullam tristique, leo eget egestas
        mollis, nisl arcu faucibus augue, eu eleifend nunc tellus at tellus. Sed
        at fringilla nisi. Nullam
      </div>
    </div>
  );
}

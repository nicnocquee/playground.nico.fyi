const SuccessLogin = async ({
  searchParams,
}: {
  searchParams: Promise<{ voucher: string; email: string }>;
}) => {
  const { voucher, email } = await searchParams;

  return (
    <div>
      Voucher: {voucher}
      <br />
      Email: {email}
    </div>
  );
};

export default SuccessLogin;

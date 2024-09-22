const SuccessLogin = ({
  searchParams: { voucher, email },
}: {
  searchParams: { voucher: string; email: string };
}) => {
  return (
    <div>
      Voucher: {voucher}
      <br />
      Email: {email}
    </div>
  );
};

export default SuccessLogin;

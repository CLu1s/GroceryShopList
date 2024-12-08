type Props = {
  children: React.ReactNode;
};
const ListFooter = ({ children }: Props) => {
  return (
    <div
      className={
        "border bg-white fixed bottom-0 left-0 right-0 p-8 flex flex-col gap-8 pb-12"
      }
    >
      {children}
    </div>
  );
};

export default ListFooter;

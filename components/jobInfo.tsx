const JobInfo = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <div className="flex gap-x-2 align-center">
      {icon}
      {text}
    </div>
  );
};
export default JobInfo;

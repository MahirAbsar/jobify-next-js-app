import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const StatCard = ({ title, value }: { title: string; value: number }) => {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription className="text-4xl font-extrabold text-primary mt-[0px!important]">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
export default StatCard;

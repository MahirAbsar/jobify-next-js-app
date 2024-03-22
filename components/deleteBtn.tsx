import { deleteJobAction } from "@/utils/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";

const DeleteBtn = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "There was an error",
        });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
  return (
    <Button size="sm" disabled={isPending} onClick={() => mutate(id)}>
      {isPending ? "deleting..." : "delete"}
    </Button>
  );
};
export default DeleteBtn;

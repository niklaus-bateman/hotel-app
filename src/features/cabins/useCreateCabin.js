import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toastConfigObj } from "../../utils/constants";
import { toast } from "react-toastify";

export function useCreateCabin(reset) {
 const client = useQueryClient();
 	const { mutate:createCabin, isLoading:isCreating } = useMutation({
		mutationFn: (cabin) => createEditCabin(cabin),
		onSuccess: () => {
			toast.success("Cabin created!", toastConfigObj);
			client.invalidateQueries({
				queryKey: ["cabin"],
			});
			reset();
		},
		onError: (errorMessage) => {
			console.log(errorMessage.message);
			toast.error(errorMessage.message, toastConfigObj);
		},
	});
    return {createCabin,isCreating};
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toastConfigObj } from "../../utils/constants";
import { toast } from "react-toastify";

export function useEditCabin() {
     const client = useQueryClient();
 	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
		onSuccess: () => {
			toast.success("Cabin edited!", toastConfigObj);
			client.invalidateQueries({
				queryKey: ["cabin"],
			});
			// reset();
		},
		onError: (errorMessage) => {
			console.log(errorMessage.message);
			toast.error(errorMessage.message, toastConfigObj);
		},
	});
    return {editCabin,isEditing};
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-toastify";
import { toastConfigObj } from "../../utils/constants";

export function useDeleteCabin() {
	const client = useQueryClient();

	const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
		mutationFn: (cabinId) => deleteCabinApi(cabinId),
		onSuccess: () => {
			toast.success("Cabin deleted!", toastConfigObj);
			client.invalidateQueries({
				queryKey: ["cabin"],
			});
		},
		onError: (err) => toast.error("Failed to delete cabin", toastConfigObj),
	});

	return {
		deleteCabin,
		isDeleting,
	};
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastConfigObj } from "../../utils/constants";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
export const useUpateSetting = () => {
	const client = useQueryClient();
	const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
		mutationFn: (updatedSetting) => updateSettingApi(updatedSetting),
		onSuccess: () => {
			toast.success("Settings updated!", toastConfigObj);
			client.invalidateQueries({
				queryKey: ["settings"],
			});
		},
		onError: (err) => {
			toast.error(err.message, toastConfigObj);
		},
	});
	return { updateSetting, isUpdating };
};

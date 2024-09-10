import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export const useSetting = () => {
	const { data:settings, isLoading } = useQuery({
		queryKey: ["settings"],
		queryFn: () => getSettings(),
	});
	return {settings ,isLoading};
};

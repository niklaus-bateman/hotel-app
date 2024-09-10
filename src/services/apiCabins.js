import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		throw new Error("Cabin could not be deleted");
	}
}

export async function createEditCabin(cabinData, id) {
	const hasImage = typeof cabinData.image === 'string' && cabinData?.image?.startsWith(supabaseUrl);
	const imageName = `${Math.random()}-${cabinData?.image?.name}`.replaceAll(
		"/",
		""
	);
	const path = hasImage
		? cabinData?.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	let query = supabase.from("cabins");
	// edit exisiting cabin
	if (id) {
		query = query.update({ ...cabinData, image: path }).eq("id", id);
	}
	// create new cabin
	if (!id) {
		query = query.insert([{ ...cabinData, image: path }]);
	}
	const { data, error } = await query.select().single();

	if (data) {
		return data;
	}
	if (error) {
		throw new Error("Cabin could not be created");
	}

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, cabinData?.image);
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data[0]?.id);
		throw new Error("Failed to upload Cabin image !");
	}
	return data;
}
export async function createCabin(cabinData) {
	const imageName = `${Math.random()}-${cabinData?.image?.name}`.replace(
		"/",
		""
	);
	const path = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...cabinData, image: path }])
		.select();

	if (error) {
		throw new Error("Cabin could not be created");
	}

	const { error: storageError } = await supabase.storage
		.from("cabin-imagess")
		.upload(imageName, cabinData?.image);
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data[0]?.id);
		throw new Error("Failed to upload Cabin image !");
	}
}
